import mongoose from 'mongoose'

const resumeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Resume title is required'],
    trim: true
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  fileUrl: {
    type: String,
    required: [true, 'File URL is required']
  },
  thumbnail: {
    type: String,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Update the updatedAt timestamp before saving
resumeSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

// Helper functions
export async function getResumes(filter: any = {}) {
  try {
    const resumes = await Resume.find(filter).sort({ createdAt: -1 })
    return resumes
  } catch (error) {
    console.error('Error fetching resumes:', error)
    throw error
  }
}

export async function getResumeById(id: string) {
  try {
    const resume = await Resume.findById(id)
    return resume
  } catch (error) {
    console.error('Error fetching resume:', error)
    throw error
  }
}

export async function createResume(data: any) {
  try {
    const resume = await Resume.create(data)
    return resume
  } catch (error) {
    console.error('Error creating resume:', error)
    throw error
  }
}

export async function updateResume(id: string, data: any) {
  try {
    const resume = await Resume.findByIdAndUpdate(id, data, { new: true })
    return resume
  } catch (error) {
    console.error('Error updating resume:', error)
    throw error
  }
}

export async function deleteResume(id: string) {
  try {
    const resume = await Resume.findByIdAndDelete(id)
    return resume
  } catch (error) {
    console.error('Error deleting resume:', error)
    throw error
  }
}

// Export the model
const Resume = mongoose.models.Resume || mongoose.model('Resume', resumeSchema)
export default Resume 