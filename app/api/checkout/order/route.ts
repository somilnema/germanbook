import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { connectDB } from '@/lib/mongodb'
import { Order } from '@/lib/models/Order'
import { User } from '@/lib/models/User'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const { userId } = await req.json()
    if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 })

    // Get user details
    const user = await User.findById(userId)
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    const amount = 49900 // ₹499 in paise
    const currency = 'INR'
    const razorpayOrder = await razorpay.orders.create({
      amount,
      currency,
      receipt: userId,
      payment_capture: 1,
    })

    const order = await Order.create({
      userId,
      orderId: razorpayOrder.id,
      amount,
      currency,
      status: 'created',
      name: user.name,
      email: user.email,
      phone: user.phone
    })

    return NextResponse.json({ success: true, order: razorpayOrder })
  } catch (err) {
    console.error('Order creation error:', err)
    return NextResponse.json({ error: 'Server error', details: String(err) }, { status: 500 })
  }
} 