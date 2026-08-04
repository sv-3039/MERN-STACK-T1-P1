// Central product catalogue for Scoop & Co.
// Images are resolved through the image hub (src/utils/images.js): if you drop
// your own file into src/assets/images/ (e.g. products/vanilla.jpg), it is used
// automatically. Otherwise the app falls back to curated royalty-free Unsplash
// photos so the store always looks complete.
//
// To change an image you only need to add/rename a file in src/assets/images/ —
// no code edits required.

import { localOr } from '../utils/images.js';

const gallery = {
  cup: 'photo-1560008581-09826d1de69e',
  cone: 'photo-1497034825429-c343d7c6a68f',
  stick: 'photo-1633933037339-05a5e8f4b0c5',
  sundae: 'photo-1551024506-0bccd828d307',
  tub: 'photo-1587563871167-1ee9c731aefb',
  gelato: 'photo-1567206563064-6f60f40a2b57',
  kulfi: 'photo-1629224316810-9d8805b95e76',
  cake: 'photo-1621303837174-89787a7d4729',
  milkshake: 'photo-1572490122747-3968b75cc699',
  waffle: 'photo-1562376552-0d160a2f238d',
  brownie: 'photo-1551106652-a5bcf4b29ab6',
  mixedScoops: 'photo-1576506295286-5cda18df43e7',
  richChocolate: 'photo-1610970881699-44a5587cabec',
  berry: 'photo-1516559828984-fb3b99548b21',
  fruit: 'photo-1488900128323-21503983a07e',
  cookieish: 'photo-1516750105099-4b8a83e217ee',
  cookie: 'photo-1499636136210-6f4ee915583e',
  cheesecake: 'photo-1567306226416-28f0efdc88ce',
  chocolate: 'photo-1674595605055-fa617cb4f8d7',
  mango: 'photo-1755004609214-c252674df1ca',
  strawberry: 'photo-1532678465554-94846274c297',
  donut: 'photo-1525539866498-7f523778a72c',
};

// Resolve a local image first (via hub) and fall back to Unsplash.
const img = (key, id) => localOr(key, id);

export const categories = [
  { id: 'cups', name: 'Ice Cream Cups', icon: '🍨', image: img('categories/cups', gallery.cup) },
  { id: 'cones', name: 'Cones', icon: '🍦', image: img('categories/cones', gallery.cone) },
  { id: 'sticks', name: 'Sticks', icon: '🍡', image: img('categories/sticks', gallery.stick) },
  { id: 'sundaes', name: 'Sundaes', icon: '🍧', image: img('categories/sundaes', gallery.sundae) },
  { id: 'family-packs', name: 'Family Packs', icon: '🧊', image: img('categories/family-packs', gallery.tub) },
  { id: 'gelato', name: 'Gelato', icon: '🍮', image: img('categories/gelato', gallery.gelato) },
  { id: 'kulfi', name: 'Kulfi', icon: '🥭', image: img('categories/kulfi', gallery.kulfi) },
  { id: 'cakes', name: 'Ice Cream Cakes', icon: '🎂', image: img('categories/cakes', gallery.cake) },
  { id: 'milkshakes', name: 'Milkshakes', icon: '🥤', image: img('categories/milkshakes', gallery.milkshake) },
  { id: 'waffles', name: 'Waffles', icon: '🧇', image: img('categories/waffles', gallery.waffle) },
  { id: 'desserts', name: 'Desserts', icon: '🍰', image: img('categories/desserts', gallery.cheesecake) },
];

export const brands = [
  { id: 'amul', name: "Amul", tagline: 'The Taste of India', color: '#FF4D6D' },
  { id: 'arun', name: 'Arun Ice Creams', tagline: 'Chennai\'s Favourite', color: '#FB8500' },
  { id: 'kwality', name: "Kwality Wall's", tagline: 'Heart Brand Since 1954', color: '#6A4C93' },
  { id: 'havmor', name: 'Havmor', tagline: 'Freshness Guaranteed', color: '#8ECAE6' },
  { id: 'creamstone', name: 'Cream Stone', tagline: 'Live Ice Cream Counters', color: '#FFB703' },
  { id: 'naturals', name: "Naturals", tagline: 'Real Fruit, Real Ice Cream', color: '#FF4D6D' },
  { id: 'baskin', name: 'Baskin Robbins', tagline: '31 Flavours', color: '#6A4C93' },
  { id: 'nic', name: 'NIC', tagline: 'Natural Ice Creams', color: '#FB8500' },
  { id: 'ibaco', name: 'Ibaco', tagline: 'Belgian Chocolate Experts', color: '#8ECAE6' },
  { id: 'motherdairy', name: 'Mother Dairy', tagline: 'Trusted Everyday', color: '#FFB703' },
];

