import { Satellite, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Header({ 
  title = "ADCS", 
}) {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <button 
          onClick={handleGoHome}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <Satellite className="h-6 w-6" />
          <span className="font-bold">
            {title}
          </span>
        </button>
        <nav className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            asChild
          >
            <a 
              href="https://github.com/haiderniaz/Aerial-Disaster-Classification-System-ADCS-" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Button>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}

