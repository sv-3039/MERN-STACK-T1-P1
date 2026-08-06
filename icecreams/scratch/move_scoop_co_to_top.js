import fs from 'fs';
import path from 'path';

const productsPath = path.resolve('src/data/products.js');
let content = fs.readFileSync(productsPath, 'utf8');

// Extract the POPULAR & SECTION EXCLUSIVES block and place it at top of products array
const markerStart = content.indexOf('// --- POPULAR & SECTION EXCLUSIVES ---');
const markerEnd = content.indexOf('export const familyPacks = [');

if (markerStart !== -1 && markerEnd !== -1) {
  const exclusivesBlock = content.slice(markerStart, markerEnd).trim();
  content = content.slice(0, markerStart) + content.slice(markerEnd);

  // Insert exclusivesBlock right after `export const products = [`
  const productsArrayPos = content.indexOf('export const products = [');
  if (productsArrayPos !== -1) {
    const insertIdx = productsArrayPos + 'export const products = ['.length;
    content = content.slice(0, insertIdx) + '\n' + exclusivesBlock + ',\n' + content.slice(insertIdx);
    fs.writeFileSync(productsPath, content, 'utf8');
    console.log('Successfully moved Scoop & Co. exclusives to top of products array!');
  }
}
