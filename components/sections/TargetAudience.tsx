"use client"

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Globe, Award, TrendingUp, CheckCircle } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface TargetAudienceProps {
  scrollToSection: (sectionId: string) => void
}

export function TargetAudience({ scrollToSection }: TargetAudienceProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards with flip effect
      gsap.from(".audience-card", {
        rotateY: 90,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".audience-card",
          start: "top 85%",
        },
      })

      // Animate icons
      gsap.from(".audience-icon", {
        scale: 0,
        rotation: 180,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: ".audience-icon",
          start: "top 85%",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="who-its-for" className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-white dark:from-secondary via-secondary/80 to-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="bg-primary/20 text-primary px-4 py-2 text-sm font-semibold mb-6 border border-primary/30">
            🎯 DESIGNED FOR SERIOUS APPLICANTS
          </Badge>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-foreground drop-shadow-lg mb-6">Who Is ApplySolo Germany For?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            This system is built for Indian students who want to apply to German public universities the right way.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: GraduationCap,
              title: "Indian Master's Applicants",
              description: "For students planning a Master's degree in Germany who want clarity, control, and independence from consultants.",
              image: "/placeholder.svg?height=200&width=300",
            },
            {
              icon: Globe,
              title: "Public University Focused Students",
              description: "For applicants targeting German public universities — not private institutions with high tuition fees.",
              image: "/placeholder.svg?height=200&width=300",
            },
            {
              icon: Award,
              title: "First-Time Germany Applicants",
              description: "For students who feel overwhelmed by APS, Uni-Assist, documents, and timelines and want a clear system.",
              image: "/placeholder.svg?height=200&width=300",
            },
            {
              icon: TrendingUp,
              title: "Self-Driven & Serious Candidates",
              description: "For students willing to follow sequence, take ownership, and execute admissions without shortcuts.",
              image: "/placeholder.svg?height=200&width=300",
            },
          ].map((item, index) => (
            <Card
              key={index}
              className="audience-card group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 dark:bg-secondary/50 backdrop-blur-sm border border-primary/20 shadow-lg overflow-hidden"
            >
              <div className="relative">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="audience-icon absolute top-4 left-4">
                  <div className="bg-white/90 dark:bg-secondary/90 backdrop-blur-sm rounded-full p-3 border border-primary/20">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  {item.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground text-base">{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 