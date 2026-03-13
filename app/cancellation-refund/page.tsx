"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Card } from "@/components/ui/card"

export default function CancellationRefundPage() {
  return (
    <>
      <Header scrollToSection={() => {}} />
      <div className="min-h-screen bg-gradient-to-b from-secondary via-secondary/90 to-white dark:to-secondary px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Cancellation & Refund Policy</h1>
            <p className="text-muted-foreground text-white">Last updated: January 22, 2026</p>
          </div>

          <Card className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-red-600">No Cancellation or Refund After Delivery</h2>
              <div className="bg-red-50 dark:bg-red-950 p-6 rounded-lg border border-red-200 dark:border-red-800">
                <p className="font-semibold text-red-900 dark:text-red-100 mb-2">
                  ⚠️ IMPORTANT NOTICE
                </p>
                <p className="text-red-900 dark:text-red-100">
                  <span className="font-bold">There is no cancellation or refund once you receive the Apply Solo Germany book on your email.</span> All purchases are final upon payment completion.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Cancellation Window</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <span className="font-semibold">Before Delivery:</span> If you cancel your order before receiving the product, please contact us within 24 hours of purchase. Refunds will be processed within 5-7 business days.
                </p>
                <p>
                  <span className="font-semibold">After Delivery:</span> Once you have received the Apply Solo Germany book on your email, <span className="font-bold">no refunds will be issued under any circumstances.</span>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Why No Refunds After Delivery?</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-2">
                  <span className="font-semibold min-w-fit">1.</span>
                  <span>The product is digital and immediately accessible upon delivery</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold min-w-fit">2.</span>
                  <span>Once accessed, we cannot prevent misuse or distribution</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold min-w-fit">3.</span>
                  <span>All sales are final to protect our intellectual property</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Before You Purchase</h2>
              <p className="text-muted-foreground mb-4">
                Please review the following before making your purchase:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Review what's included in the package on our website</li>
                <li>✓ Read through our FAQ section</li>
                <li>✓ Contact our support team if you have questions</li>
                <li>✓ Ensure you understand the product before checkout</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Payment Issues & Failed Transactions</h2>
              <p className="text-muted-foreground mb-4">
                If your payment failed or was charged multiple times:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Contact our support team immediately</li>
                <li>• Provide proof of the failed/duplicate transaction</li>
                <li>• We will investigate and issue refunds for duplicate charges</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Requesting a Refund (Before Delivery)</h2>
              <p className="text-muted-foreground mb-4">
                To request a cancellation/refund before receiving your product:
              </p>
              <div className="bg-gray-50 dark:bg-gray-950 p-4 rounded-lg space-y-2">
                <p className="text-muted-foreground">1. Send an email within 24 hours of purchase</p>
                <p className="text-muted-foreground">2. Include your order details and email address</p>
                <p className="text-muted-foreground">3. Refunds will be processed in 5-7 business days</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                For cancellation requests or refund inquiries:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>📧 support@applysologermany.com</p>
                <p>📧 applysolo30@gmail.com</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Acknowledgment</h2>
              <p className="text-muted-foreground bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                By purchasing the Apply Solo Germany system, you acknowledge and agree to this cancellation and refund policy. You understand that no refunds will be issued once you have received the product on your email.
              </p>
            </section>
          </Card>
        </div>
      </div>
      <Footer scrollToSection={() => {}} />
    </>
  )
}
