import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, CheckCircle } from "lucide-react"

interface TransformationsProps {
  scrollToSection: (sectionId: string) => void
}

export function Transformations({ scrollToSection }: TransformationsProps) {
  return (
    <section id="transformations" className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-secondary via-secondary/80 to-white dark:to-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="bg-primary/20 text-primary px-4 py-2 text-sm font-semibold mb-6 border border-white">
            🔍REAL ADMISSION CLARITY
          </Badge>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-foreground drop-shadow-lg mb-6">From Confusion to Systematic Execution</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
             See how Indian students move from scattered advice and guesswork
to a clear, phase-by-phase German admission system.

          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <div className="bg-white/80 dark:bg-secondary/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500 border border-white">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-red-400 flex items-center gap-2">
                  <X className="h-6 w-6" />
                  Before
                </h3>
                <Badge variant="destructive" className="bg-red-500/20 text-red-400 border border-red-500/30">High Risk</Badge>
              </div>
              <div className="bg-gray-50 dark:bg-secondary/30 h-80 rounded-xl flex items-center justify-center relative overflow-hidden border border-white">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Before resume example"
                  className="max-w-full max-h-full object-contain"
                />
                <div className="absolute inset-0 bg-red-500/10"></div>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <X className="h-4 w-4 text-red-400" />
                  No clear sequence or roadmap  
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <X className="h-4 w-4 text-red-400" />
                 Random advice from multiple sources  
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <X className="h-4 w-4 text-red-400" />
                 Late discovery of eligibility or document issues
                </p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="bg-white/80 dark:bg-secondary/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500 border-2 border-white">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-green-500 flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  After
                </h3>
                <Badge className="bg-green-500/20 text-green-500 border border-green-500/30">System Aligned</Badge>
              </div>
              <div className="bg-gray-50 dark:bg-secondary/30 h-80 rounded-xl flex items-center justify-center relative overflow-hidden border border-white">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="After resume example"
                  className="max-w-full max-h-full object-contain"
                />
                <div className="absolute inset-0 bg-primary/10"></div>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-green-500 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Clear phase-by-phase execution plan
                </p>
                <p className="text-sm text-green-500 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Correct documents, portals, and timelines
                </p>
                <p className="text-sm text-green-500 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Full ownership with no consultant dependency
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button
            className="bg-primary text-white hover:bg-primary/90 font-bold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => scrollToSection("buy-now")}
          >
            Get the ApplySolo Germany System
          </Button>
        </div>
      </div>
    </section>
  )
} 