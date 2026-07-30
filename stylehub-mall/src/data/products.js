import { MEN_IMG, WOMEN_IMG, ACCESSORY_IMG } from "./images";

const BRANDS = ["StyleHub Signature", "Urban Thread", "Noir & Ivory", "Meridian", "Kavya Studio", "Bellrose", "Oakstreet Co.", "Verve", "Lumen", "Heritage Loom"];
const CLOTHING_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const COLORS = [
  { name: "Black", hex: "#111111" }, { name: "White", hex: "#FFFFFF" }, { name: "Royal Blue", hex: "#2563EB" },
  { name: "Beige", hex: "#E7D9C4" }, { name: "Olive", hex: "#5B5F3D" }, { name: "Maroon", hex: "#7A1F2B" },
  { name: "Charcoal", hex: "#3A3A3A" }, { name: "Blush", hex: "#F4C6D0" }, { name: "Mustard", hex: "#D9A441" },
  { name: "Emerald", hex: "#1E5631" }, { name: "Ivory", hex: "#F6F1E7" }, { name: "Rust", hex: "#B5502C" },
];

let uid = 1;
const pick = (arr, i) => arr[i % arr.length];
const pickN = (arr, n, offset = 0) => Array.from({ length: n }, (_, i) => pick(arr, offset + i * 3));
const round99 = (n) => Math.round(n) - (Math.round(n) % 10) + 9;

function makeProduct({ name, gender, section, category, imgPool, imgIndex, basePrice, tag }) {
  const discount = pick([0, 10, 15, 20, 25, 30, 40, 50], imgIndex + name.length);
  const price = round99(basePrice);
  const rating = +(3.6 + ((imgIndex * 37) % 14) / 10).toFixed(1);
  const reviews = 12 + ((imgIndex * 53 + name.length * 7) % 480);
  const sizes = section === "Accessories"
    ? (category === "Watches" || category === "Belts" ? ["Free Size"] : ["One Size"])
    : CLOTHING_SIZES;
  return {
    id: `P${String(uid++).padStart(4, "0")}`,
    name,
    brand: pick(BRANDS, imgIndex + name.length),
    gender,
    section,
    category,
    price,
    discount,
    finalPrice: Math.round(price * (1 - discount / 100)),
    rating,
    reviews,
    sizes,
    colors: pickN(COLORS, 3, imgIndex),
    image: pick(imgPool, imgIndex),
    image2: pick(imgPool, imgIndex + 1),
    tags: tag ? [tag] : [],
    description: `${name} crafted in premium fabric with a considered fit — an everyday staple from ${pick(BRANDS, imgIndex + name.length)}, designed for effortless, elevated style.`,
  };
}

// ---- Category taxonomy straight from the brief ----
export const MEN_TAXONOMY = {
  "Casual Wear": ["Oversized T-Shirt", "Graphic T-Shirt", "Plain Cotton T-Shirt", "Polo T-Shirt", "Henley T-Shirt", "Hoodie", "Sweatshirt", "Denim Jacket", "Bomber Jacket", "Cargo Pants", "Chinos", "Slim Fit Jeans", "Straight Fit Jeans", "Joggers", "Shorts"],
  "Formal Wear": ["Business Suit", "Slim Fit Blazer", "Formal Shirt", "Linen Shirt", "Cotton Shirt", "Checked Shirt", "Formal Trousers", "Waistcoat"],
  "Traditional Wear": ["Kurta", "Kurta Pajama", "Sherwani", "Nehru Jacket", "Dhoti Set"],
  "Winter Collection": ["Wool Sweater", "Cardigan", "Leather Jacket", "Puffer Jacket", "Wool Coat"],
};

