import React from "react"

import { useState } from "react"
import { Upload, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ImageUploader({ onImageSelect, imagePreview, onRemove }) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageSelect(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0])
    }
  }

  if (imagePreview) {
    return (
      <Card className="p-6 border-2 border-border/50 bg-card hover:border-border/80 transition-colors">
        <div className="space-y-4">
          <div className="relative w-full h-64 sm:h-80 bg-muted rounded-lg overflow-hidden">
            <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
          </div>
          <Button
            onClick={onRemove}
            variant="outline"
            className="w-full border-red-200 hover:bg-red-50 dark:hover:bg-red-950 text-red-600 dark:text-red-400 bg-transparent"
          >
            <X className="mr-2 h-4 w-4" />
            Remove Image
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`p-8 sm:p-12 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${
        dragActive
          ? "border-purple-600 bg-purple-50/50 dark:bg-purple-950/20"
          : "border-border hover:border-purple-400 bg-card/50 hover:bg-card"
      }`}
    >
      <input
        type="file"
        id="file-input"
        onChange={handleChange}
        accept="image/jpeg,image/png,image/tiff,image/bmp"
        className="hidden"
        aria-label="Upload image"
      />

      <label htmlFor="file-input" className="flex flex-col items-center justify-center cursor-pointer">
        <div className="mb-4 p-3 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full">
          <Upload className="h-8 w-8 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-1">Drag and drop your image</h3>
        <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
        <p className="text-xs text-muted-foreground">JPG, JPEG, PNG, TIFF, BMP (Max 50MB)</p>
      </label>
    </Card>
  )
}