import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"

interface MobileStickyFooterProps {
  scrollToSection: (sectionId: string) => void
}

export function MobileStickyFooter({ scrollToSection }: MobileStickyFooterProps) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-b from-secondary/95 via-secondary/90 to-secondary backdrop-blur-lg border-t border-primary/20 shadow-2xl">
      <Button
        className="w-full bg-primary text-white hover:bg-primary/90 font-bold py-4 text-xl rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
        onClick={() => scrollToSection("buy-now")}
      >
        <span className="flex items-center justify-center gap-3">
          <Sparkles className="h-6 w-6 animate-spin" />
          BUY NOW for ₹499
          <ArrowRight className="h-6 w-6" />
        </span>
      </Button>
    </div>
  )
} 