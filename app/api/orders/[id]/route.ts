import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  // Placeholder: fetch order by params.id
  return NextResponse.json({ orderId: params.id, status: 'success' })
} 