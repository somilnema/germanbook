"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function CheckoutSuccess() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    // Redirect to login after 5 seconds
    const timer = setTimeout(() => {
      router.push("/login")
    }, 5000)

    // Update countdown
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearTimeout(timer)
      clearInterval(countdownInterval)
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-secondary via-secondary/90 to-white dark:to-secondary px-4 py-16">
      <div className="w-full max-w-lg bg-white dark:bg-secondary/80 rounded-3xl shadow-2xl p-10 space-y-6 border border-primary/20 backdrop-blur-lg text-center">
        <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-foreground drop-shadow-lg mb-2">
          Payment Successful!
        </h1>
        <p className="text-lg text-muted-foreground mb-4">
          Thank you for your purchase. Your login credentials have been sent to your email.<br />
          Please check your inbox (and spam folder).
        </p>
        <p className="text-sm text-muted-foreground">
          Redirecting to login in {countdown} seconds...
        </p>
        <Link href="/login">
          <button className="mt-4 bg-primary text-primary-foreground font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-primary/90 transition-all text-lg">
            Go to Login Now
          </button>
        </Link>
      </div>
    </div>
  )
} 