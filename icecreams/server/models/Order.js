import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String },
    orderNo: { type: String },
    tokenNo: { type: String },
    customer: {
      name: { type: String },
      phone: { type: String },
      pickupTime: { type: String },
    },
    items: [
      {
        id: { type: String },
        name: { type: String },
        price: { type: Number },
        quantity: { type: Number },
        qty: { type: Number },
        image: { type: String },
      },
    ],
    totalAmount: { type: Number },
    total: { type: Number },
    subtotal: { type: Number },
    tax: { type: Number },
    payment: { type: String, default: 'upi' },
    paymentMethod: { type: String, default: 'Counter Pickup' },
    status: { type: String, default: 'Confirmed' },
    whatsappSent: { type: Boolean, default: true },
    whatsappStatus: { type: String, default: 'AUTOMATED_SENT' },
  },
  { timestamps: true, strict: false }
);

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