// Each flavour maps to a distinct image key. Drop a file in
// src/assets/images/products/<key>.jpg to override it.
const flavorImageKeys = {
  'Vanilla': 'vanilla',
  'Chocolate': 'chocolate',
  'Belgian Chocolate': 'belgian-chocolate',
  'Dark Chocolate': 'dark-chocolate',
  'Strawberry': 'strawberry',
  'Mango': 'mango',
  'Butterscotch': 'butterscotch',
  'Black Currant': 'black-currant',
  'Blueberry': 'blueberry',
  'Coffee': 'coffee',
  'Pista': 'pista',
  'Kesar': 'kesar',
  'Dry Fruit': 'dry-fruit',
  'Hazelnut': 'hazelnut',
  'Salted Caramel': 'salted-caramel',
  'Oreo': 'oreo',
  'KitKat': 'kitkat',
  'Brownie': 'brownie',
  'Fruit Mix': 'fruit-mix',
  'Raspberry': 'raspberry',
};

// Map each flavour to its Unsplash fallback id.
const flavorFallbacks = {
  'Vanilla': gallery.cup,
  'Chocolate': gallery.chocolate,
  'Belgian Chocolate': gallery.mixedScoops,
  'Dark Chocolate': gallery.cake,
  'Strawberry': gallery.strawberry,
  'Mango': gallery.mango,
  'Butterscotch': gallery.cheesecake,
  'Black Currant': gallery.berry,
  'Blueberry': gallery.fruit,
  'Coffee': gallery.milkshake,
  'Pista': gallery.gelato,
  'Kesar': gallery.kulfi,
  'Dry Fruit': gallery.cookieish,
  'Hazelnut': gallery.richChocolate,
  'Salted Caramel': gallery.tub,
  'Oreo': gallery.cookie,
  'KitKat': gallery.waffle,
  'Brownie': gallery.brownie,
  'Fruit Mix': gallery.sundae,
  'Raspberry': gallery.stick,
};

const flavors = Object.keys(flavorImageKeys);

const brandIds = brands.map((b) => b.id);
const catForIndex = (i) => {
  const cyc = ['cups', 'cones', 'sticks', 'gelato', 'cakes'];
  return cyc[i % cyc.length];
};

export const products = flavors.map((flavor, i) => {
  const brand = brands[i % brandIds.length];
  const category = catForIndex(i);
  const price = 99 + (i % 10) * 25;
  const mrp = price + 40 + (i % 5) * 10;
  const imgKey = flavorImageKeys[flavor];
  return {
    id: `p${i + 1}`,
    name: `${flavor} ${['Cup', 'Cone', 'Stick', 'Tub'][i % 4]}`,
    brand: brand.name,
    brandId: brand.id,
    flavor,
    category,
    price,
    mrp,
    rating: (3.8 + ((i * 7) % 12) / 10).toFixed(1),
    reviewsCount: 20 + ((i * 13) % 180),
    stock: i % 9 === 0 ? 0 : 12 + (i % 20),
    image: img(`products/${imgKey}`, flavorFallbacks[flavor]),
    isNew: i % 6 === 0,
    isBestseller: i % 4 === 0,
    description: `Rich and creamy ${flavor.toLowerCase()} ice cream made with premium ingredients, a customer favourite from ${brand.name}.`,
  };
});

export const familyPacks = [
  { id: 'fp1', name: '1L Vanilla Family Pack', size: '1 Litre', price: 249, mrp: 320, image: img('sections/tub', gallery.tub) },
  { id: 'fp2', name: '1L Chocolate Family Pack', size: '1 Litre', price: 259, mrp: 330, image: img('sections/chocolate', gallery.chocolate) },
  { id: 'fp3', name: 'Party Pack', size: '2 Litre', price: 449, mrp: 560, image: img('sections/sundae', gallery.sundae) },
  { id: 'fp4', name: 'Triple Flavor Pack', size: '1.5 Litre', price: 399, mrp: 499, image: img('sections/mixed-scoops', gallery.mixedScoops) },
  { id: 'fp5', name: 'Premium Pack', size: '1 Litre', price: 349, mrp: 420, image: img('sections/gelato', gallery.gelato) },
  { id: 'fp6', name: 'Festival Pack', size: '2.5 Litre', price: 599, mrp: 749, image: img('sections/cake', gallery.cake) },
];

