"use client"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { ChevronDown } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const faqs = [
  {
    question: "Is ApplySolo Germany suitable for beginners?",
    answer:
      "Yes. This system is designed for beginners who feel overwhelmed by Germany's admission process. It assumes no prior knowledge and explains every phase from absolute zero.",
  },
  {
    question: "Does this replace a consultant completely?",
    answer:
      "Yes — if you follow the system sequentially. ApplySolo Germany is built to replace consultants by giving you clarity, sequence, and execution logic. However, it does not offer personal counselling or live hand-holding.",
  },
  {
    question: "Will this guarantee admission to a German university?",
    answer:
      "No. Germany does not offer guarantees, and neither does this system. ApplySolo Germany helps you avoid mistakes and execute correctly — final decisions are always made by universities.",
  },
  {
    question: "When should I start using this system?",
    answer:
      "Ideally, before APS and before applying to any university. The earlier you start, the more mistakes you avoid. You can also use it mid-process to regain clarity.",
  },
  {
    question: "Is this for private universities or public universities?",
    answer:
      "This system is strictly for German public universities. It is not designed for private universities that charge high tuition fees.",
  },
  {
    question: "Is this system useful for countries other than Germany?",
    answer:
      "No. ApplySolo Germany is built specifically for the German system. Other countries operate very differently and are not covered.",
  },
]

interface FAQProps {
  scrollToSection: (sectionId: string) => void
}

export function FAQ({ scrollToSection }: FAQProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate FAQ items with stagger
      gsap.from(".faq-item", {
        x: -50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".faq-item",
          start: "top 90%",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="faqs" className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-secondary via-secondary/80 to-white dark:to-secondary">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="bg-primary/20 text-primary px-4 py-2 text-sm font-semibold mb-6 border border-primary/30">
            ❓ COMMON QUESTIONS
          </Badge>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-foreground drop-shadow-lg mb-6">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground">Everything you need to know before using the ApplySolo Germany system</p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Collapsible key={index} className="faq-item">
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-2xl bg-white/80 dark:bg-secondary/50 backdrop-blur-sm p-8 text-left hover:bg-white/90 dark:hover:bg-secondary/60 hover:shadow-lg transition-all duration-300 group border border-primary/20">
                <span className="font-bold text-foreground text-lg pr-4 group-hover:text-primary transition-colors">
                  {faq.question}
                </span>
                <ChevronDown className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-8 pb-8 bg-white/80 dark:bg-secondary/50 backdrop-blur-sm rounded-b-2xl border-x border-b border-primary/20">
                <p className="text-muted-foreground text-base leading-relaxed">{faq.answer}</p>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  )
} 