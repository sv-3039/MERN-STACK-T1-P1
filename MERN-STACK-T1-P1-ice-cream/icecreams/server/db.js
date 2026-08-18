import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFilePath = path.join(__dirname, 'data', 'db.json');

// Ensure directory exists
if (!fs.existsSync(path.dirname(dbFilePath))) {
  fs.mkdirSync(path.dirname(dbFilePath), { recursive: true });
}

// Initial seed helper
function getInitialSeed() {
  try {
    const productsPath = path.resolve(__dirname, '../src/data/products.js');
    if (fs.existsSync(productsPath)) {
      const fileContent = fs.readFileSync(productsPath, 'utf8');
      // Extract array or fallback
    }
  } catch (e) {
    console.error('Error reading products.js seed:', e);
  }
  return [];
}

export function readDB() {
  if (!fs.existsSync(dbFilePath)) {
    const initialData = { products: [], orders: [] };
    fs.writeFileSync(dbFilePath, JSON.stringify(initialData, null, 2), 'utf8');
    return initialData;
  }
  try {
    const raw = fs.readFileSync(dbFilePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read db.json:', err);
    return { products: [], orders: [] };
  }
}

export function writeDB(data) {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write db.json:', err);
  }
}
