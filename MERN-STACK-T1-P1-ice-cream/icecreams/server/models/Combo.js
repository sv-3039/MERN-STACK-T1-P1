import mongoose from 'mongoose';

const comboSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String },
    name: { type: String },
    tag: { type: String, default: 'COMBO SAVER' },
    badge: { type: String, default: 'Best Value' },
    items: [{ type: String }],
    price: { type: Number, required: true },
    mrp: { type: Number, required: true },
    savePrice: { type: Number },
    savings: { type: String },
    image: { type: String },
    rating: { type: String, default: '4.9' },
    reviewsCount: { type: Number, default: 210 },
    inStock: { type: Boolean, default: true },
    description: { type: String },
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

export const Combo = mongoose.models.Combo || mongoose.model('Combo', comboSchema);
