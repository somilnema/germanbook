"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { UniversityCarousel } from "@/components/sections/carousal"
import { Features } from "@/components/sections/Features"
import { Transformations } from "@/components/sections/Transformations"
import { Testimonials } from "@/components/sections/Testimonials"
import { CTA } from "@/components/sections/CTA"
import { FAQ } from "@/components/sections/FAQ"
import { PackageContents } from "@/components/sections/PackageContents"
import { TargetAudience } from "@/components/sections/TargetAudience"

import { FloatingBackground } from "@/components/shared/FloatingBackground"
import { ThemeProvider } from "@/components/theme-provider"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Star, Users } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AdmivoResumeKit() {
  const [studentCount, setStudentCount] = useState(0)
  const [successRate, setSuccessRate] = useState(0)
  const headerRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLElement>(null)
  const transformationsRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)
  const faqRef = useRef<HTMLElement>(null)
  const packageRef = useRef<HTMLElement>(null)
  const audienceRef = useRef<HTMLElement>(null)
  const router = useRouter()

  useEffect(() => {
    // Animated counters
    const animateCounter = (target: number, setter: (value: number) => void, duration = 2000) => {
      let start = 0
      const increment = target / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start >= target) {
          setter(target)
          clearInterval(timer)
        } else {
          setter(Math.floor(start))
        }
      }, 16)
    }

    // Header animation
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, 
        { y: -100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.2, ease: "back.out(1.7)" }
      )
    }

    // Hero section animation
    if (heroRef.current) {
      const heroTimeline = gsap.timeline({ delay: 0.5 })
      const h1 = heroRef.current.querySelector("h1")
      const p = heroRef.current.querySelector("p")
      const cta = heroRef.current.querySelector(".hero-cta")

      if (h1) heroTimeline.fromTo(h1, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 })
      if (p) heroTimeline.fromTo(p, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.8")
      if (cta) heroTimeline.fromTo(cta, 
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.5"
      )
    }

    // Features animation
    if (featuresRef.current) {
      const cards = featuresRef.current.querySelectorAll(".feature-card")
      gsap.fromTo(cards,
        { y: 100, opacity: 0, rotationX: 45 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 70%",
            end: "bottom 20%",
          },
        }
      )
    }

    // Transformations animation
    if (transformationsRef.current) {
      const items = Array.from(transformationsRef.current.children)
      gsap.fromTo(items,
        { scale: 0.5, opacity: 0, rotation: 10 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: transformationsRef.current,
            start: "top 80%",
          },
        }
      )
    }

    // Testimonials animation
    if (testimonialsRef.current) {
      const items = Array.from(testimonialsRef.current.children)
      gsap.fromTo(items,
        { x: 200, opacity: 0, rotationY: 45 },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 80%",
          },
        }
      )
    }

    // CTA animation
    if (ctaRef.current) {
      gsap.fromTo(ctaRef.current,
        { y: 100, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
          },
        }
      )
    }

    // FAQ animation
    if (faqRef.current) {
      const items = Array.from(faqRef.current.children)
      gsap.fromTo(items,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: faqRef.current,
            start: "top 80%",
          },
        }
      )
    }

    // Package Contents animation
    if (packageRef.current) {
      const items = Array.from(packageRef.current.children)
      gsap.fromTo(items,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: packageRef.current,
            start: "top 80%",
          },
        }
      )
    }

    // Target Audience animation
    if (audienceRef.current) {
      const items = Array.from(audienceRef.current.children)
      gsap.fromTo(items,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: audienceRef.current,
            start: "top 80%",
          },
        }
      )
    }

    // Sticky header effect
    if (heroRef.current && headerRef.current) {
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "bottom top",
        onEnter: () => {
          gsap.to(headerRef.current, {
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            borderBottom: "1px solid rgba(255, 165, 0, 0.2)",
            duration: 0.4,
          })
        },
        onLeaveBack: () => {
          gsap.to(headerRef.current, {
            backgroundColor: "transparent",
            backdropFilter: "none",
            boxShadow: "none",
            borderBottom: "none",
            duration: 0.4,
          })
        },
      })
    }

    // Add gradient animation
    gsap.to(".gradient-bg", {
      backgroundPosition: "200% 200%",
      duration: 20,
      repeat: -1,
      ease: "linear",
    })

    // Add glow effect to cards
    gsap.to(".glow-card", {
      boxShadow: "0 0 20px rgba(0, 255, 132, 0.3)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleBuyNow = () => {
    router.push("/checkout")
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 text-foreground overflow-x-hidden relative">
        {/* Gradient Overlay */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none" />
        
        {/* Animated Gradient Background */}
        <div className="fixed inset-0 gradient-bg bg-[#171717] bg-[length:200%_200%] opacity-100 pointer-events-none" />
        
        <FloatingBackground />
        <Header scrollToSection={scrollToSection} />
        <main className="relative z-10">
          <section ref={heroRef} id="hero" className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
            <Hero studentCount={studentCount} scrollToSection={scrollToSection} />
          </section>
          
          <section id="universities" className="relative py-8 md:py-12">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
            <UniversityCarousel />
          </section>
          
          <section ref={featuresRef} id="features" className="relative py-8 md:py-12">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
            <Features scrollToSection={scrollToSection} />
          </section>
          
          <section ref={transformationsRef} id="transformations" className="relative py-8 md:py-12">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
            <Transformations scrollToSection={scrollToSection} />
          </section>
          
          <section ref={testimonialsRef} id="testimonials" className="relative py-8 md:py-12">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
            <Testimonials scrollToSection={scrollToSection} />
          </section>
          
          <section ref={packageRef} id="package" className="relative py-8 md:py-12">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
            <PackageContents scrollToSection={scrollToSection} />
          </section>
          
          <section ref={audienceRef} id="audience" className="relative py-8 md:py-12">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
            <TargetAudience scrollToSection={scrollToSection} />
          </section>
          
          <section ref={faqRef} id="faq" className="relative py-8 md:py-12">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
            <FAQ scrollToSection={scrollToSection} />
          </section>
          
          <section ref={ctaRef} id="cta" className="relative py-8 md:py-12">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
            <CTA scrollToSection={scrollToSection} />
          </section>
        </main>
        <Footer scrollToSection={scrollToSection} />
      </div>
    </ThemeProvider>
  )
}
