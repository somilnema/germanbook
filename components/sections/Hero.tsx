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
      // Animate badge with bounce
      gsap.from(".hero-badge", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      })

      // Animate heading with split effect
      gsap.from(".hero-heading", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        delay: 0.2,
      })

      // Animate text elements with stagger
      gsap.from(textRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.3,
      })

      // Animate buttons with scale and rotation
      gsap.from(".hero-button", {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "elastic.out(1, 0.5)",
        delay: 0.8,
      })

      // Animate stats with counter effect
      gsap.from(".hero-stat", {
        y: 30,
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 1.2,
      })

      // Animate image with parallax effect
      gsap.from(imageRef.current, {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5,
      })

      // Continuous floating animation for badge
      gsap.to(".hero-badge", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
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
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div ref={textRef} className="space-y-8">
            <Badge className="hero-badge bg-primary/20 text-primary px-4 py-2 text-sm font-semibold mb-6 border border-primary/30">
              🔥 LIMITED TIME OFFER - 70% OFF
            </Badge>

            <h1 className="hero-heading text-4xl md:text-6xl font-heading font-extrabold text-white drop-shadow-lg leading-tight">            
                           Crack German Public Universities {" "}
              <span className="text-primary">Without Consultants or Guesswork</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl">
              ApplySolo Germany is a step-by-step admission operating system designed for Indian students who want to secure admission into German public universities independently.

            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="hero-button bg-primary text-white hover:bg-primary/90 font-bold px-8 py-6 text-xl rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={handleBuyNow}
              >
                <span className="flex items-center gap-3">
                  <Sparkles className="h-6 w-6" />
                  Get ApplySolo Germany
                  <ArrowRight className="h-6 w-6" />
                </span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="hero-button border-2 border-white text-white hover:bg-primary hover:text-white px-8 py-6 text-lg rounded-lg transition-all duration-300"
                onClick={() => scrollToSection("whats-inside")}
              >
                <Play className="h-5 w-5 mr-2" />
                See how the system works
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="hero-stat bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-white">
                <div className="text-3xl font-bold text-primary mb-2">7-Phase</div>
                <div className="text-muted-foreground">Admission System</div>
              </div>
              <div className="hero-stat bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-white">
                <div className="text-3xl font-bold text-primary mb-2">No</div>
                <div className="text-muted-foreground">Consultants Required</div>
              </div>
              <div className="hero-stat bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-white">
                <div className="text-3xl font-bold text-primary mb-2">Public</div>
                <div className="text-muted-foreground">Universities Only</div>
              </div>
              <div className="hero-stat bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-white">
                <div className="text-3xl font-bold text-primary mb-2">₹499</div>
                <div className="text-muted-foreground">One-Time Cost</div>
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
              <div className="absolute -bottom-6 -right-6 bg-secondary/50 backdrop-blur-sm p-6 rounded-xl border border-white">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/20 rounded-full p-3 border border-primary/30">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-foreground font-bold">Trusted by Students</div>
                    <div className="text-muted-foreground text-sm">Worldwide</div>
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