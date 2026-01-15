import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { gsap } from "gsap"
import Image from "next/image"
interface HeaderProps {
  scrollToSection: (sectionId: string) => void
}

export function Header({ scrollToSection }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
    }, headerRef)

    return () => ctx.revert()
  }, [])

  const handleScroll = (sectionId: string) => {
    scrollToSection(sectionId)
    setIsMenuOpen(false)
  }

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-secondary/95 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Logo" width={150} height={200} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => handleScroll("home")}
              className="text-gray-300 hover:text-primary transition-all duration-300 hover:scale-105 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => handleScroll("whats-inside")}
              className="text-gray-300 hover:text-primary transition-all duration-300 hover:scale-105 font-medium"
            >
              What's Inside
            </button>
            <button
              onClick={() => handleScroll("testimonials")}
              className="text-gray-300 hover:text-primary transition-all duration-300 hover:scale-105 font-medium"
            >
              Testimonials
            </button>
            <button
              onClick={() => handleScroll("who-its-for")}
              className="text-gray-300 hover:text-primary transition-all duration-300 hover:scale-105 font-medium"
            >
              Who It's For
            </button>
            <button
              onClick={() => handleScroll("faqs")}
              className="text-gray-300 hover:text-primary transition-all duration-300 hover:scale-105 font-medium"
            >
              FAQs
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              className="hidden lg:inline-flex bg-primary text-white hover:bg-primary/90 font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => handleScroll("buy-now")}
            >
              Buy Now for ₹499
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 bg-secondary/95 backdrop-blur-lg rounded-xl shadow-2xl p-6 border border-white/10">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => handleScroll("home")}
                className="text-left text-gray-300 hover:text-primary transition-colors font-medium py-2"
              >
                Home
              </button>
              <button
                onClick={() => handleScroll("whats-inside")}
                className="text-left text-gray-300 hover:text-primary transition-colors font-medium py-2"
              >
                What's Inside
              </button>
              <button
                onClick={() => handleScroll("testimonials")}
                className="text-left text-gray-300 hover:text-primary transition-colors font-medium py-2"
              >
                Testimonials
              </button>
              <button
                onClick={() => handleScroll("who-its-for")}
                className="text-left text-gray-300 hover:text-primary transition-colors font-medium py-2"
              >
                Who It's For
              </button>
              <button
                onClick={() => handleScroll("faqs")}
                className="text-left text-gray-300 hover:text-primary transition-colors font-medium py-2"
              >
                FAQs
              </button>
              <Button
                className="bg-primary text-white hover:bg-primary/90 font-semibold mt-4"
                onClick={() => handleScroll("buy-now")}
              >
                Buy Now for ₹499
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
} 