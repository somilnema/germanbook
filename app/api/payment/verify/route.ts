import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  // Placeholder: verify payment logic
  return NextResponse.json({ verified: true })
} 