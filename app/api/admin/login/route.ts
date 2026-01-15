import { NextResponse } from 'next/server'
import { generateAdminToken } from '@/lib/auth'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@admivo'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = body

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Generate JWT token
      const token = generateAdminToken({ email, role: 'admin' })
      
      // Create response with user data
      const response = NextResponse.json({ 
        token,
        user: { email, role: 'admin' }
      })

      // Set HTTP-only cookie
      response.cookies.set('adminToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })

      return response
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 