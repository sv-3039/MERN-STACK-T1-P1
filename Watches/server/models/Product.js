import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    brand: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true, enum: ['men', 'women'], index: true },
    description: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
