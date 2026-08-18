import fs from 'fs';
import path from 'path';
import { products, combos } from '../src/data/products.js';

const dbPath = path.resolve('server/data/db.json');

function sanitizeProduct(p) {
  const initMatch = products.find((i) => String(i.id) === String(p.id));
  return {
    ...p,
    category: initMatch ? initMatch.category.toLowerCase().trim() : (p.category || 'cups').toLowerCase().trim(),
    brandId: (p.brandId || (p.brand ? p.brand.toLowerCase().replace(/\s+/g, '-') : 'scoop-co')).toLowerCase().trim(),
  };
}

const cleanedProducts = products.map(sanitizeProduct);

const dbData = {
  products: cleanedProducts,
  combos: combos,
  orders: []
};

fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'utf8');
console.log('Successfully re-synced server/data/db.json with canonical product categories!');
