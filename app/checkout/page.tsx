"use client";
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CheckCircle2, CreditCard, Shield, Clock } from "lucide-react"

export default function CheckoutPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Dynamically load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) return resolve(true)
      const script = document.createElement("script")
      script.id = "razorpay-script"
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      document.body.appendChild(script)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      // 1. Save user details
      const res = await fetch("/api/checkout/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || "Failed to save details")
      const userId = data.userId
      // 2. Create Razorpay order
      const orderRes = await fetch("/api/checkout/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })
      const orderData = await orderRes.json()
      if (!orderData.success) throw new Error(orderData.error || "Failed to create order")
      // 3. Load Razorpay script
      await loadRazorpayScript()
      // 4. Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "Apply Solo Germany",
        description: "Resume Kit Purchase",
        order_id: orderData.order.id,
        handler: async function (response: any) {
          // On payment success, verify payment
          setLoading(true)
          const verifyRes = await fetch("/api/checkout/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId,
              orderId: orderData.order.id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            }),
          })
          const verifyData = await verifyRes.json()
          setLoading(false)
          if (verifyData.success) {
            router.push("/checkout/success")
          } else {
            setError(verifyData.error || "Payment verification failed")
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: "#00FF84",
          backdrop_color: "#0C1A29",
          hide_topbar: false,
          hide_border: true,
          background: "#0C1A29",
          text_color: "#FFFFFF",
          font_family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        },
        modal: {
          ondismiss: function () {
            setLoading(false)
          }
        }
      }
      // @ts-ignore
      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-slate-50 px-4 py-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Checkout Form */}
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Complete Your Purchase</h1>
                <p className="text-slate-600 mt-2">Enter your details to proceed with the payment</p>
              </div>

              <Card className="p-6 bg-white border-slate-200 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-900">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                        className="bg-white border-slate-200 text-slate-900 focus:ring-primary h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-900">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                        className="bg-white border-slate-200 text-slate-900 focus:ring-primary h-11"
                      />
                      <p className="text-xs text-slate-500">
                        ⚠️ Important: The book will be sent to this email address. Please double-check for accuracy.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-900">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="Enter your phone number"
                        className="bg-white border-slate-200 text-slate-900 focus:ring-primary h-11"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 text-red-500 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Proceed to Payment"}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Order Summary</h2>
                <p className="text-slate-600 mt-2">Review your purchase details</p>
              </div>

              <Card className="p-6 space-y-6 bg-white border-slate-200 shadow-sm">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Apply Solo Germany</span>
                    <span className="font-semibold text-slate-900">₹499</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900">Total</span>
                      <span className="text-2xl font-bold text-slate-900">₹499</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900">What's Included:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="text-slate-700">Complete Apply Solo Germany Book</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="text-slate-700">Step-by-Step Application Guide</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="text-slate-700">APS Preparation & Document Checklist</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <Shield className="w-5 h-5" />
                    <span>Secure Payment via Razorpay</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <Clock className="w-5 h-5" />
                    <span>Instant Access After Payment</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <CreditCard className="w-5 h-5" />
                    <span>Multiple Payment Options Available</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 