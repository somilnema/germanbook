"use client"

import { GraduationCap, Mail } from "lucide-react"
import { useRouter } from "next/navigation"

interface FooterProps {
  scrollToSection: (sectionId: string) => void
}

export function Footer({ scrollToSection }: FooterProps) {
  const router = useRouter()
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-secondary via-secondary/90 to-secondary py-12 px-4 pb-24 lg:pb-12">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/logo.png"
                alt="ApplySolo Logo"
                className="h-28 w-auto"
                style={{ filter: "brightness(0) invert(31%) sepia(87%) saturate(2257%) hue-rotate(212deg) brightness(96%) contrast(92%)" }}
              />
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Most students don’t fail German admissions. They fail the process.
              ApplySolo Germany gives you a clear, step-by-step admission system to independently secure admission to German public universities
              without agents, without shortcuts, without confusion.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground">


              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>applysolo30@gmail.com</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-primary">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <button
                  onClick={() => scrollToSection("whats-inside")}
                  className="hover:text-primary transition-colors duration-300"
                >
                  What's Inside
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className="hover:text-primary transition-colors duration-300"
                >
                  Success Stories
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("faqs")}
                  className="hover:text-primary transition-colors duration-300"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("package")}
                  className="hover:text-primary transition-colors duration-300"
                >
                  Buy Now
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-primary">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li
                className="hover:text-primary transition-colors duration-300 cursor-pointer"
                onClick={() => router.push("/contact")}
              >
                Contact Us
              </li>
              <li
                className="hover:text-primary transition-colors duration-300 cursor-pointer"
                onClick={() => router.push("/download-help")}
              >
                Download Help
              </li>
              <li
                className="hover:text-primary transition-colors duration-300 cursor-pointer"
                onClick={() => router.push("/shipping-policy")}
              >
                Shipping Policy
              </li>
              <li
                className="hover:text-primary transition-colors duration-300 cursor-pointer"
                onClick={() => router.push("/cancellation-refund")}
              >
                Cancellations & Refunds
              </li>
              <li
                className="hover:text-primary transition-colors duration-300 cursor-pointer"
                onClick={() => router.push("/privacy-policy")}
              >
                Privacy Policy
              </li>
              <li
                className="hover:text-primary transition-colors duration-300 cursor-pointer"
                onClick={() => router.push("/terms-and-conditions")}
              >
                Terms & Conditions
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/20 pt-8 text-center">
          <p className="text-muted-foreground">

          </p>
        </div>
      </div>
    </footer>
  )
} 