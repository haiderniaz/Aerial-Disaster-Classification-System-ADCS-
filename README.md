# 🚁 Aerial Disaster Classification System (ADCS)

> AI-powered computer vision system for automated disaster impact assessment from aerial and satellite imagery

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.1.0-red.svg)](https://pytorch.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🎯 Overview

ADCS uses advanced **Vision Transformer (ViT)** deep learning to automatically classify aerial imagery as **pre-disaster** or **post-disaster** conditions. Designed for emergency response teams, insurance companies, and research organizations requiring rapid, accurate disaster impact analysis.

### 🌟 Key Features

- 🤖 **Vision Transformer AI** - State-of-the-art deep learning for image classification
- ⚡ **Real-time Analysis** - Fast disaster impact assessment with confidence scoring
- 🌐 **Modern Web Interface** - Intuitive React frontend with drag-and-drop upload
- 🔌 **REST API** - Easy integration with existing systems
- 📊 **Detailed Results** - Probability analysis and confidence metrics
- 🖼️ **Multiple Formats** - Supports JPEG, PNG, TIFF, BMP imagery
- 📱 **Responsive Design** - Works on desktop and mobile devices

## 🏗️ Architecture

```
ADCS/
├── backend/           # Flask REST API
│   ├── app.py        # Main API server
│   └── README.md     # Backend documentation
├── frontend/         # React Web Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── image-uploader.jsx
│   │   │   └── results-display.jsx
│   │   └── App.jsx
│   └── package.json
├── CV_Project.ipynb  # Model training notebook
└── requirements.txt  # Python dependencies
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- GPU with CUDA (recommended) or CPU

### 1. Clone Repository

```bash
git clone https://github.com/haiderniaz/Aerial-Disaster-Classification-System-ADCS-.git
cd Aerial-Disaster-Classification-System-ADCS-
```

### 2. Backend Setup

```bash
# Install Python dependencies
pip install -r requirements.txt

# Start Flask API server
cd backend
python app.py
```

The API will be available at `http://localhost:5000`

### 3. Frontend Setup

```bash
# Install Node.js dependencies
cd frontend
npm install

# Start development server
npm run dev
```

The web interface will be available at `http://localhost:5173`

### 4. Model Setup

Place your trained ViT model file (`best_model.pth`) in:
```
output_vit_xbd/best_model.pth
```

## 📖 Usage

### Web Interface

1. **Open** your browser to `http://localhost:5173`
2. **Upload** an aerial/satellite image by dragging or clicking
3. **Click** "Analyze Image" to process
4. **View** results showing:
   - Classification (Pre-Disaster / Post-Disaster)
   - Confidence percentage
   - Individual probability scores

### API Usage

```python
import requests

# Upload image for analysis
with open('aerial_image.jpg', 'rb') as f:
    response = requests.post(
        'http://localhost:5000/api/predict',
        files={'image': f}
    )

result = response.json()
print(f"Classification: {result['prediction']['label']}")
print(f"Confidence: {result['prediction']['confidence']}%")
```

### API Endpoints

- `GET /api/health` - Check API status
- `POST /api/predict` - Analyze image (multipart/form-data)
- `POST /api/predict-base64` - Analyze base64 image (JSON)

## 🛠️ Technology Stack

### AI/ML
- **PyTorch** - Deep learning framework
- **Vision Transformer (ViT)** - Image classification model
- **timm** - PyTorch Image Models library
- **Pillow** - Image processing

### Backend
- **Flask** - Web framework
- **Flask-CORS** - Cross-origin resource sharing
- **NumPy** - Numerical computing

### Frontend
- **React** - User interface library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI components
- **Lucide React** - Icon library

## 📊 Model Performance

The Vision Transformer model was trained on aerial disaster datasets and achieves:

- **Accuracy**: High classification accuracy on test data
- **Speed**: Real-time inference on modern hardware
- **Robustness**: Works across various image conditions and disasters

## 🎯 Use Cases

### Emergency Response
- **Rapid damage assessment** for first responders
- **Resource allocation** based on disaster severity
- **Evacuation planning** using pre/post analysis

### Insurance & Finance
- **Automated claim verification** from aerial imagery
- **Risk assessment** for property insurance
- **Damage quantification** for settlements

### Research & Planning
- **Environmental impact studies** 
- **Urban planning** and reconstruction
- **Climate change research** and monitoring

### Government & NGOs
- **Disaster monitoring** and early warning
- **Recovery progress tracking**
- **Policy planning** based on impact data

## 🚧 Development

### Project Structure

```
ADCS/
├── .gitignore              # Git ignore rules
├── requirements.txt        # Python dependencies
├── run_backend.ps1        # Windows backend starter
├── backend/               # Flask API
├── frontend/              # React app
├── CV_Project.ipynb       # Training notebook
└── README_DEPLOYMENT.md   # Deployment guide
```

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/improvement`)
5. Create Pull Request

### Local Development

```bash
# Backend development
cd backend
python app.py  # Starts with auto-reload

# Frontend development  
cd frontend
npm run dev    # Starts with hot-reload
```

## 🔧 Configuration

### Environment Variables

Create `.env` file in backend directory:
```env
MODEL_PATH=../output_vit_xbd/best_model.pth
DEVICE=cuda  # or 'cpu'
IMAGE_SIZE=224
DEBUG=True
```

### Model Configuration

Modify `backend/app.py` for different models:
```python
MODEL_PATH = 'path/to/your/model.pth'
IMAGE_SIZE = 224  # Input image size
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
```

## 📚 Documentation

- **Backend API**: See `backend/README.md`
- **Model Training**: See `CV_Project.ipynb`
- **Deployment**: See `README_DEPLOYMENT.md`

## 🤝 Support

For questions, issues, or contributions:

- **GitHub Issues**: [Report bugs or request features](https://github.com/haiderniaz/Aerial-Disaster-Classification-System-ADCS-/issues)
- **Discussions**: [Community discussions](https://github.com/haiderniaz/Aerial-Disaster-Classification-System-ADCS-/discussions)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Vision Transformer (ViT)** - Dosovitskiy et al.
- **timm library** - Ross Wightman
- **xBD Dataset** - xView2 Challenge dataset
- **React Community** - UI components and tools

## 🔗 Related Projects

- [xView2 Challenge](https://xview2.org/) - Disaster damage assessment
- [Vision Transformer](https://github.com/google-research/vision_transformer) - Original ViT implementation
- [timm](https://github.com/rwightman/pytorch-image-models) - PyTorch Image Models

---

<p align="center">
  <b>🌍 Making disaster response faster and more accurate through AI 🚁</b>
</p>

<p align="center">
  Made with ❤️ for disaster relief and emergency response
</p>