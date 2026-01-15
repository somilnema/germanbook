import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  // Placeholder: parse order data from req
  return NextResponse.json({ orderId: 'order_123', status: 'created' })
} 