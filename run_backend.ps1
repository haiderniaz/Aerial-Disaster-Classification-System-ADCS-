# Run the Flask backend from project root

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectRoot

Write-Host "🚀 Starting backend (Flask API)..." -ForegroundColor Green

& ".\.venv\Scripts\python.exe" "backend\app.py"
