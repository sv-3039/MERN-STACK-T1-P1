# StyleHub Mall

A premium, fully responsive frontend clothing store built with React + Vite + Tailwind CSS.

## Getting started 
```bash
npm install
npm run dev       # start local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build


## Stack

- React 19 + Vite
- Tailwind CSS v4
- Framer Motion (animations, page/section transitions)
- React Router (routing)
- lucide-react (icons)

## Structure

- `src/data` — product catalog (generated across the full Men/Women/Accessories taxonomy), images, static content (testimonials, blog, FAQ)
- `src/context/StoreContext.jsx` — cart, wishlist, recently viewed, coupons, dark mode, toasts (persisted to localStorage)
- `src/components` — Navbar (mega menu), Hero carousel, category grid, product cards, filters, cart drawer, quick view modal, etc.
- `src/pages` — Home, Men, Women, Accessories, Product Details, Wishlist, Search, Blog, FAQ

## Notes

- Product images are pulled from Unsplash at build/runtime; if any single image URL ever 404s, `ProductImage` automatically falls back to a seeded placeholder so the layout never breaks.
- Cart, wishlist and dark-mode preference persist in `localStorage`.
- Try coupon codes `STYLE10`, `WELCOME15`, or `FLASH50` in the cart drawer.
