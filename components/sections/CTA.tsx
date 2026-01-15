"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface CTAProps {
  scrollToSection: (sectionId: string) => void
}

export function CTA({ scrollToSection }: CTAProps) {
  const router = useRouter()

  const handleBuyNow = () => {
    router.push("/checkout")
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 p-8 md:p-12">
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Join thousands of successful job seekers who have used our resume kit to land their dream jobs.
            Start your journey to success today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="text-lg px-8"
              onClick={handleBuyNow}
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8"
              onClick={() => scrollToSection("package")}
            >
              View Package Details
            </Button>
          </div>
        </div>
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
      </div>
    </div>
  )
} 