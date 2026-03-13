"use client"

import { useEffect, useState } from "react"
import { CheckCircle, Mail } from "lucide-react"

export default function CheckoutSuccess() {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setShowConfetti(true)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-secondary via-secondary/90 to-white dark:to-secondary px-4 py-16">
      <div className="w-full max-w-2xl bg-white dark:bg-secondary/80 rounded-3xl shadow-2xl p-10 space-y-6 border border-primary/20 backdrop-blur-lg text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-20 h-20 text-primary animate-bounce" />
        </div>
        <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-foreground drop-shadow-lg mb-2">
          Payment Successful! 🎉
        </h1>
        <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Mail className="w-8 h-8 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Check Your Email!</h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Thank you for your purchase! We've sent an email to your inbox with:
          </p>
          <ul className="text-left max-w-md mx-auto space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span>Google Drive link to access your Apply Solo Germany book</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span>Complete guide for your Germany university application</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">✓</span>
              <span>Step-by-step system to secure your admission</span>
            </li>
          </ul>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            ⚠️ <strong>Important:</strong> Please check your spam/junk folder if you don't see the email within a few minutes.
          </p>
        </div>
        <p className="text-sm text-muted-foreground mt-6">
          Need help? Contact our support team at support@applysologermany.com
        </p>
      </div>
    </div>
  )
} 