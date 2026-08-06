import fs from 'fs';
import path from 'path';

const productsPath = path.resolve('src/data/products.js');
let content = fs.readFileSync(productsPath, 'utf8');

// Also update server/server.js seed route to deduplicate before insertMany
