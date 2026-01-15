import { NextResponse } from 'next/server'
import { User } from '@/lib/models/User'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await User.findById(params.id)
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    user.isBlocked = !user.isBlocked
    await user.save()
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
} 