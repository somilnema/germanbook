import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import mongoose from 'mongoose'

// Define the Template model inline
const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Template name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Template description is required'],
    trim: true
  },
  thumbnail: {
    type: String,
    required: [true, 'Template thumbnail is required']
  },
  content: {
    type: String,
    required: [true, 'Template content is required']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

const Template = mongoose.models.Template || mongoose.model('Template', templateSchema)

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const templates = await Template.find().sort({ createdAt: -1 })
    return NextResponse.json(templates)
  } catch (error) {
    console.error('Error fetching templates:', error)
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, description, thumbnail, content } = body

    if (!name || !description || !thumbnail || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    await connectDB()
    const template = await Template.create({
      name,
      description,
      thumbnail,
      content
    })

    return NextResponse.json(template)
  } catch (error) {
    console.error('Error creating template:', error)
    return NextResponse.json(
      { error: 'Failed to create template' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, name, description, thumbnail, content, isActive } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Template ID is required' },
        { status: 400 }
      )
    }

    await connectDB()
    const template = await Template.findByIdAndUpdate(
      id,
      {
        name,
        description,
        thumbnail,
        content,
        isActive
      },
      { new: true }
    )

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(template)
  } catch (error) {
    console.error('Error updating template:', error)
    return NextResponse.json(
      { error: 'Failed to update template' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Template ID is required' },
        { status: 400 }
      )
    }

    await connectDB()
    const template = await Template.findByIdAndDelete(id)

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Template deleted successfully' })
  } catch (error) {
    console.error('Error deleting template:', error)
    return NextResponse.json(
      { error: 'Failed to delete template' },
      { status: 500 }
    )
  }
} 