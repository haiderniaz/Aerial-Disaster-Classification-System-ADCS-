"use client"

import { useState, useRef } from "react"
import { Upload, Loader2, RefreshCw, Satellite, Shield, Zap, BarChart3, Globe, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ImageUploader from "@/components/image-uploader"
import ResultsDisplay from "@/components/results-display"

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const [showUpload, setShowUpload] = useState(false)
  const fileInputRef = useRef(null)

  const handleImageSelect = (file) => {
    const validTypes = ["image/jpeg", "image/png", "image/tiff", "image/bmp", "image/x-bmp"]

    if (!validTypes.includes(file.type)) {
      setError("Please select a valid image file (JPG, JPEG, PNG, TIFF, BMP)")
      return
    }

    if (file.size > 50 * 1024 * 1024) {
      setError("File size must be less than 50MB")
      return
    }

    setSelectedFile(file)
    setError(null)

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result)
    }
    reader.readAsDataURL(file)
  }

  const handleAnalyze = async () => {
    if (!selectedFile) return

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("image", selectedFile)

      const response = await fetch("https://unlogistical-uncorresponding-kellen.ngrok-free.dev/api/predict", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Invalid file. Please select a valid image.")
        }
        throw new Error("Failed to analyze image. Please try again.")
      }

      const data = await response.json()
      console.log("Received prediction data:", data) // Debug log
      setPrediction(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while analyzing the image.")
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setSelectedFile(null)
    setImagePreview(null)
    setPrediction(null)
    setError(null)
    setShowUpload(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleAnalyzeAnother = () => {
    handleReset()
  }

  const handleGetStarted = () => {
    setShowUpload(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {!showUpload && !prediction ? (
        // Landing Page
        <div className="min-h-screen flex flex-col">
          {/* Hero Section */}
          <section className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-6xl mx-auto text-center">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 mb-6">
                  <Satellite className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 mb-6">
                  Disaster Detection AI
                </h1>
                <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Advanced computer vision powered by Vision Transformer to instantly detect and assess disaster impact from aerial and satellite imagery
                </p>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
                <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Zap className="w-8 h-8 text-cyan-600" />
                  </div>
                  <div className="text-3xl font-bold text-slate-800 dark:text-white mb-1">73.4%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Model Accuracy</div>
                </Card>
                <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-slate-800 dark:text-white mb-1">11ms</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Analysis Speed</div>
                </Card>
                <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg">
                  <div className="flex items-center justify-center mb-2">
                    <BarChart3 className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="text-3xl font-bold text-slate-800 dark:text-white mb-1">92%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Post-Disaster Detection</div>
                </Card>
              </div>

              {/* CTA Button */}
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-12 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Upload className="mr-3 h-6 w-6" />
                Start Analysis
              </Button>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/30 dark:bg-slate-800/30 backdrop-blur">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-800 dark:text-white mb-16">
                How It Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-100 to-blue-200 dark:from-cyan-900 dark:to-blue-800 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Upload className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">Upload Image</h3>
                  <p className="text-slate-600 dark:text-slate-300">Upload aerial or satellite imagery in various formats (JPG, PNG, TIFF, BMP)</p>
                </div>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-200 dark:from-blue-900 dark:to-purple-800 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">AI Analysis</h3>
                  <p className="text-slate-600 dark:text-slate-300">Advanced Vision Transformer processes the image with state-of-the-art computer vision</p>
                </div>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-pink-200 dark:from-purple-900 dark:to-pink-800 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Globe className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">Get Results</h3>
                  <p className="text-slate-600 dark:text-slate-300">Receive instant classification with confidence scores and detailed probability analysis</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        // Upload/Results Page
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="border-b border-border/20 py-6 px-4 sm:px-6 lg:px-8 bg-white/70 dark:bg-slate-800/70 backdrop-blur">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 mb-2">
                  🌍 Disaster Detection AI
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Upload satellite or aerial imagery to detect pre and post-disaster conditions
                </p>
              </div>
              {(prediction || selectedFile) && (
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="hidden sm:flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  New Analysis
                </Button>
              )}
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="max-w-7xl mx-auto">
              {/* Upload or Results */}
              {!prediction ? (
                <div className="space-y-6 animate-in fade-in duration-500 max-w-2xl mx-auto">
                  {/* Image Upload */}
                  <ImageUploader onImageSelect={handleImageSelect} imagePreview={imagePreview} onRemove={handleReset} />

                  {/* Error Message */}
                  {error && (
                    <Card className="p-4 border-l-4 border-red-500 bg-red-50 dark:bg-red-950">
                      <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
                    </Card>
                  )}

                  {/* Analyze Button */}
                  {selectedFile && !error && (
                    <Button
                      onClick={handleAnalyze}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-6 text-lg rounded-lg transition-all duration-200 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-5 w-5" />
                          Analyze Image
                        </>
                      )}
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* Results */}
                  <ResultsDisplay prediction={prediction} imagePreview={imagePreview} />

                  {/* Analyze Another Button */}
                  <div className="max-w-4xl mx-auto">
                    <Button
                      onClick={handleAnalyzeAnother}
                      variant="outline"
                      className="w-full border-2 border-border hover:border-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-950 text-foreground py-6 text-lg rounded-lg transition-all duration-200 font-semibold bg-transparent"
                    >
                      <RefreshCw className="mr-2 h-5 w-5" />
                      Analyze Another Image
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <footer className="border-t border-border/20 py-6 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-950/10 via-blue-950/10 to-purple-950/10">
            <div className="max-w-7xl mx-auto text-center">
              <p className="text-sm text-muted-foreground">
                ✨ Powered by Vision Transformer (ViT) and Advanced Computer Vision
              </p>
            </div>
          </footer>
        </div>
      )}
    </main>
  )
}
