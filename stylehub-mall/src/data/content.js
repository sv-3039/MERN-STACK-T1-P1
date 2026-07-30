import { AVATARS, LIFESTYLE_IMG } from "./images";

export const TESTIMONIALS = [
  { name: "Ananya Rao", role: "Verified Buyer", avatar: AVATARS[0], rating: 5, text: "The fabric quality feels genuinely premium and the fit runs true to size. My Anarkali dress arrived earlier than expected and the packaging alone felt like a gift." },
  { name: "Rohan Mehta", role: "Verified Buyer", avatar: AVATARS[1], rating: 5, text: "Ordered a blazer for a wedding and it fit like it was tailored. StyleHub Mall has become my go-to for formal wear — consistent quality every time." },
  { name: "Ishita Kapoor", role: "Verified Buyer", avatar: AVATARS[2], rating: 4, text: "Love the seasonal drops. The winter collection is warm without being bulky, and the site makes it so easy to filter by size and colour." },
  { name: "Aarav Shah", role: "Verified Buyer", avatar: AVATARS[3], rating: 5, text: "Fast delivery, easy returns, and the quick-view feature saves so much time when I'm comparing sizes. Genuinely a smoother experience than most malls." },
  { name: "Meera Iyer", role: "Verified Buyer", avatar: AVATARS[4], rating: 5, text: "The party wear edit is stunning — got so many compliments on my sequined dress. Worth every rupee." },
];

export const BLOG_POSTS = [
  { title: "5 Ways to Style an Oversized Blazer This Season", excerpt: "From boardroom to brunch — a single blazer, five distinct looks that keep your wardrobe working harder.", image: LIFESTYLE_IMG[0], tag: "Styling" },
  { title: "The Modern Guide to Building a Capsule Wardrobe", excerpt: "Fewer pieces, more outfits. Here's how to curate a wardrobe that actually earns its closet space.", image: LIFESTYLE_IMG[1], tag: "Wardrobe" },
  { title: "Saree Draping 101: Six Styles Every Wardrobe Needs", excerpt: "A quick reference for draping styles that move effortlessly from festive mornings to evening receptions.", image: LIFESTYLE_IMG[2], tag: "Ethnic Wear" },
];

export const FAQS = [
  { q: "What sizes does StyleHub Mall carry?", a: "Most apparel is available from XS to XXL. Exact size charts are listed on every product page, and our Quick View makes it easy to compare fits before adding to your bag." },
  { q: "What is your return and exchange policy?", a: "We offer a 15-day easy return and exchange window on unused items with original tags intact. Refunds are processed to your original payment method within 5–7 business days." },
  { q: "How long does delivery take?", a: "Standard delivery takes 3–6 business days depending on your location. Express delivery options are shown at checkout for select pin codes." },
  { q: "Do you offer Cash on Delivery?", a: "Yes, Cash on Delivery is available for most pin codes across India, alongside cards, UPI, net banking and wallets." },
  { q: "How do I use a coupon code?", a: "Add your items to the cart, then enter your coupon code in the 'Coupon Code' field at checkout — the discount is applied instantly before payment." },
  { q: "Is Cash on Delivery available for international orders?", a: "International orders currently support prepaid payment methods only; COD is limited to domestic deliveries." },
];

export const FEATURED_BRANDS = ["StyleHub Signature", "Urban Thread", "Noir & Ivory", "Meridian", "Kavya Studio", "Bellrose", "Oakstreet Co.", "Heritage Loom"];

export const HERO_SLIDES = [
  { eyebrow: "New Season Collection", title: "Wear the season on your own terms.", sub: "Considered fits, honest fabrics, and pieces built to outlast the trend cycle.", cta: "Shop Now", to: "/women" },
  { eyebrow: "Flash Sale — Ends Soon", title: "Up to 50% off statement layers.", sub: "Jackets, coats and knitwear — the pieces that carry a whole wardrobe.", cta: "Shop the Sale", to: "/men" },
  { eyebrow: "Festive Edit", title: "Ethnic wear, reimagined for now.", sub: "Sarees, sherwanis and Anarkalis cut for the way you actually move.", cta: "Explore Ethnic", to: "/women?category=Ethnic+Wear" },
];
