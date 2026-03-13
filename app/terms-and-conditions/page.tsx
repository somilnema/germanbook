"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Card } from "@/components/ui/card"

export default function TermsAndConditionsPage() {
  return (
    <>
      <Header scrollToSection={() => {}} />
      <div className="min-h-screen bg-gradient-to-b from-secondary via-secondary/90 to-white dark:to-secondary px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Terms & Conditions</h1>
            <p className="text-muted-foreground text-white">Last updated: January 22, 2026</p>
          </div>

          <Card className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using Apply Solo Germany website and purchasing our products, you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our website or purchase our products.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Product Description</h2>
              <p className="text-muted-foreground">
                Apply Solo Germany provides a digital eBook and online resources designed to help Indian students apply to German public universities independently. The product is delivered via email within 24 hours of successful payment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Payment & Purchase</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  <span className="font-semibold">Payment Processing:</span> All payments are processed securely through Razorpay. By making a purchase, you authorize us to charge your payment method.
                </p>
                <p>
                  <span className="font-semibold">Pricing:</span> All prices are in INR (Indian Rupees) and are final. We reserve the right to change prices at any time.
                </p>
                <p>
                  <span className="font-semibold">Tax:</span> Prices displayed already include applicable taxes.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. No Refunds After Delivery</h2>
              <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-red-900 dark:text-red-100 font-semibold">
                  There is no cancellation or refund once you receive the Apply Solo Germany book on your email. All purchases are final.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Intellectual Property Rights</h2>
              <p className="text-muted-foreground">
                All content, materials, and products provided by Apply Solo Germany are protected by copyright and intellectual property laws. You may not reproduce, distribute, or resell the product without explicit permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. User Responsibilities</h2>
              <p className="text-muted-foreground mb-3">You agree to:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Provide accurate and current information during checkout</li>
                <li>• Use the product solely for personal, non-commercial purposes</li>
                <li>• Not share, distribute, or sell the product to others</li>
                <li>• Respect all intellectual property rights</li>
                <li>• Use the product in compliance with applicable laws</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground">
                The Apply Solo Germany system is provided "as is" without any warranties. We do not guarantee admission to German universities. Success depends on your application quality and university decisions. We are not responsible for admission rejections or application outcomes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                Apply Solo Germany shall not be liable for any indirect, incidental, or consequential damages arising from your use of our products or website. Our liability is limited to the amount paid for the product.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Email Delivery</h2>
              <p className="text-muted-foreground mb-3">
                Please note:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Delivery happens within 24 hours of payment</li>
                <li>• Check spam/junk folder if you don't receive the email</li>
                <li>• We are not responsible for missed emails due to incorrect email addresses</li>
                <li>• Contact us immediately if you don't receive your product</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Website Usage</h2>
              <p className="text-muted-foreground">
                You agree not to use our website for illegal purposes, to upload viruses, or to engage in any harmful behavior. We reserve the right to suspend or terminate access to our website at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We may update these Terms & Conditions at any time. Your continued use of our website and products constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                For questions about these Terms & Conditions:
              </p>
              <div className="space-y-2 bg-gray-50 dark:bg-gray-950 p-4 rounded-lg">
                <a href="mailto:applysolo30@gmail.com" className="text-primary hover:underline font-semibold">
                  📧 Contact Us - applysolo30@gmail.com
                </a>
              </div>
            </section>
          </Card>
        </div>
      </div>
      <Footer scrollToSection={() => {}} />
    </>
  )
}
