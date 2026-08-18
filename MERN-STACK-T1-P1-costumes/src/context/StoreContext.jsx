import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

const StoreContext = createContext(null);

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const COUPONS = { STYLE10: 10, WELCOME15: 15, FLASH50: 50 };

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => load("sh_cart", []));
  const [wishlist, setWishlist] = useState(() => load("sh_wishlist", []));
  const [recentlyViewed, setRecentlyViewed] = useState(() => load("sh_recent", []));
  const [dark, setDark] = useState(() => load("sh_dark", false));
  const [toasts, setToasts] = useState([]);
  const [coupon, setCoupon] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => localStorage.setItem("sh_cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("sh_wishlist", JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => localStorage.setItem("sh_recent", JSON.stringify(recentlyViewed)), [recentlyViewed]);
  useEffect(() => {
    localStorage.setItem("sh_dark", JSON.stringify(dark));
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const notify = useCallback((message, kind = "success") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message, kind }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2800);
  }, []);

  const addToCart = useCallback((product, size, color, qty = 1) => {
    setCart((prev) => {
      const key = `${product.id}-${size}-${color?.name}`;
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { key, product, size, color, qty }];
    });
    notify(`${product.name} added to bag`);
  }, [notify]);

  const removeFromCart = useCallback((key) => {
    setCart((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const updateQty = useCallback((key, qty) => {
    setCart((prev) => prev.map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i)));
  }, []);

  const toggleWishlist = useCallback((product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        notify(`Removed from wishlist`, "info");
        return prev.filter((p) => p.id !== product.id);
      }
      notify(`Added to wishlist`, "wishlist");
      return [product, ...prev];
    });
  }, [notify]);

  const addRecentlyViewed = useCallback((product) => {
    setRecentlyViewed((prev) => [product, ...prev.filter((p) => p.id !== product.id)].slice(0, 10));
  }, []);

  const applyCoupon = useCallback((code) => {
    const pct = COUPONS[code?.toUpperCase()];
    if (pct) {
      setCoupon({ code: code.toUpperCase(), pct });
      notify(`Coupon ${code.toUpperCase()} applied — ${pct}% off`);
      return true;
    }
    notify("Invalid coupon code", "error");
    return false;
  }, [notify]);

  const cartCount = useMemo(() => cart.reduce((n, i) => n + i.qty, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((n, i) => n + i.qty * i.product.finalPrice, 0), [cart]);
  const discountAmount = coupon ? Math.round((subtotal * coupon.pct) / 100) : 0;
  const shipping = subtotal > 0 && subtotal < 1999 ? 99 : 0;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const value = {
    cart, addToCart, removeFromCart, updateQty, cartCount, subtotal, discountAmount, shipping, total,
    wishlist, toggleWishlist,
    recentlyViewed, addRecentlyViewed,
    dark, setDark,
    toasts, notify,
    coupon, applyCoupon, setCoupon,
    quickViewProduct, setQuickViewProduct,
    cartOpen, setCartOpen,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);
