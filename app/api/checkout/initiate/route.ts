import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { User } from '@/lib/models/User'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const { name, email, phone } = await req.json()
    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Check if user already exists
    let user = await User.findOne({ email })
    if (user) {
      return NextResponse.json({ success: true, userId: user._id })
    }

    // Create new user with only essential details
    user = await User.create({
      name,
      email,
      phone,
      userId: email, // Use email as userId
      status: 'pending',
      password: 'abc123',
    })

    return NextResponse.json({ success: true, userId: user._id })
  } catch (err) {
    console.error('Initiate checkout error:', err)
    return NextResponse.json({ error: 'Server error', details: String(err) }, { status: 500 })
  }
} 