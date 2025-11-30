"use client"

import { AlertTriangle, CheckCircle } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function ResultsDisplay({ prediction, imagePreview }) {
  console.log("ResultsDisplay received prediction:", prediction) // Debug log
  
  // Add null checks
  if (!prediction) {
    return (
      <Card className="p-6">
        <p>No prediction data received</p>
      </Card>
    )
  }

  // Extract the actual prediction from the response
  const actualPrediction = prediction.prediction || prediction

  // Handle different response formats - ensure we get a string
  let predictionClass = actualPrediction.label || actualPrediction.class || actualPrediction.prediction || actualPrediction.result || "Unknown"
  
  // If predictionClass is still an object, try to extract the class from it
  if (typeof predictionClass === 'object' && predictionClass !== null) {
    predictionClass = predictionClass.class || predictionClass.label || predictionClass.category || "Unknown"
  }
  
  // Ensure predictionClass is a string
  predictionClass = String(predictionClass)
  
  const confidence = actualPrediction.confidence || actualPrediction.score || 0
  
  const isPreDisaster = predictionClass.toLowerCase().includes("pre")
  const confidencePercent = Math.round(confidence * 100) / 100

  // Calculate individual probabilities using the correct field names from backend
  const preDisasterProb = Math.round((actualPrediction.pre_disaster_probability || 0))
  const postDisasterProb = Math.round((actualPrediction.post_disaster_probability || 0))

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Main Result Layout - Larger Image Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large Image Display */}
        {imagePreview && (
          <div className="lg:col-span-2">
            <Card className="p-6 border-border/50 bg-white/70 dark:bg-slate-800/70 backdrop-blur">
              <h3 className="text-lg font-semibold text-foreground mb-4">Analyzed Image</h3>
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Analyzed aerial imagery"
                  className="w-full h-96 sm:h-[500px] object-cover shadow-lg"
                />
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur ${
                    isPreDisaster 
                      ? "bg-green-100/80 text-green-800 dark:bg-green-900/80 dark:text-green-200" 
                      : "bg-red-100/80 text-red-800 dark:bg-red-900/80 dark:text-red-200"
                  }`}>
                    {predictionClass}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Result Summary */}
        <div className={`space-y-4 ${!imagePreview ? 'lg:col-span-3' : ''}`}>
          <Card className="p-6 sm:p-8 border-2 border-border/50 bg-gradient-to-br from-white via-white to-slate-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 flex flex-col justify-center">
            <div className="flex items-start gap-4 mb-6">
              <div
                className={`p-3 rounded-full flex-shrink-0 ${
                  isPreDisaster ? "bg-green-100 dark:bg-green-950/30" : "bg-red-100 dark:bg-red-950/30"
                }`}
              >
                {isPreDisaster ? (
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                ) : (
                  <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Classification</p>
                <h2
                  className={`text-2xl sm:text-3xl font-bold ${
                    isPreDisaster ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {predictionClass}
                </h2>
              </div>
            </div>

            <div className="mb-6 pt-6 border-t border-border/30">
              <p className="text-sm text-muted-foreground mb-2">Confidence Score</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-bold text-foreground">{confidencePercent}%</span>
                <span className="text-sm text-muted-foreground">confidence</span>
              </div>
              {/* Confidence Progress Bar */}
              <div className="w-full bg-muted rounded-full h-2 mt-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${
                    isPreDisaster 
                      ? "bg-gradient-to-r from-green-400 to-green-600" 
                      : "bg-gradient-to-r from-red-400 to-red-600"
                  }`}
                  style={{ width: `${confidencePercent}%` }}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Detailed Probability Analysis */}
      <Card className="p-6 sm:p-8 border-border/50 bg-white/70 dark:bg-slate-800/70 backdrop-blur space-y-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">Detailed Analysis</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pre-Disaster Probability */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <label className="text-sm font-semibold text-foreground">Pre-Disaster</label>
              </div>
              <span className="text-lg font-bold text-green-600 dark:text-green-400">{preDisasterProb}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${preDisasterProb}%` }}
                role="progressbar"
                aria-valuenow={preDisasterProb}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Normal conditions detected
            </p>
          </div>

          {/* Post-Disaster Probability */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <label className="text-sm font-semibold text-foreground">Post-Disaster</label>
              </div>
              <span className="text-lg font-bold text-red-600 dark:text-red-400">{postDisasterProb}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-400 to-red-600 dark:from-red-500 dark:to-red-700 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${postDisasterProb}%` }}
                role="progressbar"
                aria-valuenow={postDisasterProb}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Disaster impact detected
            </p>
          </div>
        </div>
      </Card>

      {/* Model Info */}
      <Card className="p-4 bg-gradient-to-r from-cyan-50/50 to-blue-50/50 dark:from-cyan-950/20 dark:to-blue-950/20 border-cyan-200 dark:border-cyan-800/50 text-center">
        <p className="text-xs text-muted-foreground">
          Analysis powered by Vision Transformer (ViT) with multi-modal feature extraction
        </p>
      </Card>
    </div>
  )
}