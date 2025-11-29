"use client"

import { useState, useRef } from "react"
import { Upload, Loader2, RefreshCw } from "lucide-react"
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

      const response = await fetch("http://localhost:5000/api/predict", {
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
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleAnalyzeAnother = () => {
    handleReset()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/20 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 mb-2">
            🌍 Disaster Detection AI
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Upload satellite or aerial imagery to detect pre and post-disaster conditions
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Upload or Results */}
          {!prediction ? (
            <div className="space-y-6 animate-in fade-in duration-500">
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
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-6 text-lg rounded-lg transition-all duration-200 disabled:opacity-50"
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
              <Button
                onClick={handleAnalyzeAnother}
                variant="outline"
                className="w-full border-2 border-border hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950 text-foreground py-6 text-lg rounded-lg transition-all duration-200 font-semibold bg-transparent"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Analyze Another Image
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/20 py-6 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-950/10 via-blue-950/10 to-purple-950/10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            ✨ Powered by Vision Transformer (ViT) and Advanced Computer Vision
          </p>
        </div>
      </footer>
    </main>
  )
}
