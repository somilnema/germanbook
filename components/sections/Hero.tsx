"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Sparkles, ArrowRight, Play } from "lucide-react"
import { gsap } from "gsap"
import { useEffect, useRef } from "react"

interface HeroProps {
  studentCount: number
  scrollToSection: (sectionId: string) => void
}

export function Hero({ studentCount, scrollToSection }: HeroProps) {
  const router = useRouter()
  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate text elements
      gsap.from(textRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      })

      // Animate image
      gsap.from(imageRef.current, {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const handleBuyNow = () => {
    router.push("/checkout")
  }

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div ref={textRef} className="space-y-4 sm:space-y-6 md:space-y-8">
            <Badge className="bg-primary/20 text-primary px-4 py-2 text-sm font-semibold mb-6 border border-primary/30">
              🔥 LIMITED TIME OFFER - 70% OFF
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-heading font-extrabold text-white drop-shadow-lg leading-tight">            
                           Crack German Public Universities {" "}
              <span className="text-primary">Without Consultants or Guesswork</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl">
              ApplySolo Germany is a step-by-step admission operating system designed for Indian students who want to secure admission into German public universities independently.

            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 font-bold px-3 sm:px-6 md:px-8 py-3 sm:py-5 md:py-6 text-sm sm:text-lg md:text-xl rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                onClick={handleBuyNow}
              >
                <span className="flex items-center justify-center gap-1.5 sm:gap-3">
                  <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 flex-shrink-0" />
                  <span className="truncate">Get ApplySolo Germany</span>
                  <ArrowRight className="h-4 w-4 sm:h-6 sm:w-6 flex-shrink-0" />
                </span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-primary hover:text-white px-3 sm:px-6 md:px-8 py-3 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg rounded-lg transition-all duration-300 w-full sm:w-auto"
                onClick={() => scrollToSection("whats-inside")}
              >
                <Play className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 flex-shrink-0" />
                <span className="truncate">See how it works</span>
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-12">
              <div className="bg-secondary/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 border border-white">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">7-Phase</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Admission System</div>
              </div>
              <div className="bg-secondary/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 border border-white">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">No</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Consultants Required</div>
              </div>
              <div className="bg-secondary/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 border border-white">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">Public</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Universities Only</div>
              </div>
              <div className="bg-secondary/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 border border-white">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">₹499</div>
                <div className="text-xs sm:text-sm text-muted-foreground">One-Time Cost</div>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div ref={imageRef} className="relative">
            <div className="relative z-10">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="Student with tablet"
                className="w-full h-auto rounded-2xl shadow-2xl border border-white"
              />
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-secondary/50 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-xl border border-white max-w-[200px] sm:max-w-none">
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="bg-primary/20 rounded-full p-2 sm:p-3 border border-primary/30">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-foreground font-bold text-xs sm:text-sm md:text-base">Trusted by Students</div>
                    <div className="text-muted-foreground text-xs">Worldwide</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 