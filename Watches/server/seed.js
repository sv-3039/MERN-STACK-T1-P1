import dotenv from 'dotenv';
import mongoose from 'mongoose';
import products from '../src/data/products.js';
import Product from './models/Product.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/watches';

const seed = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected for seeding...');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert all products
    const inserted = await Product.insertMany(products);
    console.log(`Inserted ${inserted.length} products`);

    mongoose.disconnect();
    console.log('Seeding complete. Disconnected.');
  } catch (err) {
    console.error('Seeding error:', err.message);
    process.exit(1);
  }
};

seed();
