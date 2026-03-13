import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

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
    const { name, email, phone, subject, message } = await req.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Send email to admin
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Form Submission</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #00FF84 0%, #0C1A29 100%);
              color: white;
              padding: 30px 20px;
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
            .field {
              margin-bottom: 20px;
              padding-bottom: 20px;
              border-bottom: 1px solid #eee;
            }
            .field-label {
              font-weight: bold;
              color: #00FF84;
              margin-bottom: 8px;
            }
            .field-value {
              color: #333;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="field-label">Name:</div>
                <div class="field-value">${name}</div>
              </div>
              <div class="field">
                <div class="field-label">Email:</div>
                <div class="field-value"><a href="mailto:${email}">${email}</a></div>
              </div>
              ${phone ? `
              <div class="field">
                <div class="field-label">Phone:</div>
                <div class="field-value">${phone}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="field-label">Subject:</div>
                <div class="field-value">${subject}</div>
              </div>
              <div class="field">
                <div class="field-label">Message:</div>
                <div class="field-value" style="white-space: pre-wrap;">${message}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    // Send confirmation email to user
    const userEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>We Received Your Message</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #00FF84 0%, #0C1A29 100%);
              color: white;
              padding: 30px 20px;
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
              <h1>Thank You for Reaching Out!</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>We've received your message and appreciate you contacting us. Our team will review your inquiry and get back to you as soon as possible.</p>
              
              <h3>Your Message Details:</h3>
              <p><strong>Subject:</strong> ${subject}</p>
              
              <p>In the meantime, if you have any urgent questions, feel free to email us directly at <a href="mailto:applysolo30@gmail.com">applysolo30@gmail.com</a></p>
              
              <p>Best regards,<br>The Apply Solo Germany Team</p>
            </div>
            <div class="footer">
              <p>© 2026 Apply Solo Germany. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Send emails
    try {
      await Promise.all([
        transporter.sendMail({
          from: process.env.SMTP_FROM || '"Apply Solo Germany" <applysolo30@gmail.com>',
          to: process.env.SMTP_USER,
          subject: `New Contact Form: ${subject}`,
          html: adminEmailHtml,
        }),
        transporter.sendMail({
          from: process.env.SMTP_FROM || '"Apply Solo Germany" <applysolo30@gmail.com>',
          to: email,
          subject: "We Received Your Message - Apply Solo Germany",
          html: userEmailHtml,
        }),
      ])
      console.log('Contact emails sent successfully to:', email)
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      throw emailError
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      {
        error: "Failed to send message",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
