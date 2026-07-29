// Central product catalogue for Scoop & Co.
// Images are royalty-free Unsplash sources.

const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;

export const categories = [
  { id: 'cups', name: 'Ice Cream Cups', icon: '🍨', image: img('photo-1560008581-09826d1de69e') },
  { id: 'cones', name: 'Cones', icon: '🍦', image: img('photo-1497034825429-c343d7c6a68f') },
  { id: 'sticks', name: 'Sticks', icon: '🍡', image: img('photo-1633933037339-05a5e8f4b0c5') },
  { id: 'sundaes', name: 'Sundaes', icon: '🍧', image: img('photo-1551024506-0bccd828d307') },
  { id: 'family-packs', name: 'Family Packs', icon: '🧊', image: img('photo-1587563871167-1ee9c731aefb') },
  { id: 'gelato', name: 'Gelato', icon: '🍮', image: img('photo-1567206563064-6f60f40a2b57') },
  { id: 'kulfi', name: 'Kulfi', icon: '🥭', image: img('photo-1629224316810-9d8805b95e76') },
  { id: 'cakes', name: 'Ice Cream Cakes', icon: '🎂', image: img('photo-1621303837174-89787a7d4729') },
  { id: 'milkshakes', name: 'Milkshakes', icon: '🥤', image: img('photo-1572490122747-3968b75cc699') },
  { id: 'waffles', name: 'Waffles', icon: '🧇', image: img('photo-1562376552-0d160a2f238d') },
  { id: 'desserts', name: 'Desserts', icon: '🍰', image: img('photo-1551106652-a5bcf4b29ab6') },
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

const flavors = [
  'Vanilla', 'Chocolate', 'Belgian Chocolate', 'Dark Chocolate', 'Strawberry', 'Mango',
  'Butterscotch', 'Black Currant', 'Blueberry', 'Coffee', 'Pista', 'Kesar', 'Dry Fruit',
  'Hazelnut', 'Salted Caramel', 'Oreo', 'KitKat', 'Brownie', 'Fruit Mix', 'Raspberry',
];

const brandIds = brands.map((b) => b.id);
const catForIndex = (i) => {
  const cyc = ['cups', 'cones', 'sticks', 'gelato', 'cakes'];
  return cyc[i % cyc.length];
};

const productImages = [
  'photo-1497034825429-c343d7c6a68f', 'photo-1560008581-09826d1de69e', 'photo-1567206563064-6f60f40a2b57',
  'photo-1551024506-0bccd828d307', 'photo-1629224316810-9d8805b95e76', 'photo-1633933037339-05a5e8f4b0c5',
  'photo-1576506295286-5cda18df43e7', 'photo-1610970881699-44a5587cabec', 'photo-1516559828984-fb3b99548b21',
  'photo-1488900128323-21503983a07e', 'photo-1516750105099-4b8a83e217ee', 'photo-1560008581-09826d1de69e',
];

export const products = flavors.map((flavor, i) => {
  const brand = brands[i % brandIds.length];
  const category = catForIndex(i);
  const price = 99 + (i % 10) * 25;
  const mrp = price + 40 + (i % 5) * 10;
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
    image: img(productImages[i % productImages.length]),
    isNew: i % 6 === 0,
    isBestseller: i % 4 === 0,
    description: `Rich and creamy ${flavor.toLowerCase()} ice cream made with premium ingredients, a customer favourite from ${brand.name}.`,
  };
});

export const familyPacks = [
  { id: 'fp1', name: '1L Vanilla Family Pack', size: '1 Litre', price: 249, mrp: 320, image: img('photo-1497034825429-c343d7c6a68f') },
  { id: 'fp2', name: '1L Chocolate Family Pack', size: '1 Litre', price: 259, mrp: 330, image: img('photo-1610970881699-44a5587cabec') },
  { id: 'fp3', name: 'Party Pack', size: '2 Litre', price: 449, mrp: 560, image: img('photo-1576506295286-5cda18df43e7') },
  { id: 'fp4', name: 'Triple Flavor Pack', size: '1.5 Litre', price: 399, mrp: 499, image: img('photo-1516559828984-fb3b99548b21') },
  { id: 'fp5', name: 'Premium Pack', size: '1 Litre', price: 349, mrp: 420, image: img('photo-1567206563064-6f60f40a2b57') },
  { id: 'fp6', name: 'Festival Pack', size: '2.5 Litre', price: 599, mrp: 749, image: img('photo-1551024506-0bccd828d307') },
];

