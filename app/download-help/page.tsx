"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Download, FileText, CheckCircle, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DownloadHelpPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 text-foreground">
      <div className="container mx-auto px-4 py-12">
        <Button
          variant="outline"
          className="mb-8"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-primary/20 text-primary px-4 py-2 text-sm font-semibold mb-6 border border-primary/30">
              📥 DOWNLOAD HELP
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How to Access Your ApplySolo Germany System
            </h1>
            <p className="text-xl text-gray-300">
              Follow these simple steps to download and access your purchase
            </p>
          </div>

          <Card className="mb-8 bg-[#f5f5f5]/20 backdrop-blur-sm border-[#f5f5f5]/30">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-3">
                <Mail className="h-6 w-6 text-primary" />
                Step 1: Check Your Email
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-lg">
                After completing your payment, you will receive a confirmation email from us within 5-10 minutes.
              </p>
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <p className="text-white font-semibold mb-2">📧 Check these folders:</p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Primary Inbox
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Promotions/Updates folder
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Spam/Junk folder (if not found in inbox)
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8 bg-[#f5f5f5]/20 backdrop-blur-sm border-[#f5f5f5]/30">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary" />
                Step 2: Find the Google Drive Link
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-lg">
                Your confirmation email will contain a <span className="text-primary font-semibold">Google Drive link</span> to access your ApplySolo Germany system.
              </p>
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <p className="text-white font-semibold mb-2">✅ What you'll find in the drive:</p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Complete ApplySolo Germany PDF/eBook
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Phase-by-phase admission guides
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Document templates and samples
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Additional resources and checklists
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8 bg-[#f5f5f5]/20 backdrop-blur-sm border-[#f5f5f5]/30">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-3">
                <Download className="h-6 w-6 text-primary" />
                Step 3: Access & Download
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-lg">
                Click on the Google Drive link in your email to access all your materials.
              </p>
              <div className="space-y-3">
                <div className="bg-[#f5f5f5]/10 rounded-lg p-4 border border-[#f5f5f5]/20">
                  <p className="text-white font-semibold mb-2">💡 Pro Tips:</p>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• You can view the materials online or download them to your device</li>
                    <li>• Save the link for future access anytime</li>
                    <li>• Download the PDF to access it offline</li>
                    <li>• Use a desktop/laptop for better viewing experience</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 border-primary/30">
            <CardHeader>
              <CardTitle className="text-2xl text-white">❓ Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-lg">
                If you haven't received your email within 10 minutes, or if you're facing any issues accessing the materials:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-[#f5f5f5]/10 p-4 rounded-lg border border-[#f5f5f5]/20">
                  <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-semibold mb-1">Email Support:</p>
                    <p className="text-gray-300">support@applysologermany.com</p>
                    <p className="text-sm text-gray-400 mt-2">We typically respond within 24 hours</p>
                  </div>
                </div>
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <p className="text-primary/90 text-sm">
                    ⚠️ Please include your payment transaction ID or receipt in your support email for faster assistance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={() => router.push("/checkout")}
              className="bg-primary text-white hover:bg-primary/90 font-bold px-8 py-4 text-lg"
            >
              Ready to Get Started? Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
