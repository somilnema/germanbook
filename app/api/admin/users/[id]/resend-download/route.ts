import { NextResponse } from 'next/server'
import { User } from '@/lib/models/User'
import { sendDownloadEmail } from '@/lib/email'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await User.findById(params.id)
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    if (!user.isPaid) {
      return NextResponse.json({ error: 'User has not purchased' }, { status: 400 })
    }
    await sendDownloadEmail(user.email, user.name)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send download link' }, { status: 500 })
  }
} 