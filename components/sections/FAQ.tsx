import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Is ApplySolo Germany suitable for beginners?",
    answer:
      "Yes. This system is designed for beginners who feel overwhelmed by Germany's admission process. It assumes no prior knowledge and explains every phase from absolute zero.",
  },
  {
    question: "Does this replace a consultant completely?",
    answer:
      "Yes - if you follow the system sequentially. ApplySolo Germany is built to replace consultants by giving you clarity, sequence, and execution logic. However, it does not offer personal counselling or live hand-holding.",
  },
  {
    question: "Will this guarantee admission to a German university?",
    answer:
      "No. Germany does not offer guarantees, and neither does this system. ApplySolo Germany helps you avoid mistakes and execute correctly - final decisions are always made by universities.",
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
  return (
    <section id="faqs" className="py-8 sm:py-16 md:py-20 px-2 sm:px-4 relative overflow-hidden bg-[#f5f5f5] rounded-[3rem] sm:rounded-[3rem] mx-2 sm:mx-4 md:mx-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="bg-primary/20 text-primary px-4 py-2 text-sm font-semibold mb-6 border border-primary/30">
            ❓ COMMON QUESTIONS
          </Badge>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold drop-shadow-lg mb-6" style={{ color: '#161616' }}>Frequently Asked Questions</h2>
          <p className="text-xl" style={{ color: '#161616' }}>Everything you need to know before using the ApplySolo Germany system</p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Collapsible key={index}>
              <CollapsibleTrigger
                className="flex w-full items-center justify-between rounded-2xl bg-[#f5f5f5] p-6 sm:p-8 text-left hover:shadow-lg transition-all duration-300 group border"
                style={{ borderColor: '#161616' }}
              >
                <span className="font-bold text-lg pr-4 group-hover:text-primary transition-colors" style={{ color: '#161616' }}>
                  {faq.question}
                </span>
                <ChevronDown className="h-6 w-6 transition-all duration-300 group-hover:rotate-180" style={{ color: '#161616' }} />
              </CollapsibleTrigger>
              <CollapsibleContent
                className="px-6 sm:px-8 pb-6 sm:pb-8 bg-[#f5f5f5] rounded-b-2xl border-x border-b"
                style={{ borderColor: '#161616' }}
              >
                <p className="text-base leading-relaxed" style={{ color: '#161616' }}>{faq.answer}</p>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  )
}