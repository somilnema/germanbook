import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { gsap } from "gsap"

const testimonials = [
  {
    text: "After using this kit, I got admitted to TU Munich and ETH Zurich with a full scholarship.",
    author: "Ritika S.",
    program: "MS in Computer Science",
    university: "TU Munich & ETH Zurich",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    text: "Helped me reshape my resume for Ivy League MBA. It's a game changer!",
    author: "Manan K.",
    program: "MBA",
    university: "Columbia University",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    text: "The templates are incredibly professional and easy to customize. Got into my dream university with scholarship!",
    author: "Priya M.",
    program: "MS in Data Science",
    university: "Stanford University",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    text: "This kit helped me highlight my research experience perfectly. Secured admission to 3 top universities!",
    author: "Arjun P.",
    program: "PhD in Engineering",
    university: "MIT",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
]

interface TestimonialsProps {
  scrollToSection: (sectionId: string) => void
}

export function Testimonials({ scrollToSection }: TestimonialsProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
        x: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: "top 80%",
        },
      })
    }, testimonialsRef)

    return () => ctx.revert()
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section ref={testimonialsRef} id="testimonials" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <Badge className="bg-primary/20 text-primary px-4 py-2 text-sm font-semibold mb-6 border border-primary/30">
            🌟 SUCCESS STORIES
          </Badge>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-foreground drop-shadow-lg mb-6">Real Results from Real Students</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from students who transformed their applications and secured admissions to their dream universities
          </p>
        </div>

        <div className="relative">
          <Card className="testimonial-card p-8 md:p-12 bg-secondary/50 backdrop-blur-sm shadow-2xl rounded-2xl border border-primary/20">
            <CardContent>
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-8 w-8 text-primary fill-current animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                <div className="relative">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].author}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-primary/20 rounded-full p-2 border border-white">
                    <Star className="h-4 w-4 text-primary fill-current" />
                  </div>
                </div>

                <div className="text-center md:text-left">
                  <blockquote className="text-2xl md:text-3xl text-foreground mb-6 italic font-medium leading-relaxed">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>

                  <div className="space-y-1">
                    <div className="text-xl font-bold text-foreground">{testimonials[currentTestimonial].author}</div>
                    <div className="text-lg text-primary font-semibold">{testimonials[currentTestimonial].program}</div>
                    <div className="text-base text-muted-foreground">{testimonials[currentTestimonial].university}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-8 space-x-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={prevTestimonial}
                  className="rounded-full w-14 h-14 border-2 border-white text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={nextTestimonial}
                  className="rounded-full w-14 h-14 border-2 border-white text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>

              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? "bg-primary scale-125" : "bg-primary/30 hover:bg-primary/50"
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <p className="text-lg text-muted-foreground mb-6">+ See 25+ more testimonials inside the kit</p>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => scrollToSection("buy-now")}
            >
              Join These Success Stories
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
} 