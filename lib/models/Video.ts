import mongoose from 'mongoose'

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

// Add indexes for better query performance
videoSchema.index({ title: 'text', description: 'text' })
videoSchema.index({ category: 1, isActive: 1 })
videoSchema.index({ views: -1 })

export const Video = mongoose.models.Video || mongoose.model('Video', videoSchema) 