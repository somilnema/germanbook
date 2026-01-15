import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  // Placeholder: create user logic
  return NextResponse.json({ userId: 'user_123', status: 'signed_up' })
} 