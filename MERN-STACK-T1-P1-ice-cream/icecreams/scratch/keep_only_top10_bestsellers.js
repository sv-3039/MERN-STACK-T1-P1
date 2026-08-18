import fs from 'fs';
import path from 'path';

const productsPath = path.resolve('src/data/products.js');
let content = fs.readFileSync(productsPath, 'utf8');

const top10Ids = new Set(['fp1', 'fp2', 'sd1', 'sd3', 'gl1', 'gl3', 'kl1', 'ms1', 'amul-1', 'amul-2']);

// We will parse products array line by line or object by object to set isBestseller: true only for top10Ids
// Let's modify products.js by replacing `isBestseller: true` with `isBestseller: false` for items not in top10Ids

// First, read all items in products.js using regular expression for id & isBestseller
const regex = /id:\s*'([^']+)'[\s\S]*?isBestseller:\s*(true|false)/g;

let updatedContent = content.replace(regex, (match, id, isBestseller) => {
  const shouldBeBestseller = top10Ids.has(id);
  return match.replace(`isBestseller: ${isBestseller}`, `isBestseller: ${shouldBeBestseller}`);
});

fs.writeFileSync(productsPath, updatedContent, 'utf8');
console.log('Successfully updated src/data/products.js to keep ONLY top 10 bestsellers!');
