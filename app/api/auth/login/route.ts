import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { User } from '@/lib/models/User'
import { generateAdminToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const { email, password } = await req.json()
    const user = await User.findOne({ email, password, status: 'paid' })
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    // Create JWT
    const token = generateAdminToken({
      email: user.email,
      role: 'admin'
    })
    // Set cookie with correct name matching middleware
    const res = NextResponse.json({ success: true, token })
    res.cookies.set('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
    return res
  } catch (err) {
    return NextResponse.json({ error: 'Server error', details: String(err) }, { status: 500 })
  }
} 