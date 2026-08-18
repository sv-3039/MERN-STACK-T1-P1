import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    quantity: { type: Number, required: true, min: 1 }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    paymentMethod: { type: String, required: true, enum: ['phonepe', 'cod'] },
    items: { type: [orderItemSchema], required: true },
    total: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
