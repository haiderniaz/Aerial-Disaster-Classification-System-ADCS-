"use client"

import { AlertTriangle, CheckCircle2, TrendingUp, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

export default function ResultsDisplay({ prediction, imagePreview }) {
  console.log("ResultsDisplay received prediction:", prediction)
  
  if (!prediction) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>No prediction data received</p>
        </CardContent>
      </Card>
    )
  }

  const actualPrediction = prediction.prediction || prediction
  let predictionClass = actualPrediction.label || actualPrediction.class || actualPrediction.prediction || actualPrediction.result || "Unknown"
  
  if (typeof predictionClass === 'object' && predictionClass !== null) {
    predictionClass = predictionClass.class || predictionClass.label || predictionClass.category || "Unknown"
  }
  
  predictionClass = String(predictionClass)
  const confidence = actualPrediction.confidence || actualPrediction.score || 0
  const isPreDisaster = predictionClass.toLowerCase().includes("pre")
  const confidencePercent = Math.round(confidence * 100) / 100
  const preDisasterProb = Math.round((actualPrediction.pre_disaster_probability || 0))
  const postDisasterProb = Math.round((actualPrediction.post_disaster_probability || 0))

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
      {/* Image Display */}
      {imagePreview && (
        <Card className="lg:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Analyzed Image</CardTitle>
              <Badge variant={isPreDisaster ? "success" : "destructive"}>
                {predictionClass}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Analyzed aerial imagery"
                className="h-full w-full object-cover"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Summary */}
      <div className={`space-y-6 ${imagePreview ? 'lg:col-span-3' : 'lg:col-span-7'}`}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              {isPreDisaster ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-red-600" />
              )}
              <CardTitle>Classification Result</CardTitle>
            </div>
            <CardDescription>AI-powered disaster detection analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-muted-foreground">Prediction</span>
                <span className={`text-2xl font-bold ${
                  isPreDisaster ? "text-green-600" : "text-red-600"
                }`}>
                  {predictionClass}
                </span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-muted-foreground">Confidence</span>
                <span className="text-xl font-bold">{confidencePercent}%</span>
              </div>
              <Progress 
                value={confidencePercent} 
                className={isPreDisaster ? "[&>div]:bg-green-600" : "[&>div]:bg-red-600"}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              <CardTitle>Model Performance</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Model Accuracy</span>
              <span className="font-medium">73.4%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Processing Time</span>
              <span className="font-medium">~11ms</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Architecture</span>
              <span className="font-medium">Vision Transformer</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <Card className="lg:col-span-7">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            <CardTitle>Probability Distribution</CardTitle>
          </div>
          <CardDescription>
            Detailed breakdown of classification probabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Pre-Disaster */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Pre-Disaster</span>
                </div>
                <span className="text-sm font-bold text-green-600">{preDisasterProb}%</span>
              </div>
              <Progress 
                value={preDisasterProb} 
                className="h-2 [&>div]:bg-green-600"
              />
              <p className="text-xs text-muted-foreground">
                Normal conditions detected - no visible disaster impact
              </p>
            </div>

            {/* Post-Disaster */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium">Post-Disaster</span>
                </div>
                <span className="text-sm font-bold text-red-600">{postDisasterProb}%</span>
              </div>
              <Progress 
                value={postDisasterProb} 
                className="h-2 [&>div]:bg-red-600"
              />
              <p className="text-xs text-muted-foreground">
                Disaster impact detected - significant changes observed
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}