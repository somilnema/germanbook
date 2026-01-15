import mongoose from 'mongoose'

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
  category: {
    type: String,
    required: true,
    enum: ['Professional', 'Creative', 'Simple', 'Modern', 'Executive'],
    default: 'Professional',
  },
  sections: [{
    name: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      required: true,
    },
  }],
  styles: {
    primaryColor: {
      type: String,
      default: '#10B981', // Green-500
    },
    secondaryColor: {
      type: String,
      default: '#1F2937', // Gray-800
    },
    fontFamily: {
      type: String,
      default: 'Inter',
    },
    fontSize: {
      type: String,
      default: '14px',
    },
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    default: 0,
  },
  downloads: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  timestamps: true
})

// Add indexes for better query performance
templateSchema.index({ name: 'text', description: 'text' })
templateSchema.index({ category: 1, isActive: 1 })
templateSchema.index({ isPremium: 1, price: 1 })

// Create and export the model
export const Template = mongoose.models.Template || mongoose.model('Template', templateSchema) 