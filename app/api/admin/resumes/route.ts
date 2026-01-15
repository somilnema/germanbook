import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { requireAdmin } from '@/lib/auth'
import { getResumes, createResume } from '@/lib/models/Resume'

// Get all resumes
export async function GET(req: Request) {
  try {
    // Verify admin authentication
    const isAdmin = await requireAdmin(req)
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const resumes = await getResumes()
    return NextResponse.json(resumes)
  } catch (error) {
    console.error('Error fetching resumes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resumes' },
      { status: 500 }
    )
  }
}

// Create new resume
export async function POST(req: Request) {
  try {
    // Verify admin authentication
    const isAdmin = await requireAdmin(req)
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await req.json()
    
    // Validate required fields
    const requiredFields = ['title', 'position', 'description', 'fileUrl']
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    await connectDB()
    const resume = await createResume(data)
    return NextResponse.json(resume, { status: 201 })
  } catch (error) {
    console.error('Error creating resume:', error)
    return NextResponse.json(
      { error: 'Failed to create resume' },
      { status: 500 }
    )
  }
} 