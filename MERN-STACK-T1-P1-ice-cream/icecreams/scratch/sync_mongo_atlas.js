import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { products } from '../src/data/products.js';
import { Product } from '../server/models/Product.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.log('MONGODB_URI not found in .env');
  process.exit(1);
}

async function syncAtlas() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB Atlas for sync...');

    function repairProductList(productList) {
      const seenKeys = new Set();
      const repaired = [];

      for (const p of productList) {
        if (!p || !p.name) continue;

        const nameLower = p.name.toLowerCase().trim();
        const isAmul = nameLower.startsWith('amul');

        let cat = (p.category || 'cups').toLowerCase().trim();

        const dedupeKey = isAmul ? `amul-${nameLower}` : String(p.id);
        if (seenKeys.has(dedupeKey)) {
          continue;
        }
        seenKeys.add(dedupeKey);

        repaired.push({
          ...p,
          category: cat,
          brandId: isAmul ? 'amul' : (p.brandId || (p.brand ? p.brand.toLowerCase().replace(/\s+/g, '-') : 'scoop-co')).toLowerCase().trim(),
        });
      }
      return repaired;
    }

    const cleanList = repairProductList(products);

    await Product.deleteMany({});
    await Product.insertMany(cleanList);

    console.log(`Successfully synced ${cleanList.length} products to MongoDB Atlas Cloud!`);
    const bestCount = await Product.countDocuments({ isBestseller: true });
    console.log(`Popular section (Bestsellers) count in Atlas: ${bestCount}`);

    process.exit(0);
  } catch (err) {
    console.error('Atlas sync error:', err.message);
    process.exit(1);
  }
}

syncAtlas();
