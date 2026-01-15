import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { connectDB } from '@/lib/mongodb'
import { User } from '@/lib/models/User'
import { Order } from '@/lib/models/Order'
import crypto from 'crypto'
import { sendWelcomeEmail } from '@/lib/email'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

function generatePassword() {
  return Math.random().toString(36).slice(-8)
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const { userId, orderId, paymentId, signature } = await req.json()
    if (!userId || !orderId || !paymentId || !signature) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // 1. Verify signature
    const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(orderId + '|' + paymentId)
      .digest('hex')
    if (generatedSignature !== signature) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 })
    }

    // 2. Update order and get user details
    const order = await Order.findOneAndUpdate({ orderId }, { status: 'paid' })
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // 3. Find user and update with password
    let user = await User.findOne({ email: order.email })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Generate password and update user
    const password = generatePassword()
    user.password = password
    user.status = 'paid'
    await user.save()

    // Send welcome email with credentials
    await sendWelcomeEmail(user.email, user.userId!, password)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Payment verification error:', err)
    return NextResponse.json({ error: 'Server error', details: String(err) }, { status: 500 })
  }
} 