export const WOMEN_TAXONOMY = {
  "Western Wear": ["Maxi Dress", "Mini Dress", "Bodycon Dress", "A-Line Dress", "Shirt Dress", "Floral Dress", "Crop Top", "Tank Top", "Oversized Shirt", "Blazer", "Denim Jacket", "Jumpsuit"],
  "Ethnic Wear": ["Cotton Saree", "Silk Saree", "Designer Saree", "Lehenga", "Salwar Suit", "Anarkali Dress", "Kurti", "Palazzo Set", "Dupatta"],
  "Bottom Wear": ["Skinny Jeans", "Wide Leg Jeans", "Cargo Pants", "Formal Pants", "Palazzo Pants", "Leggings", "Skirts", "Shorts"],
  "Winter Collection": ["Sweater", "Wool Coat", "Hoodie", "Cardigan", "Puffer Jacket"],
  "Party Wear": ["Evening Gown", "Cocktail Dress", "Designer Saree", "Party Lehenga", "Sequined Dress"],
};

export const ACCESSORIES_TAXONOMY = {
  "Men's Accessories": ["Leather Wallet", "Belt", "Watch", "Sunglasses", "Cap", "Backpack"],
  "Women's Accessories": ["Handbag", "Tote Bag", "Sling Bag", "Earrings", "Necklace", "Bracelet", "Rings", "Hair Accessories", "Sunglasses"],
};

const basePriceFor = (section, category) => {
  if (section === "Accessories") return category === "Watches" ? 3499 : 999;
  if (category.includes("Formal") || category.includes("Suit") || category.includes("Sherwani") || category.includes("Lehenga") || category.includes("Gown") || category.includes("Saree")) return 3999;
  if (category.includes("Winter") || category.includes("Jacket") || category.includes("Coat")) return 2999;
  if (category.includes("Party")) return 4499;
  return 1499;
};

function buildSection(taxonomy, gender, imgPool) {
  const list = [];
  let idx = 0;
  Object.entries(taxonomy).forEach(([category, items]) => {
    items.forEach((item) => {
      const tag = idx % 9 === 0 ? "New Arrival" : idx % 9 === 3 ? "Trending" : idx % 9 === 6 ? "Best Seller" : idx % 5 === 1 ? "Sale" : null;
      list.push(
        makeProduct({
          name: item,
          gender,
          section: gender === "Unisex" ? "Accessories" : category,
          category,
          imgPool,
          imgIndex: idx,
          basePrice: basePriceFor(category, item) + (idx % 5) * 150,
          tag,
        })
      );
      idx++;
    });
  });
  return list;
}

export const MEN_PRODUCTS = buildSection(MEN_TAXONOMY, "Men", MEN_IMG);
export const WOMEN_PRODUCTS = buildSection(WOMEN_TAXONOMY, "Women", WOMEN_IMG);

function buildAccessories() {
  const list = [];
  let idx = 0;
  Object.entries(ACCESSORIES_TAXONOMY).forEach(([group, items]) => {
    const gender = group.startsWith("Men") ? "Men" : "Women";
    items.forEach((item) => {
      list.push(
        makeProduct({
          name: item,
          gender,
          section: "Accessories",
          category: group,
          imgPool: ACCESSORY_IMG,
          imgIndex: idx,
          basePrice: basePriceFor("Accessories", item) + (idx % 4) * 400,
          tag: idx % 6 === 0 ? "New Arrival" : idx % 6 === 3 ? "Trending" : null,
        })
      );
      idx++;
    });
  });
  return list;
}

export const ACCESSORY_PRODUCTS = buildAccessories();

export const ALL_PRODUCTS = [...MEN_PRODUCTS, ...WOMEN_PRODUCTS, ...ACCESSORY_PRODUCTS];

export const BRAND_LIST = BRANDS;
export const COLOR_LIST = COLORS;

export const getProductById = (id) => ALL_PRODUCTS.find((p) => p.id === id);

export const CATEGORY_HEADERS = {
  Men: Object.keys(MEN_TAXONOMY),
  Women: Object.keys(WOMEN_TAXONOMY),
  Accessories: Object.keys(ACCESSORIES_TAXONOMY),
};
