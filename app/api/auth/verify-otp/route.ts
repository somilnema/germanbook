import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { User } from '@/lib/models/User'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const { email, otp } = await req.json()

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 })
    }

    const user = await User.findOne({
      email,
      resetToken: otp,
      resetTokenExpiry: { $gt: Date.now() }
    })

    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour

    // Update user with reset token
    user.resetToken = resetToken
    user.resetTokenExpiry = resetTokenExpiry
    await user.save()

    return NextResponse.json({ success: true, token: resetToken })
  } catch (err) {
    console.error('Verify OTP error:', err)
    return NextResponse.json({ error: 'Server error', details: String(err) }, { status: 500 })
  }
} 