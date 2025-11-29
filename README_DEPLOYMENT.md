# Disaster Detection Web Application

A full-stack web application that uses a Vision Transformer (ViT) deep learning model to classify images as pre-disaster or post-disaster.

## Architecture

- **Backend**: Flask API (Python) serving the trained PyTorch model
- **Frontend**: React application with modern UI/UX
- **Model**: Vision Transformer (ViT-Base) trained on xView2 disaster dataset

## Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn
- CUDA-capable GPU (optional, for faster inference)

### Backend Setup

1. **Install Python dependencies**:
   ```powershell
   pip install -r requirements_api.txt
   ```

2. **Verify model checkpoint exists**:
   Ensure `output_vit_xbd/best_model.pth` exists (this is your trained model)

3. **Start the Flask API server**:
   ```powershell
   # From project root
   & .\.venv\Scripts\python.exe backend\app.py
   ```
   
   The API will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```powershell
   cd frontend
   ```

2. **Install Node.js dependencies**:
   ```powershell
   npm install
   ```

3. **Start the React development server**:
   ```powershell
   npm start
   ```
   
   The frontend will open automatically at `http://localhost:3000`

## Usage

1. Make sure both backend (Flask) and frontend (React) servers are running
2. Open `http://localhost:3000` in your browser
3. Upload an image by:
   - Clicking "Choose Image" button
   - Dragging and dropping an image into the upload area
4. Click "🔍 Analyze Image" to get the prediction
5. View the results showing:
   - Classification (Pre-Disaster or Post-Disaster)
   - Confidence score
   - Probability breakdown for both classes

## API Endpoints

### Health Check
```
GET http://localhost:5000/api/health
```
Returns server status and model information.

### Predict (File Upload)
```
POST http://localhost:5000/api/predict
Content-Type: multipart/form-data

Body: { image: <file> }
```

### Predict (Base64)
```
POST http://localhost:5000/api/predict-base64
Content-Type: application/json

Body: { "image": "<base64-encoded-image>" }
```

## Features

### Frontend
- ✅ Drag-and-drop image upload
- ✅ Image preview before analysis
- ✅ Real-time prediction with confidence scores
- ✅ Visual probability breakdown
- ✅ Responsive design for mobile/desktop
- ✅ Modern, gradient UI with animations
- ✅ Error handling and loading states

### Backend
- ✅ Flask REST API
- ✅ CORS enabled for cross-origin requests
- ✅ GPU acceleration support
- ✅ Multiple input formats (file upload and base64)
- ✅ Comprehensive error handling
- ✅ Health check endpoint

## Project Structure

```
Project/
├── app.py                      # Flask API server
├── requirements_api.txt        # Python dependencies
├── output_vit_xbd/
│   └── best_model.pth         # Trained model checkpoint
├── frontend/
│   ├── package.json           # Node.js dependencies
│   ├── public/
│   │   └── index.html         # HTML template
│   └── src/
│       ├── index.js           # React entry point
│       ├── App.js             # Main React component
│       ├── App.css            # Styling
│       └── index.css          # Global styles
└── README_DEPLOYMENT.md       # This file
```

## Building for Production

### Backend
```powershell
# Use a production WSGI server like Gunicorn
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Frontend
```powershell
cd frontend
npm run build
# Serve the build/ directory with a static file server
```

## Troubleshooting

### Backend Issues

**Model not loading**:
- Verify `output_vit_xbd/best_model.pth` exists
- Check if the model architecture matches your training code

**CUDA errors**:
- The model will automatically fall back to CPU if CUDA is unavailable
- Ensure PyTorch with CUDA support is installed: `pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118`

**Port 5000 already in use**:
- Change the port in `app.py`: `app.run(port=5001)`
- Update the API_URL in `frontend/src/App.js` accordingly

### Frontend Issues

**Cannot connect to API**:
- Ensure Flask server is running on `http://localhost:5000`
- Check browser console for CORS errors
- Verify `flask-cors` is installed

**npm install fails**:
- Try removing `node_modules/` and `package-lock.json`
- Run `npm install` again

**Port 3000 already in use**:
- Set a different port: `PORT=3001 npm start` (Linux/Mac)
- Or in PowerShell: `$env:PORT=3001; npm start`

## Performance

- **Inference Time**: ~100-200ms per image on GPU, ~1-2s on CPU
- **Supported Image Formats**: JPG, PNG, TIFF, BMP
- **Max Image Size**: Automatically resized to 224x224 for model input

## Security Notes

For production deployment:
- Enable HTTPS
- Add authentication/authorization
- Implement rate limiting
- Validate and sanitize all inputs
- Use environment variables for configuration
- Don't expose debug mode

## License

This project is part of a Computer Vision course project.
