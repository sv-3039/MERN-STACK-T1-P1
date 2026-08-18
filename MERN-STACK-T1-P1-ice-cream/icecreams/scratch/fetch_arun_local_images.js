import fs from 'fs';
import path from 'path';
import https from 'https';

const imagesDir = path.resolve('src/assets/images/products');

const arunLocal = {
  'arun-ibar-belgian': 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=600&q=80',
  'arun-ibar-almond': 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80',
  'arun-icon-choco': 'https://images.unsplash.com/photo-1549395156-e0c1fe6fc7a5?auto=format&fit=crop&w=600&q=80',
  'arun-icon-butterscotch': 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=80',
  'arun-rainbow-cassatta': 'https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?auto=format&fit=crop&w=600&q=80',
  'arun-kulfi-pista': 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80',
  'arun-kulfi-kesar': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80',
  'arun-mango-duet': 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80',
  'arun-itub-butterscotch': 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=600&q=80',
  'arun-itub-chocolate': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80',
  'arun-itub-mango': 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80',
  'arun-ishake-chocolate': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
  'arun-ibar-mini': 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80',
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
  console.log('Downloading Arun local assets...');
  for (const [key, url] of Object.entries(arunLocal)) {
    const fileDest = path.join(imagesDir, `${key}.jpg`);
    try {
      await download(url, fileDest);
      console.log(`Saved: ${key}.jpg`);
    } catch (err) {
      console.error(`Failed ${key}:`, err.message);
    }
  }
  console.log('Done.');
}

run();
