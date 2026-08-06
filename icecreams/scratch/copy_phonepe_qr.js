import fs from 'fs';
import path from 'path';

const srcQr = 'C:\\Users\\Ganesh\\.gemini\\antigravity\\brain\\94113728-66a5-43f1-ba13-5c0044311bf1\\.user_uploaded\\media_1786004383238.jpg';
const destAsset = path.resolve('src/assets/images/upi-phonepe.jpeg');
const destPublic = path.resolve('public/upi-phonepe.jpg');

fs.copyFileSync(srcQr, destAsset);

if (!fs.existsSync(path.resolve('public'))) {
  fs.mkdirSync(path.resolve('public'), { recursive: true });
}
fs.copyFileSync(srcQr, destPublic);

console.log('Successfully updated PhonePe QR image in assets and public folders!');
