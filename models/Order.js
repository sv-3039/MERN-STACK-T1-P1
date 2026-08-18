import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    paymentMethod: { type: String, default: 'card' },
    items: [
      {
        id: String,
        name: String,
        price: Number,
        quantity: Number,
        image: String,
        storeId: String
      }
    ],
    subtotal: { type: Number, required: true },
    shippingFee: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Delivered', 'Cancelled'], default: 'Pending' }
  },
  { timestamps: true }
);

const Order = mongoose.models?.Order || mongoose.model('Order', orderSchema);
export default Order;
