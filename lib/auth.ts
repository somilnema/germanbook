import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'
const ADMIN_TOKEN_NAME = 'adminToken'

export interface AdminJwtPayload {
  email: string
  role: 'admin'
  iat?: number
  exp?: number
}

export function generateAdminToken(payload: Omit<AdminJwtPayload, 'iat' | 'exp'>) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyAdminToken(token: string): AdminJwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminJwtPayload
  } catch {
    return null
  }
}

export function getAdminTokenFromRequest(req: Request): string | null {
  // Try Authorization header first
  const authHeader = req.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }
  
  // Then try adminToken header
  const adminToken = req.headers.get('adminToken')
  if (adminToken) {
    return adminToken
  }

  // Finally try cookie
  const cookieHeader = req.headers.get('cookie')
  if (cookieHeader) {
    const match = cookieHeader.match(new RegExp(`${ADMIN_TOKEN_NAME}=([^;]+)`))
    return match ? match[1] : null
  }

  return null
}

export function createResponseWithAuthCookie(data: any, token: string): NextResponse {
  // Create the response
  const response = NextResponse.json(data)
  
  // Set the cookie in the response
  response.cookies.set(ADMIN_TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })

  return response
}

export function createResponseWithClearedAuthCookie(): NextResponse {
  // Create the response
  const response = NextResponse.json({ success: true })
  
  // Clear the cookie
  response.cookies.delete(ADMIN_TOKEN_NAME)

  return response
}

export async function requireAdmin(req: Request): Promise<boolean> {
  const token = getAdminTokenFromRequest(req)
  if (!token) return false
  
  const payload = verifyAdminToken(token)
  return payload?.role === 'admin'
} 