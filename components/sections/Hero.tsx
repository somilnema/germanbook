"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle, Sparkles, ArrowRight, Play, Star } from "lucide-react"
import { gsap } from "gsap"
import { useEffect, useRef } from "react"
const avatars = [
  "/man1.jpeg",
  "/man2.jpeg",
  "/man3.jpeg",
  "/man4.jpeg",

]

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
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-12 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div ref={textRef} className="space-y-4 sm:space-y-6 md:space-y-8 pt-8 sm:pt-0">
            <div className="flex items-center gap-6 mt-4 sm:mt-0 mb-6">
              {/* Avatars */}
              <div className="flex -space-x-3">
                {avatars.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt="creator"
                    className="w-10 h-10 rounded-full border-2 border-black object-cover"
                  />
                ))}
              </div>

              {/* Rating */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold text-white">500+</span> Students
                </p>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-heading font-extrabold text-white drop-shadow-lg leading-tight">            
                           Crack German Public Universities {" "}
              <span className="text-primary">Without Consultants </span>
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
                src="/hero.png"
                alt="Student with tablet"
                className="w-[90%] mx-auto min-h-[210px] sm:h-[300px] md:h-[400px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="hidden sm:block absolute -bottom-8 -right-4 sm:-bottom-10 sm:-right-6 bg-secondary/50 backdrop-blur-sm p-2 sm:p-4 md:p-6 rounded-xl border border-white max-w-[160px] sm:max-w-none">
                <div className="flex items-center gap-1 sm:gap-4">
                  <div className="bg-green-500/20 rounded-full p-1 sm:p-3 border border-green-500/30">
                    <CheckCircle className="h-4 w-4 sm:h-6 sm:w-6 text-green-500" />
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