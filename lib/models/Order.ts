import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  orderId: String,
  amount: Number,
  currency: String,
  status: { type: String, default: 'created' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export async function getOrders() {
  return await Order.find({}).lean()
} 