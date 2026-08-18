import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    brand: { type: String, default: 'Scoop & Co.' },
    brandId: { type: String, default: 'scoop-co' },
    flavor: { type: String },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    mrp: { type: Number, required: true },
    rating: { type: String, default: '4.8' },
    reviewsCount: { type: Number, default: 150 },
    stock: { type: Number, default: 20 },
    image: { type: String, required: true },
    isNew: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    description: { type: String },
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
