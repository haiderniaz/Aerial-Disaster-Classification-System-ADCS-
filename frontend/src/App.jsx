"use client"

import { Upload, Shield, Zap, BarChart3, Clock, ArrowRight, CheckCircle2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export default function Home() {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate("/analyze")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

        {/* Hero Section */}
        <section className="container flex flex-col items-center gap-4 pb-16 pt-6 md:pb-24 md:pt-10">
          <div className="flex max-w-[980px] flex-col items-center gap-2 mt-8 md:mt-16">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-1 h-3 w-3" />
              Powered by Vision Transformer
            </Badge>
            <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
              Aerial Disaster Classification System
            </h1>
            <span className="text-center text-lg font-light text-muted-foreground sm:text-xl max-w-[750px] mt-4">
              Advanced AI-powered disaster detection from satellite and aerial imagery.
              <br className="hidden sm:inline" />
              Built with Vision Transformer for real-time analysis.
            </span>
          </div>
          <div className="flex gap-4 mt-8">
            <Button size="lg" onClick={handleGetStarted}>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              <a href="https://github.com/haiderniaz/Aerial-Disaster-Classification-System-ADCS-" target="_blank" rel="noopener noreferrer">
                Learn More
              </a>
            </Button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-t bg-muted/40">
          <div className="container py-12 md:py-20 lg:py-24">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center mb-12">
              <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
                Performance Metrics
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Our AI model delivers exceptional accuracy and speed for disaster detection
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
              <Card className="relative overflow-hidden border-none shadow-none bg-background transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-1">
                  <div className="text-3xl font-bold">73.4%</div>
                  <p className="text-sm text-muted-foreground">Model Accuracy</p>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden border-none shadow-none bg-background transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-1">
                  <div className="text-3xl font-bold">~11ms</div>
                  <p className="text-sm text-muted-foreground">Analysis Speed</p>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden border-none shadow-none bg-background transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-1">
                  <div className="text-3xl font-bold">92%</div>
                  <p className="text-sm text-muted-foreground">Post-Disaster Detection</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-12 md:py-20 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center mb-12">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              How It Works
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Three simple steps to analyze disaster impact from aerial imagery
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <Card className="border-none shadow-none bg-muted/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background border transition-transform duration-300 group-hover:scale-110">
                  <Upload className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4">Upload Image</CardTitle>
                <CardDescription>
                  Upload aerial or satellite imagery in various formats (JPG, PNG, TIFF, BMP)
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-none shadow-none bg-muted/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background border transition-transform duration-300 group-hover:scale-110">
                  <Shield className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4">AI Analysis</CardTitle>
                <CardDescription>
                  Advanced Vision Transformer processes the image with state-of-the-art computer vision
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-none shadow-none bg-muted/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background border transition-transform duration-300 group-hover:scale-110">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4">Get Results</CardTitle>
                <CardDescription>
                  Receive instant classification with confidence scores and detailed probability analysis
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

      <Footer />
    </div>
  )
}
