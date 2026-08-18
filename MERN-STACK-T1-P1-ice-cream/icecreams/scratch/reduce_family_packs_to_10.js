import fs from 'fs';
import path from 'path';

const productsPath = path.resolve('src/data/products.js');
let content = fs.readFileSync(productsPath, 'utf8');

const top10FamilyPackIds = new Set(['fp1', 'fp2', 'fp3', 'fp4', 'fp5', 'fp6', 'amul-2', 'amul-3', 'amul-4', 'amul-5']);

// Update products.js so only top10FamilyPackIds have category: 'family-packs'
// For any other item with category: 'family-packs', change it to category: 'tubs'

const regex = /id:\s*'([^']+)'[\s\S]*?category:\s*'family-packs'/g;

let updatedContent = content.replace(regex, (match, id) => {
  if (!top10FamilyPackIds.has(id)) {
    return match.replace("category: 'family-packs'", "category: 'tubs'");
  }
  return match;
});

fs.writeFileSync(productsPath, updatedContent, 'utf8');
console.log('Successfully updated src/data/products.js to keep ONLY 10 Family Pack products!');
