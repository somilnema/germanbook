import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userId: { type: String, unique: true },
  password: { type: String, required: false },
  role: { type: String, default: 'user' },
  resetToken: String,
  resetTokenExpiry: Date,
});

// Update the updatedAt timestamp before saving
userSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export const User = mongoose.models.User || mongoose.model('User', userSchema);

export async function getUsers() {
  // Return all users as plain objects
  return await User.find({}).lean()
} 