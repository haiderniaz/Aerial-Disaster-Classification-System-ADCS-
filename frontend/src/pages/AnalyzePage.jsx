"use client"

import { useState, useRef } from "react"
import { Loader2, RefreshCw, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import ImageUploader from "@/components/image-uploader"
import ResultsDisplay from "@/components/results-display"

export default function AnalyzePage() {
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

      const response = await fetch(" https://unlogistical-uncorresponding-kellen.ngrok-free.dev/api/predict", {
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
      console.log("Received prediction data:", data)
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
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Main Content */}
      <div className="flex-1 container py-6 md:py-10">
        <div className="mx-auto max-w-[90rem]">
          {!prediction ? (
            <div className="mx-auto max-w-2xl space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Upload Image</h1>
                <p className="text-muted-foreground">
                  Upload satellite or aerial imagery to detect pre and post-disaster conditions
                </p>
              </div>

              <ImageUploader onImageSelect={handleImageSelect} imagePreview={imagePreview} onRemove={handleReset} />

              {error && (
                <Card className="border-destructive">
                  <CardContent className="pt-6">
                    <p className="text-sm text-destructive">{error}</p>
                  </CardContent>
                </Card>
              )}

              {selectedFile && !error && (
                <Button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="w-full"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Image...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Analyze Image
                    </>
                  )}
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Analysis Results</h1>
                <p className="text-muted-foreground">
                  Review the disaster detection analysis below
                </p>
              </div>

              <ResultsDisplay prediction={prediction} imagePreview={imagePreview} />

              <div className="flex justify-center">
                <Button onClick={handleAnalyzeAnother} variant="outline" size="lg">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Analyze Another Image
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