export const sundaes = [
  { id: 'sd1', name: 'Brownie Sundae', price: 189, image: img('photo-1551024506-0bccd828d307') },
  { id: 'sd2', name: 'Hot Fudge Sundae', price: 179, image: img('photo-1567206563064-6f60f40a2b57') },
  { id: 'sd3', name: 'Belgian Chocolate Sundae', price: 209, image: img('photo-1610970881699-44a5587cabec') },
  { id: 'sd4', name: 'Fruit Sundae', price: 169, image: img('photo-1488900128323-21503983a07e') },
  { id: 'sd5', name: 'KitKat Sundae', price: 199, image: img('photo-1576506295286-5cda18df43e7') },
  { id: 'sd6', name: 'Oreo Sundae', price: 189, image: img('photo-1516750105099-4b8a83e217ee') },
  { id: 'sd7', name: 'Nut Sundae', price: 179, image: img('photo-1497034825429-c343d7c6a68f') },
];

export const gelato = [
  { id: 'gl1', name: 'Belgian Chocolate Gelato', price: 149, image: img('photo-1567206563064-6f60f40a2b57') },
  { id: 'gl2', name: 'Blueberry Gelato', price: 139, image: img('photo-1516559828984-fb3b99548b21') },
  { id: 'gl3', name: 'Pistachio Gelato', price: 159, image: img('photo-1610970881699-44a5587cabec') },
  { id: 'gl4', name: 'Hazelnut Gelato', price: 159, image: img('photo-1576506295286-5cda18df43e7') },
  { id: 'gl5', name: 'Raspberry Gelato', price: 149, image: img('photo-1488900128323-21503983a07e') },
  { id: 'gl6', name: 'Salted Caramel Gelato', price: 159, image: img('photo-1551024506-0bccd828d307') },
];

export const kulfi = [
  { id: 'kl1', name: 'Malai Kulfi', price: 79, image: img('photo-1629224316810-9d8805b95e76') },
  { id: 'kl2', name: 'Pista Kulfi', price: 89, image: img('photo-1633933037339-05a5e8f4b0c5') },
  { id: 'kl3', name: 'Mango Kulfi', price: 89, image: img('photo-1497034825429-c343d7c6a68f') },
  { id: 'kl4', name: 'Kesar Kulfi', price: 99, image: img('photo-1567206563064-6f60f40a2b57') },
  { id: 'kl5', name: 'Dry Fruit Kulfi', price: 109, image: img('photo-1610970881699-44a5587cabec') },
  { id: 'kl6', name: 'Chocolate Kulfi', price: 89, image: img('photo-1576506295286-5cda18df43e7') },
];

export const milkshakes = [
  { id: 'ms1', name: 'Chocolate Milkshake', price: 149, image: img('photo-1572490122747-3968b75cc699') },
  { id: 'ms2', name: 'Vanilla Milkshake', price: 139, image: img('photo-1497034825429-c343d7c6a68f') },
  { id: 'ms3', name: 'Strawberry Milkshake', price: 139, image: img('photo-1488900128323-21503983a07e') },
  { id: 'ms4', name: 'Oreo Milkshake', price: 159, image: img('photo-1516750105099-4b8a83e217ee') },
  { id: 'ms5', name: 'KitKat Milkshake', price: 159, image: img('photo-1576506295286-5cda18df43e7') },
  { id: 'ms6', name: 'Mango Milkshake', price: 149, image: img('photo-1629224316810-9d8805b95e76') },
  { id: 'ms7', name: 'Cold Coffee', price: 129, image: img('photo-1610970881699-44a5587cabec') },
];

export const desserts = [
  { id: 'ds1', name: 'Brownie', price: 129, image: img('photo-1551106652-a5bcf4b29ab6') },
  { id: 'ds2', name: 'Cookie', price: 69, image: img('photo-1499636136210-6f4ee915583e') },
  { id: 'ds3', name: 'Lava Cake', price: 159, image: img('photo-1621303837174-89787a7d4729') },
  { id: 'ds4', name: 'Donut', price: 79, image: img('photo-1551024506-0bccd828d307') },
  { id: 'ds5', name: 'Waffles', price: 169, image: img('photo-1562376552-0d160a2f238d') },
  { id: 'ds6', name: 'Cheesecake', price: 189, image: img('photo-1567306226416-28f0efdc88ce') },
];

