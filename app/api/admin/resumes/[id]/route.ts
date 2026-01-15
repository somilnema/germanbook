import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { requireAdmin } from '@/lib/auth'
import { getResumeById, updateResume, deleteResume } from '@/lib/models/Resume'

// Get single resume
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    // Verify admin authentication
    const isAdmin = await requireAdmin(req)
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const resume = await getResumeById(params.id)
    
    if (!resume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(resume)
  } catch (error) {
    console.error('Error fetching resume:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resume' },
      { status: 500 }
    )
  }
}

// Update resume
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    // Verify admin authentication
    const isAdmin = await requireAdmin(req)
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await req.json()
    
    await connectDB()
    const resume = await updateResume(params.id, data)
    
    if (!resume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(resume)
  } catch (error) {
    console.error('Error updating resume:', error)
    return NextResponse.json(
      { error: 'Failed to update resume' },
      { status: 500 }
    )
  }
}

// Delete resume
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    // Verify admin authentication
    const isAdmin = await requireAdmin(req)
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const resume = await deleteResume(params.id)
    
    if (!resume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting resume:', error)
    return NextResponse.json(
      { error: 'Failed to delete resume' },
      { status: 500 }
    )
  }
} 