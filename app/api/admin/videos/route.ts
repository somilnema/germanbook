import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import mongoose from 'mongoose'

// Define the Video model inline
const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Video title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Video description is required'],
    trim: true
  },
  url: {
    type: String,
    required: [true, 'Video URL is required']
  },
  thumbnail: {
    type: String,
    required: [true, 'Video thumbnail is required']
  },
  duration: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    enum: ['Tutorial', 'Demo', 'Interview', 'Other'],
    default: 'Tutorial'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
})

const Video = mongoose.models.Video || mongoose.model('Video', videoSchema)

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const videos = await Video.find().sort({ createdAt: -1 })
    return NextResponse.json(videos)
  } catch (error) {
    console.error('Error fetching videos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, description, url, thumbnail, duration, category } = body

    if (!title || !description || !url || !thumbnail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    await connectDB()
    const video = await Video.create({
      title,
      description,
      url,
      thumbnail,
      duration,
      category
    })

    return NextResponse.json(video)
  } catch (error) {
    console.error('Error creating video:', error)
    return NextResponse.json(
      { error: 'Failed to create video' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, title, description, url, thumbnail, duration, category, isActive } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Video ID is required' },
        { status: 400 }
      )
    }

    await connectDB()
    const video = await Video.findByIdAndUpdate(
      id,
      {
        title,
        description,
        url,
        thumbnail,
        duration,
        category,
        isActive
      },
      { new: true }
    )

    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(video)
  } catch (error) {
    console.error('Error updating video:', error)
    return NextResponse.json(
      { error: 'Failed to update video' },
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
        { error: 'Video ID is required' },
        { status: 400 }
      )
    }

    await connectDB()
    const video = await Video.findByIdAndDelete(id)

    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Video deleted successfully' })
  } catch (error) {
    console.error('Error deleting video:', error)
    return NextResponse.json(
      { error: 'Failed to delete video' },
      { status: 500 }
    )
  }
} 