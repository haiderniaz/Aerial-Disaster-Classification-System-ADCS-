# Backend (Flask API)

This folder contains the Flask API that serves the trained Vision Transformer (ViT) model for classifying images as **pre-disaster** or **post-disaster**.

## How to Run

From the project root (`D:\UNI\Semester 7\CV\Project`):

```powershell
# Activate your virtual environment if needed, then:
& .\.venv\Scripts\python.exe backend\app.py
```

The API will start on `http://localhost:5000` with these endpoints:

- `GET /api/health` – health check
- `POST /api/predict` – multipart image upload
- `POST /api/predict-base64` – base64 JSON upload

The model checkpoint is expected at `output_vit_xbd/best_model.pth` relative to the project root.
