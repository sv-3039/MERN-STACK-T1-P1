import fs from 'fs';
import path from 'path';
import https from 'https';

const imagesDir = path.resolve('src/assets/images/products');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Curated high quality dessert/ice cream photos for each Amul product
const amulImages = {
  'amul-tricone-choco': 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80',
  'amul-choco-chips': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80',
  'amul-chocolate-brownie': 'https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?auto=format&fit=crop&w=600&q=80',
  'amul-vanilla-magic': 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=600&q=80',
  'amul-butterscotch-bliss': 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=600&q=80',
  'amul-aamras-kulfi': 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80',
  'amul-badshahi-kulfi': 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80',
  'amul-vanilla-royale': 'https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=600&q=80',
  'amul-gold-butterscotch': 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=600&q=80',
  'amul-tricone-butterscotch': 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=80',
  'amul-rajasthani-kewda': 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80',
  'amul-tricone-cookie': 'https://images.unsplash.com/photo-1516750105099-4b8a83e217ee?auto=format&fit=crop&w=600&q=80',
  'amul-black-currant': 'https://images.unsplash.com/photo-1516559828984-fb3b99548b21?auto=format&fit=crop&w=600&q=80',
  'amul-butterscotch-gold-tub': 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=600&q=80',
  'amul-rajbhog': 'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&w=600&q=80',
  'amul-fruit-n-nut': 'https://images.unsplash.com/photo-1488900128323-21503983a07e?auto=format&fit=crop&w=600&q=80',
  'amul-coffee-bar': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
  'amul-king-alphonso': 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80',
  'amul-pista-kulfi': 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80',
  'amul-epic-belgian': 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=600&q=80',
  'amul-sandwich': 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80',
  'amul-shahi-anjeer': 'https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=600&q=80',
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
  console.log('Downloading Amul product image files...');
  for (const [key, url] of Object.entries(amulImages)) {
    const fileDest = path.join(imagesDir, `${key}.jpg`);
    try {
      await download(url, fileDest);
      console.log(`Saved: ${key}.jpg`);
    } catch (err) {
      console.error(`Failed ${key}:`, err.message);
    }
  }
  console.log('Done downloading Amul image files.');
}

run();
