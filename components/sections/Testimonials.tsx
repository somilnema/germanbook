import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { gsap } from "gsap"

const testimonials = [
  {
    text: "I was watching YouTube videos every day and still felt lost. Everyone explained parts — no one explained the order. ApplySolo Germany was the first thing that actually made sense.",
    author: "Nikhil P.",
    program: "B.Tech (Tier-3 college)",
    university: "MS in Mechanical Engineering – TU Chemnitz",
    image: "/studentimage1.png?height=80&width=80",
    rating: 5,
  },
  {
    text: "A consultant told me my profile wasn't good enough for public universities. ApplySolo showed me that the problem wasn't my profile - it was my approach.",
    author: "Ananya R.",
    program: "B.Tech Computer Science",
    university: "MS in Data Science – University of Magdeburg",
    image: "/studentimage2.png?height=80&width=80",
    rating: 5,
  },
  {
    text: "APS and documents scared me the most. I kept delaying because I didn't know what to do first. Following the system step by step removed all the panic.",
    author: "Saurabh S.",
    program: "B.E. Electrical",
    university: "MS in Electrical Engineering – TU Ilmenau",
    image: "/studentimage3.png?height=80&width=80",
    rating: 5,
  },
  {
    text: "I didn't fail because of marks or money. I was failing because of small mistakes and wrong timing. ApplySolo helped me avoid things I didn't even know could reject me.",
    author: "Ritika M.",
    program: "B.Tech IT",
    university: "MS in Computer Science – University of Stuttgart",
    image: "/studentimage4.png?height=80&width=80",
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
    <section ref={testimonialsRef} id="testimonials" className="py-8 sm:py-16 md:py-20 px-2 sm:px-4 relative overflow-hidden bg-[#f5f5f5] rounded-[3rem] sm:rounded-[3rem] mx-2 sm:mx-4 md:mx-8">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <Badge className="bg-primary/20 text-primary px-4 py-2 text-sm font-semibold mb-6 border border-primary/30">
            🌟 SUCCESS STORIES
          </Badge>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold drop-shadow-lg mb-6" style={{color: '#161616'}}>Real Results from Real Students</h2>
          <p className="text-xl max-w-3xl mx-auto" style={{color: '#161616'}}>
            Hear from students who transformed their applications and secured admissions to their dream universities
          </p>
        </div>

        <div className="relative">
          <Card className="testimonial-card p-8 md:p-12 bg-[#f5f5f5] shadow-2xl rounded-2xl" style={{border: '2px solid #161616'}}>
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

              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8  mb-8">
                <div className="relative flex-shrink-0">
                  <div className="w-32 h-32 md:w-60 md:h-60 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].author}
                      className="w-full h-full object-cover object-[50%_20%] md:object-[50%_30%]"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-primary/20 rounded-full p-2 border border-white">
                    <Star className="h-4 w-4 text-primary fill-current" />
                  </div>
                </div>

                <div className="text-center md:text-left">
                  <blockquote className="text-2xl md:text-3xl mb-6 italic font-medium leading-relaxed" style={{color: '#161616'}}>
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>

                  <div className="space-y-1">
                    <div className="text-xl font-bold" style={{color: '#161616'}}>{testimonials[currentTestimonial].author}</div>
                    <div className="text-lg font-semibold" style={{color: '#161616'}}>{testimonials[currentTestimonial].program}</div>
                    <div className="text-base" style={{color: '#161616'}}>{testimonials[currentTestimonial].university}</div>
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
            <p className="text-lg mb-6" style={{color: '#161616'}}>See 25+ more testimonials inside the system</p>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => scrollToSection("package")}
            >
              Join These Success Stories
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
} 