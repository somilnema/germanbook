import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { User } from '@/lib/models/User'

export async function GET(req: NextRequest) {
  try {
    // Check admin authentication
    const adminToken = req.headers.get('adminToken')
    if (!adminToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    // Fetch all users with essential fields
    const users = await User.find({}, {
      _id: 1,
      email: 1,
      name: 1,
      createdAt: 1,
      isPaid: 1,
    }).sort({ createdAt: -1 })

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
} 