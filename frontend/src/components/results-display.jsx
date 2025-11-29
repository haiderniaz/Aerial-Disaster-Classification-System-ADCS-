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
      {/* Image and Result Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image */}
        {imagePreview && (
          <Card className="p-4 border-border/50">
            <img
              src={imagePreview || "/placeholder.svg"}
              alt="Analyzed"
              className="w-full h-64 object-cover rounded-lg"
            />
          </Card>
        )}

        {/* Main Result */}
        <Card className="p-6 sm:p-8 border-2 border-border/50 bg-gradient-to-br from-card via-card to-background flex flex-col justify-center">
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
                className={`text-3xl font-bold ${
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
              <span className="text-4xl font-bold text-foreground">{confidencePercent}%</span>
              <span className="text-sm text-muted-foreground">confidence</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Probability Bars */}
      <Card className="p-6 sm:p-8 border-border/50 space-y-6">
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-semibold text-foreground">Pre-Disaster</label>
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">{preDisasterProb}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${preDisasterProb}%`,
              }}
              role="progressbar"
              aria-valuenow={preDisasterProb}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-semibold text-foreground">Post-Disaster</label>
            <span className="text-sm font-semibold text-red-600 dark:text-red-400">{postDisasterProb}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-400 to-red-600 dark:from-red-500 dark:to-red-700 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${postDisasterProb}%`,
              }}
              role="progressbar"
              aria-valuenow={postDisasterProb}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      </Card>

      {/* Model Info */}
      <Card className="p-4 bg-purple-50/50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800/50 text-center">
        <p className="text-xs text-muted-foreground">
          Analysis powered by Vision Transformer (ViT) with multi-modal feature extraction
        </p>
      </Card>

      {/* Debug Info - Remove this after testing */}
      <Card className="p-4 bg-gray-50 dark:bg-gray-900 border-gray-200">
        <h3 className="text-sm font-semibold mb-2">Debug Info (Raw Prediction Data):</h3>
        <pre className="text-xs overflow-auto">{JSON.stringify(prediction, null, 2)}</pre>
      </Card>
    </div>
  )
}