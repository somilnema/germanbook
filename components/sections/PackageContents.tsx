"use client"

import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight } from "lucide-react"

interface PackageContentsProps {
  scrollToSection: (sectionId: string) => void
}

export function PackageContents({ scrollToSection }: PackageContentsProps) {
  const router = useRouter()

  const handleBuyNow = () => {
    router.push("/checkout")
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">What You Get with ApplySolo Germany</h2>
        <p className="text-muted-foreground">
          Everything you need to execute German public university admissions correctly — end to end.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6 border border-white">
          <h3 className="text-xl font-semibold mb-4">Admission Execution Guide</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Phase-by-phase admission operating system</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Clear entry & exit conditions for each stage</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Beginner-friendly explanations in plain language</span>
            </li>
          </ul>
        </Card>

        <Card className="p-6 border border-white">
          <h3 className="text-xl font-semibold mb-4">Application & Visa Playbooks</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>APS, Uni-Assist & direct application workflows</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Offer evaluation & acceptance logic</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Visa, blocked account & pre-departure clarity</span>
            </li>
          </ul>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <Button
          size="lg"
          className="text-lg px-8"
          onClick={handleBuyNow}
        >
          Get ApplySolo Germany
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
} 