export const combos = [
  { id: 'cb1', name: '2 Ice Cream Cups + Brownie', price: 249, mrp: 320, tag: 'Best Value', image: img('photo-1551024506-0bccd828d307') },
  { id: 'cb2', name: 'Family Pack + Waffles', price: 449, mrp: 560, tag: 'Family Favourite', image: img('photo-1562376552-0d160a2f238d') },
  { id: 'cb3', name: '4 Cones Combo', price: 299, mrp: 380, tag: 'Sharing', image: img('photo-1497034825429-c343d7c6a68f') },
  { id: 'cb4', name: 'Kids Combo', price: 179, mrp: 220, tag: 'Kids Special', image: img('photo-1576506295286-5cda18df43e7') },
  { id: 'cb5', name: 'Party Combo', price: 599, mrp: 749, tag: 'Party Size', image: img('photo-1610970881699-44a5587cabec') },
  { id: 'cb6', name: 'Festival Combo', price: 649, mrp: 799, tag: 'Limited', image: img('photo-1516559828984-fb3b99548b21') },
  { id: 'cb7', name: 'Date Night Combo', price: 399, mrp: 480, tag: 'Romantic', image: img('photo-1488900128323-21503983a07e') },
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
  { id: 'pc1', name: 'Madagascar Vanilla Bean', price: 349, tag: 'Gold Collection', image: img('photo-1497034825429-c343d7c6a68f') },
  { id: 'pc2', name: 'Swiss Truffle Delight', price: 399, tag: 'Imported', image: img('photo-1567206563064-6f60f40a2b57') },
  { id: 'pc3', name: "Chef's Special Tiramisu", price: 429, tag: 'Chef Special', image: img('photo-1610970881699-44a5587cabec') },
  { id: 'pc4', name: 'Golden Saffron Pistachio', price: 449, tag: 'Limited Edition', image: img('photo-1629224316810-9d8805b95e76') },
  { id: 'pc5', name: 'Belgian 70% Cacao', price: 379, tag: 'Gold Collection', image: img('photo-1576506295286-5cda18df43e7') },
];

export const reviews = [
  { id: 'rv1', name: 'Ananya Rao', rating: 5, comment: 'The Belgian chocolate sundae is out of this world. Delivery was quick and the ice cream was still perfectly frozen!', avatar: img('photo-1544005313-94ddf0286df2') },
  { id: 'rv2', name: 'Rohan Mehta', rating: 4.5, comment: 'Loved the festival combo — great value for a family gathering. Will definitely order again.', avatar: img('photo-1500648767791-00dcc994a43e') },
  { id: 'rv3', name: 'Sneha Iyer', rating: 5, comment: 'Their kulfi tastes exactly like the ones back home. Authentic and rich flavour every single time.', avatar: img('photo-1499996860823-5214fcc65f8f') },
  { id: 'rv4', name: 'Arjun Kapoor', rating: 4.8, comment: 'Premium collection is worth every rupee. The saffron pistachio scoop is now my weekend ritual.', avatar: img('photo-1492562080023-ab3db95bfbce') },
  { id: 'rv5', name: 'Meera Nair', rating: 4.6, comment: 'App is smooth, offers are genuinely useful, and the birthday freebie made my day extra special.', avatar: img('photo-1508214751196-bcfd4ca60f91') },
];

export const faqs = [
  { id: 'fq1', q: 'What are your delivery hours?', a: 'We deliver every day from 10 AM to 11 PM across all serviceable pin codes.' },
  { id: 'fq2', q: 'Do you offer eggless ice creams?', a: 'Yes, all our ice creams are 100% eggless and clearly labelled with veg/non-veg symbols.' },
  { id: 'fq3', q: 'Can I customise a combo pack?', a: 'Absolutely — choose "Customise" on any combo card to swap flavours and quantities.' },
  { id: 'fq4', q: 'What is your return policy?', a: 'Due to the perishable nature of our products, we offer refunds only for damaged or incorrect orders reported within 30 minutes of delivery.' },
  { id: 'fq5', q: 'Do you have sugar-free options?', a: 'Yes, look for the "Sugar-Free" badge in the Premium Collection and Gelato sections.' },
  { id: 'fq6', q: 'How do I use a coupon code?', a: 'Add items to your cart, go to checkout, and enter your coupon code in the "Coupon Code" field before payment.' },
];
