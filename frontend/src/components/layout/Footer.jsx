import { Satellite } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40 mt-auto">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-20 md:flex-row">
        <div className="flex items-center gap-2">
          <Satellite className="h-4 w-4" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with Vision Transformer (ViT)
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          © 2025 ADCS. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

