import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 10 },
    image: { type: String },
    description: { type: String }
  },
  { timestamps: true }
);

const Product = mongoose.models?.Product || mongoose.model('Product', productSchema);
export default Product;
