import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { User } from "@/lib/models/User"

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json()
    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome to Admivo Resume Kit</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #00FF84 0%, #0C1A29 100%);
              color: white;
              padding: 40px 20px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: white;
              padding: 30px 20px;
              border: 1px solid #eee;
              border-top: none;
              border-radius: 0 0 10px 10px;
            }
            .button {
              display: inline-block;
              background: #00FF84;
              color: #0C1A29;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
              margin: 20px 0;
            }
            .feature {
              display: flex;
              align-items: center;
              margin: 15px 0;
            }
            .feature-icon {
              color: #00FF84;
              margin-right: 10px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Admivo Resume Kit! 🎉</h1>
              <p>Thank you for your purchase, ${user.name}!</p>
            </div>
            <div class="content">
              <h2>Your Access Details</h2>
              <p>Your account has been created successfully. Here's what you can do next:</p>
              
              <div class="feature">
                <span class="feature-icon">✓</span>
                <span>Access your resume templates in the dashboard</span>
              </div>
              <div class="feature">
                <span class="feature-icon">✓</span>
                <span>Watch exclusive video lectures</span>
              </div>
              <div class="feature">
                <span class="feature-icon">✓</span>
                <span>Download your purchase receipt</span>
              </div>

              <a href="https://admivo-resume.vercel.app/dashboard" class="button">
                Go to Dashboard
              </a>

              <h3>What's Included in Your Package:</h3>
              <ul>
                <li>3 Professional ATS-Friendly Resume Templates</li>
                <li>2 Exclusive Video Lectures</li>
                <li>Lifetime Access to Updates</li>
                <li>24/7 Customer Support</li>
              </ul>

              <p>If you have any questions or need assistance, our support team is here to help!</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Admivo Resume Kit. All rights reserved.</p>
              <p>This email was sent to ${user.email}</p>
            </div>
          </div>
        </body>
      </html>
    `

    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Admivo Resume Kit" <koitobanda@gmail.com>',
      to: user.email,
      subject: "Welcome to Admivo Resume Kit! 🎉",
      html: emailHtml,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Failed to send email:", err)
    return NextResponse.json(
      { error: "Failed to send email", details: String(err) },
      { status: 500 }
    )
  }
} 