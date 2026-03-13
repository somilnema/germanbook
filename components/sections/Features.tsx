import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Target, Users, Star, BookOpen, Eye, CheckCircle } from "lucide-react"
import { gsap } from "gsap"
import { useEffect, useRef } from "react"

const detailedFeatures = [
  {
    icon: FileText,
    title: "Phase-Based Admission Blueprint",
    description: "A complete, sequential roadmap covering the entire German public universityadmission process - from eligibility to visa",
    details: [
      "Clear phase-by-phase execution logic  ",
      "Entry & exit conditions for every stage  ",
      " No skipped steps or guesswork",
    ],
  },
  {
    icon: Target,
    title: "Eligibility & Reality Checks",
    description: "Early-stage filters that tell you whether Germany is structurally possible for your academic background - before you spend money.",
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
    description: "One fixed, correct document set prepared once - accepted by APS, Uni-Assist, universities, and visa authorities.",
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
      gsap.from(".feature-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
        },
      })
    }, featuresRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={featuresRef} id="whats-inside" className="py-6 sm:py-12 md:py-20 px-2 sm:px-4 relative overflow-hidden bg-[#f5f5f5] rounded-[3rem] sm:rounded-[3rem] mx-2 sm:mx-4 md:mx-8 ">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="bg-primary/20 text-primary px-4 py-2 text-sm font-semibold mb-6 border border-primary/30">
            📦 COMPLETE PACKAGE
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold drop-shadow-lg mb-4 sm:mb-6 px-2" style={{color: '#161616'}}>
           What's Inside the ₹499 ApplySolo Germany System?
          </h2>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-2" style={{color: '#161616'}}>
            Everything you need to execute German public university admissions correctly -
built as a structured, phase-based operating system for Indian students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {detailedFeatures.map((feature, index) => (
            <Card
              key={index}
              className="feature-card glow-card group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-[#f5f5f5] shadow-lg overflow-hidden backdrop-blur-sm rounded-[2.5rem]"
              style={{borderColor: '#161616', borderWidth: '1px', borderStyle: 'solid'}}
            >
              <CardHeader className="pb-4">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center mb-4 border border-white text-white font-bold text-lg">
                  {index + 1}
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors" style={{color: '#161616'}}>
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-base" style={{color: '#161616'}}>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span style={{color: '#161616'}}>{detail}</span>
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