import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 10000,
  socketTimeout: 10000,
  greetingTimeout: 10000,
  sendTimeout: 10000,
} as SMTPTransport.Options)

export async function sendWelcomeEmail(to: string, userId: string, password: string) {
  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Your Admivo Resume Kit Credentials</title>
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
          .credentials {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
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
            <p>Your account has been created successfully!</p>
          </div>
          <div class="content">
            <h2>Your Login Credentials</h2>
            <p>Please use these credentials to access your account:</p>
            
            <div class="credentials">
              <p><strong>User ID:</strong> ${userId}</p>
              <p><strong>Password:</strong> ${password}</p>
            </div>

            <p>For security reasons, we recommend changing your password after your first login.</p>

            <a href="https://admivo-resume.vercel.app/login" class="button">
              Login to Your Account
            </a>

            <p>If you have any questions or need assistance, our support team is here to help!</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Admivo Resume Kit. All rights reserved.</p>
            <p>This email was sent to ${to}</p>
          </div>
        </div>
      </body>
    </html>
  `

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Admivo Resume Kit" <koitobanda@gmail.com>',
      to,
      subject: 'Your Admivo Resume Kit Credentials',
      html: emailHtml,
    })
    console.log('Welcome email sent successfully:', to)
    return true
  } catch (error) {
    console.error('Failed to send welcome email:', error)
    throw new Error('Failed to send welcome email')
  }
}

export async function sendPasswordResetEmail(to: string, resetToken: string) {
  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Reset Your Password - Admivo Resume Kit</title>
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
            <h1>Reset Your Password</h1>
            <p>We received a request to reset your password</p>
          </div>
          <div class="content">
            <p>Click the button below to reset your password. This link will expire in 1 hour.</p>

            <a href="https://admivo-resume.vercel.app/reset-password?token=${resetToken}" class="button">
              Reset Password
            </a>

            <p>If you didn't request this password reset, you can safely ignore this email.</p>
            <p>For security reasons, this link will expire in 1 hour.</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Admivo Resume Kit. All rights reserved.</p>
            <p>This email was sent to ${to}</p>
          </div>
        </div>
      </body>
    </html>
  `

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Admivo Resume Kit" <koitobanda@gmail.com>',
      to,
      subject: 'Reset Your Password - Admivo Resume Kit',
      html: emailHtml,
    })
    console.log('Password reset email sent successfully:', info.messageId)
    return true
  } catch (error) {
    console.error('Failed to send password reset email:', error)
    throw new Error('Failed to send password reset email')
  }
}

export async function sendOtpEmail(to: string, otp: string) {
  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Reset Your Password - Admivo Resume Kit</title>
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
          .otp {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            letter-spacing: 5px;
            margin: 20px 0;
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
            <h1>Reset Your Password</h1>
            <p>We received a request to reset your password</p>
          </div>
          <div class="content">
            <p>Your OTP for password reset is:</p>
            
            <div class="otp">
              ${otp}
            </div>

            <p>This OTP will expire in 10 minutes.</p>
            <p>If you didn't request this password reset, you can safely ignore this email.</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Admivo Resume Kit. All rights reserved.</p>
            <p>This email was sent to ${to}</p>
          </div>
        </div>
      </body>
    </html>
  `

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Admivo Resume Kit" <koitobanda@gmail.com>',
      to,
      subject: 'Reset Your Password - Admivo Resume Kit',
      html: emailHtml,
    })
    console.log('OTP email sent successfully:', info.messageId)
    return true
  } catch (error) {
    console.error('Failed to send OTP email:', error)
    throw new Error('Failed to send OTP email')
  }
} 