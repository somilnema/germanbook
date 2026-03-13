"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Card } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header scrollToSection={() => {}} />
      <div className="min-h-screen bg-gradient-to-b from-secondary via-secondary/90 to-white dark:to-secondary px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground text-white">Last updated: January 22, 2026</p>
          </div>

          <Card className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground">
                Apply Solo Germany ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and purchase our products.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Personal Information</h3>
                  <p className="text-muted-foreground">
                    When you make a purchase, we collect:
                  </p>
                  <ul className="space-y-1 text-muted-foreground mt-2 ml-4">
                    <li>• Full Name</li>
                    <li>• Email Address</li>
                    <li>• Phone Number</li>
                    <li>• Payment Information (processed securely by Razorpay)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Automatically Collected Information</h3>
                  <p className="text-muted-foreground">
                    When you visit our website, we automatically collect:
                  </p>
                  <ul className="space-y-1 text-muted-foreground mt-2 ml-4">
                    <li>• IP Address</li>
                    <li>• Browser Type and Version</li>
                    <li>• Device Type</li>
                    <li>• Pages Visited and Time Spent</li>
                    <li>• Referring Website</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-2">
                  <span className="font-semibold min-w-fit">•</span>
                  <span>To process and deliver your purchase</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold min-w-fit">•</span>
                  <span>To send you confirmation emails and delivery details</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold min-w-fit">•</span>
                  <span>To provide customer support</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold min-w-fit">•</span>
                  <span>To improve our website and services</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold min-w-fit">•</span>
                  <span>To send promotional emails (with your consent)</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold min-w-fit">•</span>
                  <span>To comply with legal obligations</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement industry-standard security measures to protect your personal information:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• SSL encryption for data transmission</li>
                <li>• Secure payment processing through Razorpay</li>
                <li>• Regular security audits</li>
                <li>• Limited access to personal information</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                However, no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Third-Party Services</h2>
              <p className="text-muted-foreground mb-4">
                We use third-party services to assist with our operations:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Razorpay</h3>
                  <p className="text-muted-foreground">
                    Payment processing. Your payment information is handled securely by Razorpay. Please review their privacy policy at razorpay.com.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Email Services</h3>
                  <p className="text-muted-foreground">
                    We use email services to deliver your product and send communications. Your email information is treated confidentially.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">MongoDB</h3>
                  <p className="text-muted-foreground">
                    Database hosting for storing user information securely.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Cookies</h2>
              <p className="text-muted-foreground">
                Our website uses cookies to enhance your experience. These cookies help us remember your preferences and improve functionality. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Data Retention</h2>
              <p className="text-muted-foreground">
                We retain your personal information for as long as necessary to:
              </p>
              <ul className="space-y-1 text-muted-foreground mt-2 ml-4">
                <li>• Provide our services</li>
                <li>• Fulfill legal obligations</li>
                <li>• Resolve disputes</li>
                <li>• Enforce agreements</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                You can request deletion of your data at any time by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Right to access your personal data</li>
                <li>• Right to correct inaccurate data</li>
                <li>• Right to request deletion of your data</li>
                <li>• Right to opt-out of marketing communications</li>
                <li>• Right to data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Marketing Communications</h2>
              <p className="text-muted-foreground mb-4">
                We may send you promotional emails about our products, updates, and special offers. You can unsubscribe from these emails at any time by:
              </p>
              <ul className="space-y-1 text-muted-foreground ml-4">
                <li>• Clicking the "Unsubscribe" link in our emails</li>
                <li>• Contacting us directly</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our website is not intended for users under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will take steps to delete such information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Policy Updates</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the "Last updated" date at the top of this page. Your continued use of our website constitutes your acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground bg-gray-50 dark:bg-gray-950 p-4 rounded-lg">
               
                <p>📧 applysolo30@gmail.com</p>
            
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">13. Legal Compliance</h2>
              <p className="text-muted-foreground">
                This Privacy Policy is governed by applicable laws. By using our website, you agree to comply with this Privacy Policy and all applicable laws and regulations.
              </p>
            </section>
          </Card>
        </div>
      </div>
      <Footer scrollToSection={() => {}} />
    </>
  )
}
