# Luxury Watch Ecommerce - Implementation Steps

## ✅ Step 1: Create Data Layer
- [x] `src/data/products.js` — 14+ watch products array

## ✅ Step 2: Create Cart Context
- [x] `src/context/CartContext.jsx` — Global cart state management

## ✅ Step 3: Create Theme Context
- [x] `src/context/ThemeContext.jsx` — Bright/dark mode toggle with localStorage

## ✅ Step 4: Create Components (each with dedicated CSS)
- [x] `src/components/Navbar/` — Navigation + search + cart badge + brightness toggle
- [x] `src/components/HeroBanner/` — Full-width hero section
- [x] `src/components/Brands/` — Brand strip
- [x] `src/components/ProductCard/` — Watch card with Add to Cart + Buy Now
- [x] `src/components/ProductList/` — Product grid with filters
- [x] `src/components/Cart/` — Slide-in cart with checkout routing
- [x] `src/components/Footer/` — Multi-column footer

## ✅ Step 5: Create Pages
- [x] `src/pages/Home/` — HeroBanner + Brands + ProductList
- [x] `src/pages/Checkout/` — Shipping form + PhonePe/COD payment + order summary
- [x] `src/pages/OrderConfirmation/` — Order success with ID + payment method

## ✅ Step 6: Update Root Files
- [x] `src/App.jsx` — Routing with react-router-dom, ThemeProvider, CartProvider
- [x] `src/main.jsx` — BrowserRouter wrapper
- [x] `src/index.css` — Bright theme CSS variables for `[data-bright="true"]`
- [x] `src/App.css` — Updated layout styles
- [x] `index.html` — Title "LuxeWatch - Luxury Timepieces"

## ✅ Step 7: Test
- [x] Install dependencies (react-router-dom added)
- [x] Run `npm run dev` — server started at http://localhost:5173/
