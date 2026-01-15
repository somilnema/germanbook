import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Target, Users, Star, BookOpen, Eye, CheckCircle } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const detailedFeatures = [
  {
    icon: FileText,
    title: "Phase-Based Admission Blueprint",
    description: "A complete, sequential roadmap covering the entire German public universityadmission process — from eligibility to visa",
    details: [
      "Clear phase-by-phase execution logic  ",
      "Entry & exit conditions for every stage  ",
      " No skipped steps or guesswork",
    ],
  },
  {
    icon: Target,
    title: "Eligibility & Reality Checks",
    description: "Early-stage filters that tell you whether Germany is structurally possible for your academic background — before you spend money.",
    details: [
      "University & degree recognition (ANABIN)",
      "APS requirement clarity",
      "Hard stops vs manageable risks",
    ],
  },
  {
    icon: Users,
    title: "Program & Academic Alignment",
    description: "Learn how German universities evaluate academic continuity and identify which Master's programs you actually qualify for.",
    details: [
      "Subject & credit mapping explained",
      "DAAD program shortlisting method",
      "Career-switch reality clarity",
    ],
  },
  {
    icon: Star,
    title: "Document Preparation System",
    description: "One fixed, correct document set prepared once — accepted by APS, Uni-Assist, universities, and visa authorities.",
    details: [
      "Correct formats & file naming",
      "German-style CV & SOP logic",
      "Consistency rules across portals",
    ],
  },
  {
    icon: BookOpen,
    title: "APS & Application Execution",
    description: "Step-by-step execution guidance for APS and university applications without delays, rejections, or silent failures.",
    details: [
      "APS application & verification flow",
      "Uni-Assist vs direct application clarity",
      "Deadline & submission discipline",
    ],
  },
  {
    icon: Eye,
    title: "Offers, Visa & Departure",
    description: "Logical frameworks to evaluate offers, accept correctly, secure your student visa, and prepare for Germany.",
    details: [
      "Conditional vs unconditional offers",
      "Visa documentation & blocked account clarity",
      "Pre-departure execution checklist",
    ],
  },
]

interface FeaturesProps {
  scrollToSection: (sectionId: string) => void
}

export function Features({ scrollToSection }: FeaturesProps) {
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate badge
      gsap.from(".features-badge", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
        },
      })

      // Animate heading with split
      gsap.from(".features-heading", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
        },
      })

      // Animate cards with smooth fade-in
      gsap.from(".feature-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: {
          amount: 0.6,
          from: "start",
        },
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".feature-card",
          start: "top 90%",
        },
      })

      // Add hover animation
      document.querySelectorAll(".feature-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
            duration: 0.3,
            ease: "power2.out",
          })
        })
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            duration: 0.3,
            ease: "power2.out",
          })
        })
      })
    }, featuresRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={featuresRef} id="whats-inside" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <Badge className="features-badge bg-primary/20 text-primary px-4 py-2 text-sm font-semibold mb-6 border border-primary/30">
            📦 COMPLETE PACKAGE
          </Badge>
          <h2 className="features-heading text-4xl md:text-5xl font-heading font-extrabold text-foreground drop-shadow-lg mb-6">
           What’s Inside the ₹499 ApplySolo Germany System?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to execute German public university admissions correctly —
built as a structured, phase-based operating system for Indian students.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {detailedFeatures.map((feature, index) => (
            <Card
              key={index}
              className="feature-card glow-card group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/90 dark:bg-gray-800/90 border-2 border-primary/30 shadow-xl overflow-hidden backdrop-blur-sm"
            >
              <CardHeader className="pb-4">
                <div className="bg-primary/30 rounded-full w-14 h-14 flex items-center justify-center mb-4 border-2 border-primary/50">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-gray-700 dark:text-gray-300 text-base">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 