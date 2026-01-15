import { GraduationCap, Mail } from "lucide-react"

interface FooterProps {
  scrollToSection: (sectionId: string) => void
}

export function Footer({ scrollToSection }: FooterProps) {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-secondary via-secondary/90 to-secondary py-12 px-4 pb-24 lg:pb-12">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <GraduationCap className="h-8 w-8 text-primary animate-bounce" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-ping"></div>
              </div>
              <span className="text-xl font-bold text-foreground">Admivo Resume Kit</span>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Transforming university applications, one resume at a time. Join thousands of students who've secured
              admissions to their dream universities with our expert-crafted resume kit.
            </p>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>support@Admivo Resume Kitresumekit.com</span>
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
                  onClick={() => scrollToSection("buy-now")} 
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
              <li className="hover:text-primary transition-colors duration-300 cursor-pointer">Email Support</li>
              <li className="hover:text-primary transition-colors duration-300 cursor-pointer">Download Help</li>
              <li className="hover:text-primary transition-colors duration-300 cursor-pointer">Template Guide</li>
              <li className="hover:text-primary transition-colors duration-300 cursor-pointer">Success Tips</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/20 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 Admivo Resume Kit. All rights reserved. | Helping students achieve their dreams since 2020.
          </p>
        </div>
      </div>
    </footer>
  )
} 