export const sundaes = [
  { id: 'sd1', name: 'Brownie Sundae', price: 189, image: img('sections/brownie', gallery.brownie) },
  { id: 'sd2', name: 'Hot Fudge Sundae', price: 179, image: img('sections/chocolate', gallery.chocolate) },
  { id: 'sd3', name: 'Belgian Chocolate Sundae', price: 209, image: img('sections/rich-chocolate', gallery.richChocolate) },
  { id: 'sd4', name: 'Fruit Sundae', price: 169, image: img('sections/fruit', gallery.fruit) },
  { id: 'sd5', name: 'KitKat Sundae', price: 199, image: img('sections/waffle', gallery.waffle) },
  { id: 'sd6', name: 'Oreo Sundae', price: 189, image: img('sections/cookie', gallery.cookie) },
  { id: 'sd7', name: 'Nut Sundae', price: 179, image: img('sections/cookieish', gallery.cookieish) },
];

export const gelato = [
  { id: 'gl1', name: 'Belgian Chocolate Gelato', price: 149, image: img('sections/gelato', gallery.gelato) },
  { id: 'gl2', name: 'Blueberry Gelato', price: 139, image: img('sections/berry', gallery.berry) },
  { id: 'gl3', name: 'Pistachio Gelato', price: 159, image: img('sections/mixed-scoops', gallery.mixedScoops) },
  { id: 'gl4', name: 'Hazelnut Gelato', price: 159, image: img('sections/rich-chocolate', gallery.richChocolate) },
  { id: 'gl5', name: 'Raspberry Gelato', price: 149, image: img('sections/cone', gallery.cone) },
  { id: 'gl6', name: 'Salted Caramel Gelato', price: 159, image: img('sections/tub', gallery.tub) },
];

export const kulfi = [
  { id: 'kl1', name: 'Malai Kulfi', price: 79, image: img('sections/kulfi', gallery.kulfi) },
  { id: 'kl2', name: 'Pista Kulfi', price: 89, image: img('sections/gelato', gallery.gelato) },
  { id: 'kl3', name: 'Mango Kulfi', price: 89, image: img('sections/mango', gallery.mango) },
  { id: 'kl4', name: 'Kesar Kulfi', price: 99, image: img('sections/stick', gallery.stick) },
  { id: 'kl5', name: 'Dry Fruit Kulfi', price: 109, image: img('sections/cookieish', gallery.cookieish) },
  { id: 'kl6', name: 'Chocolate Kulfi', price: 89, image: img('sections/chocolate', gallery.chocolate) },
];

export const milkshakes = [
  { id: 'ms1', name: 'Chocolate Milkshake', price: 149, image: img('sections/chocolate', gallery.chocolate) },
  { id: 'ms2', name: 'Vanilla Milkshake', price: 139, image: img('sections/milkshake', gallery.milkshake) },
  { id: 'ms3', name: 'Strawberry Milkshake', price: 139, image: img('sections/strawberry', gallery.strawberry) },
  { id: 'ms4', name: 'Oreo Milkshake', price: 159, image: img('sections/cookie', gallery.cookie) },
  { id: 'ms5', name: 'KitKat Milkshake', price: 159, image: img('sections/waffle', gallery.waffle) },
  { id: 'ms6', name: 'Mango Milkshake', price: 149, image: img('sections/mango', gallery.mango) },
  { id: 'ms7', name: 'Cold Coffee', price: 129, image: img('sections/rich-chocolate', gallery.richChocolate) },
];

export const desserts = [
  { id: 'ds1', name: 'Brownie', price: 129, image: img('sections/brownie', gallery.brownie) },
  { id: 'ds2', name: 'Cookie', price: 69, image: img('sections/cookie', gallery.cookie) },
  { id: 'ds3', name: 'Lava Cake', price: 159, image: img('sections/cake', gallery.cake) },
  { id: 'ds4', name: 'Donut', price: 79, image: img('sections/donut', gallery.donut) },
  { id: 'ds5', name: 'Waffles', price: 169, image: img('sections/waffle', gallery.waffle) },
  { id: 'ds6', name: 'Cheesecake', price: 189, image: img('sections/cheesecake', gallery.cheesecake) },
];

export const combos = [
  { id: 'cb1', name: '2 Ice Cream Cups + Brownie', price: 249, mrp: 320, tag: 'Best Value', image: img('sections/cup', gallery.cup) },
  { id: 'cb2', name: 'Family Pack + Waffles', price: 449, mrp: 560, tag: 'Family Favourite', image: img('sections/waffle', gallery.waffle) },
  { id: 'cb3', name: '4 Cones Combo', price: 299, mrp: 380, tag: 'Sharing', image: img('sections/cone', gallery.cone) },
  { id: 'cb4', name: 'Kids Combo', price: 179, mrp: 220, tag: 'Kids Special', image: img('sections/sundae', gallery.sundae) },
  { id: 'cb5', name: 'Party Combo', price: 599, mrp: 749, tag: 'Party Size', image: img('sections/mixed-scoops', gallery.mixedScoops) },
  { id: 'cb6', name: 'Festival Combo', price: 649, mrp: 799, tag: 'Limited', image: img('sections/cake', gallery.cake) },
  { id: 'cb7', name: 'Date Night Combo', price: 399, mrp: 480, tag: 'Romantic', image: img('sections/chocolate', gallery.chocolate) },
];

