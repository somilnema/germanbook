"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Card } from "@/components/ui/card"

export default function ShippingPolicyPage() {
  return (
    <>
      <Header scrollToSection={() => {}} />
      <div className="min-h-screen bg-gradient-to-b from-secondary via-secondary/90 to-white dark:to-secondary px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Shipping & Delivery Policy</h1>
            <p className="text-muted-foreground text-white">Last updated: January 22, 2026</p>
          </div>

          <Card className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Digital Delivery</h2>
              <p className="text-muted-foreground mb-4">
                The Apply Solo Germany system is a digital product delivered entirely via email. There is no physical shipping involved.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Delivery Timeline</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  <span className="font-semibold">Immediate Delivery:</span> Your access details and book will be delivered to your registered email address within 24 hours of successful payment.
                </p>
                <p>
                  <span className="font-semibold">Email Verification:</span> Please check your spam/junk folder if you don't see the email in your inbox within 24 hours.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">What You'll Receive</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-2">
                  <span className="font-semibold min-w-fit">✓</span>
                  <span>Complete Apply Solo Germany eBook (PDF)</span>
                </li>
                
                <li className="flex gap-2">
                  <span className="font-semibold min-w-fit">✓</span>
                  <span>Step-by-step application guides</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold min-w-fit">✓</span>
                  <span>Supporting documents and templates</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Email Address Important</h2>
              <p className="text-muted-foreground bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
                <span className="font-semibold">⚠️ Important:</span> The email address you provide at checkout is critical. Your entire Apply Solo Germany system will be delivered to this address. Please double-check for accuracy during checkout. We are not responsible for delivery failures due to incorrect email addresses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Technical Issues</h2>
              <p className="text-muted-foreground mb-4">
                If you don't receive your delivery email within 24 hours:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Check your spam/junk folder</li>
                <li>• Verify the email address you provided is correct</li>
                <li>• Contact our support team at applysolo30@gmail.com</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                For any delivery-related queries, please reach out to our support team:
              </p>
              <div className="mt-4 space-y-2 text-muted-foreground">
                
                <p>📧 applysolo30@gmail.com</p>
              </div>
            </section>
          </Card>
        </div>
      </div>
      <Footer scrollToSection={() => {}} />
    </>
  )
}
