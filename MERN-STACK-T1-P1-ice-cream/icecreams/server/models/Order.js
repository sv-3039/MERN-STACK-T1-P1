import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      pickupTime: { type: String, required: true },
    },
    items: [
      {
        id: { type: String },
        name: { type: String },
        price: { type: Number },
        quantity: { type: Number },
        image: { type: String },
      },
    ],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, default: 'Counter Pickup' },
    status: { type: String, default: 'Pending' },
  },
  { timestamps: true }
);

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