export const offers = [
  { id: 'of1', title: 'Buy 1 Get 1 Free', desc: 'On all ice cream cups', icon: '🍨', color: 'var(--gradient-primary)' },
  { id: 'of2', title: 'Flat 20% OFF', desc: 'On orders above ₹499', icon: '🏷️', color: 'var(--gradient-gold)' },
  { id: 'of3', title: 'Happy Hours', desc: '4 PM – 6 PM daily, 15% off', icon: '⏰', color: 'var(--gradient-sky)' },
  { id: 'of4', title: 'Weekend Offer', desc: 'Extra 10% off Sat & Sun', icon: '🎉', color: 'var(--gradient-purple)' },
  { id: 'of5', title: 'Student Discount', desc: '10% off with student ID', icon: '🎓', color: 'var(--gradient-primary)' },
  { id: 'of6', title: 'Birthday Special', desc: 'Free sundae on your birthday', icon: '🎂', color: 'var(--gradient-gold)' },
  { id: 'of7', title: 'Family Pack Discount', desc: '₹50 off on family packs', icon: '👨‍👩‍👧', color: 'var(--gradient-sky)' },
  { id: 'of8', title: 'Festival Offer', desc: 'Up to 30% off this festive season', icon: '✨', color: 'var(--gradient-purple)' },
];

export const premiumCollection = [
  { id: 'pc1', name: 'Madagascar Vanilla Bean', price: 349, tag: 'Gold Collection', image: img('sections/cup', gallery.cup) },
  { id: 'pc2', name: 'Swiss Truffle Delight', price: 399, tag: 'Imported', image: img('sections/chocolate', gallery.chocolate) },
  { id: 'pc3', name: "Chef's Special Tiramisu", price: 429, tag: 'Chef Special', image: img('sections/rich-chocolate', gallery.richChocolate) },
  { id: 'pc4', name: 'Golden Saffron Pistachio', price: 449, tag: 'Limited Edition', image: img('sections/kulfi', gallery.kulfi) },
  { id: 'pc5', name: 'Belgian 70% Cacao', price: 379, tag: 'Gold Collection', image: img('sections/brownie', gallery.brownie) },
];

export const reviews = [
  { id: 'rv1', name: 'Ananya Rao', rating: 5, comment: 'The Belgian chocolate sundae is out of this world. Delivery was quick and the ice cream was still perfectly frozen!', avatar: localOr('reviews/avatar-1', 'photo-1544005313-94ddf0286df2') },
  { id: 'rv2', name: 'Rohan Mehta', rating: 4.5, comment: 'Loved the festival combo — great value for a family gathering. Will definitely order again.', avatar: localOr('reviews/avatar-2', 'photo-1500648767791-00dcc994a43e') },
  { id: 'rv3', name: 'Sneha Iyer', rating: 5, comment: 'Their kulfi tastes exactly like the ones back home. Authentic and rich flavour every single time.', avatar: localOr('reviews/avatar-3', 'photo-1499996860823-5214fcc65f8f') },
  { id: 'rv4', name: 'Arjun Kapoor', rating: 4.8, comment: 'Premium collection is worth every rupee. The saffron pistachio scoop is now my weekend ritual.', avatar: localOr('reviews/avatar-4', 'photo-1492562080023-ab3db95bfbce') },
  { id: 'rv5', name: 'Meera Nair', rating: 4.6, comment: 'App is smooth, offers are genuinely useful, and the birthday freebie made my day extra special.', avatar: localOr('reviews/avatar-5', 'photo-1508214751196-bcfd4ca60f91') },
];

export const faqs = [
  { id: 'fq1', q: 'What are your delivery hours?', a: 'We deliver every day from 10 AM to 11 PM across all serviceable pin codes.' },
  { id: 'fq2', q: 'Do you offer eggless ice creams?', a: 'Yes, all our ice creams are 100% eggless and clearly labelled with veg/non-veg symbols.' },
  { id: 'fq3', q: 'Can I customise a combo pack?', a: 'Absolutely — choose "Customise" on any combo card to swap flavours and quantities.' },
  { id: 'fq4', q: 'What is your return policy?', a: 'Due to the perishable nature of our products, we offer refunds only for damaged or incorrect orders reported within 30 minutes of delivery.' },
  { id: 'fq5', q: 'Do you have sugar-free options?', a: 'Yes, look for the "Sugar-Free" badge in the Premium Collection and Gelato sections.' },
  { id: 'fq6', q: 'How do I use a coupon code?', a: 'Add items to your cart, go to checkout, and enter your coupon code in the "Coupon Code" field before payment.' },
];

