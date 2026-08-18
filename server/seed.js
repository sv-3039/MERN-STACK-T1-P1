import mongoose from 'mongoose';
import { ALL_STORE_PRODUCTS } from './data/productsSeed.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mall_express';

// Define Product Schema
const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 10 },
  image: { type: String },
  description: { type: String }
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export async function runSeed() {
  console.log('🌱 Executing database seed script for 10 store categories...');
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(MONGODB_URI);
      console.log('✅ MongoDB connected successfully for seeding.');

      await Product.deleteMany({});
      const result = await Product.insertMany(ALL_STORE_PRODUCTS);
      console.log(`✅ Seeded ${result.length} products into MongoDB!`);
      await mongoose.disconnect();
    } else {
      console.log('ℹ️ No MONGODB_URI set. Seed script initialized in-memory product cache.');
    }
  } catch (err) {
    console.warn('⚠️ Seeding warning (falling back to memory mode):', err.message);
  }
}

if (process.argv[1]?.endsWith('seed.js')) {
  runSeed().then(() => process.exit(0));
}
