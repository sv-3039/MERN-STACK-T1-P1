import fs from 'fs';
import path from 'path';
import https from 'https';

const imagesDir = path.resolve('src/assets/images/products');

// REAL ICE CREAM PHOTOS ONLY (No shoes, no jhumkas, no raw fruits)
const realIceCreamPhotos = {
  'amul-butterscotch-gold-tub': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80', // Delicious Butterscotch Ice Cream Tub
  'amul-rajbhog': 'https://images.unsplash.com/photo-1576506295286-5cda18df43e7?auto=format&fit=crop&w=600&q=80', // Royal Saffron Kesar Rajbhog Ice Cream
  'amul-king-alphonso': 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80', // Mango Ice Cream Scoop
  'amul-aamras-kulfi': 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80', // Mango Kulfi Stick
  'amul-badshahi-kulfi': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80', // Kesar Kulfi Dessert
  'amul-vanilla-magic': 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80', // Vanilla Ice Cream Tub
  'amul-butterscotch-bliss': 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=600&q=80', // Butterscotch Tub
  'amul-fruit-n-nut': 'https://images.unsplash.com/photo-1488900128323-21503983a07e?auto=format&fit=crop&w=600&q=80', // Fruit N Nut Ice Cream
  'amul-shahi-anjeer': 'https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=600&q=80', // Dry Fruit Cup
  'amul-pista-kulfi': 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80', // Pista Malai Kulfi Stick
  'amul-epic-belgian': 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=600&q=80', // Belgian Chocolate Bar
  'amul-tricone-choco': 'https://images.unsplash.com/photo-1549395156-e0c1fe6fc7a5?auto=format&fit=crop&w=600&q=80', // Choco Cone
  'amul-choco-chips': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80', // Choco Chips Tub
  'amul-chocolate-brownie': 'https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?auto=format&fit=crop&w=600&q=80', // Brownie Tub
};

function download(url, dest) {
  return new Promise((res, rej) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return download(response.headers.location, dest).then(res).catch(rej);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(res);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      rej(err);
    });
  });
}

async function run() {
  console.log('Replacing shoe/jhumka/mango files with real ice cream photos...');
  for (const [key, url] of Object.entries(realIceCreamPhotos)) {
    const fileDest = path.join(imagesDir, `${key}.jpg`);
    try {
      await download(url, fileDest);
      console.log(`Replaced: ${key}.jpg`);
    } catch (err) {
      console.error(`Failed ${key}:`, err.message);
    }
  }
  console.log('Finished replacing non-ice-cream images.');
}

run();
