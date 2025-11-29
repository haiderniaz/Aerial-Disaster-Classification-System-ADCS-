# Flask API for Disaster Detection Model
# This serves the trained Vision Transformer model for pre/post disaster classification

from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import torch
from torchvision import transforms
import io
import os
import base64

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Configuration (paths are relative to project root)
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(PROJECT_ROOT, 'output_vit_xbd', 'best_model.pth')
DEVICE = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
IMAGE_SIZE = 224

# Define the model architecture
def create_vit_model(num_classes=2):
    """Create the ViT model architecture"""
    try:
        import timm
        model = timm.create_model(
            'vit_base_patch16_224',
            pretrained=False,  # We'll load our trained weights
            num_classes=num_classes
        )
        print('Using timm ViT (vit_base_patch16_224)')
        return model
    except Exception as e:
        print(f'timm not available: {e}, using ResNet18 fallback')
        from torchvision import models
        from torch import nn
        model = models.resnet18(pretrained=False)
        model.fc = nn.Linear(model.fc.in_features, num_classes)
        return model

# Load the trained model
print("Loading trained model...")
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model checkpoint not found at: {MODEL_PATH}")

model = create_vit_model(num_classes=2)
checkpoint = torch.load(MODEL_PATH, map_location=DEVICE)
model.load_state_dict(checkpoint['model_state_dict'])
model = model.to(DEVICE)
model.eval()
print(f"✅ Model loaded successfully on {DEVICE}")

# Define image transforms (same as training)
transform = transforms.Compose([
    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

def predict_image(image):
    """Predict if an image is pre-disaster or post-disaster."""
    img_tensor = transform(image).unsqueeze(0).to(DEVICE)

    with torch.no_grad():
        output = model(img_tensor)
        probabilities = torch.nn.functional.softmax(output, dim=1)
        confidence, predicted = torch.max(probabilities, 1)

    label = "Pre-Disaster" if predicted.item() == 0 else "Post-Disaster"
    confidence_score = confidence.item() * 100

    pre_prob = probabilities[0][0].item() * 100
    post_prob = probabilities[0][1].item() * 100

    return {
        'label': label,
        'confidence': round(confidence_score, 2),
        'pre_disaster_probability': round(pre_prob, 2),
        'post_disaster_probability': round(post_prob, 2)
    }

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        'status': 'healthy',
        'model_loaded': True,
        'device': str(DEVICE)
    })

@app.route('/api/predict', methods=['POST'])
def predict():
    """Predict disaster type from uploaded image (multipart/form-data)."""
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400

        file = request.files['image']

        if file.filename == '':
            return jsonify({'error': 'Empty filename'}), 400

        image_bytes = file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')

        result = predict_image(image)

        return jsonify({
            'success': True,
            'prediction': result
        })

    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/predict-base64', methods=['POST'])
def predict_base64():
    """Predict disaster type from base64-encoded image (JSON)."""
    try:
        data = request.get_json()

        if not data or 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400

        image_data = data['image']
        if ',' in image_data:
            image_data = image_data.split(',')[1]

        image_bytes = base64.b64decode(image_data)
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')

        result = predict_image(image)

        return jsonify({
            'success': True,
            'prediction': result
        })

    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    print("\n" + "="*50)
    print("🚀 Disaster Detection API Server")
    print("="*50)
    print(f"Model: Vision Transformer (ViT)")
    print(f"Device: {DEVICE}")
    print("Endpoints:")
    print("  - GET  /api/health")
    print("  - POST /api/predict")
    print("  - POST /api/predict-base64")
    print("="*50 + "\n")

    app.run(debug=True, host='0.0.0.0', port=5000)
