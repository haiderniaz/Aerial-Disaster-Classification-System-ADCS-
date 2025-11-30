import { useState } from "react"
import { Upload, X, ImageIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
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
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
              <img 
                src={imagePreview || "/placeholder.svg"} 
                alt="Preview" 
                className="h-full w-full object-cover"
              />
            </div>
            <Button
              onClick={onRemove}
              variant="outline"
              className="w-full text-destructive hover:text-destructive"
            >
              <X className="mr-2 h-4 w-4" />
              Remove Image
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`border-2 border-dashed transition-colors ${
        dragActive
          ? "border-primary bg-accent"
          : "border-muted-foreground/25 hover:border-primary/50"
      }`}
    >
      <CardContent className="p-10">
        <input
          type="file"
          id="file-input"
          onChange={handleChange}
          accept="image/jpeg,image/png,image/tiff,image/bmp"
          className="hidden"
          aria-label="Upload image"
        />

        <label 
          htmlFor="file-input" 
          className="flex cursor-pointer flex-col items-center justify-center gap-4"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full border bg-muted">
            <Upload className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="space-y-2 text-center">
            <p className="text-sm font-medium">
              <span className="text-primary">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">
              JPG, PNG, TIFF or BMP (MAX. 50MB)
            </p>
          </div>
        </label>
      </CardContent>
    </Card>
  )
}