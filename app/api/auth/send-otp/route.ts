import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { User } from '@/lib/models/User'
import { sendOtpEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const user = await User.findOne({ email })
    if (!user) {
      // Return success even if user not found for security
      return NextResponse.json({ success: true })
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    // Save OTP to user
    user.resetToken = otp
    user.resetTokenExpiry = otpExpiry
    await user.save()

    // Send OTP email
    await sendOtpEmail(user.email, otp)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Send OTP error:', err)
    return NextResponse.json({ error: 'Server error', details: String(err) }, { status: 500 })
  }
} 