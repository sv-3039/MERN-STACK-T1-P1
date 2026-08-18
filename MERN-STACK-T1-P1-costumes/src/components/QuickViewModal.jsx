import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Heart, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";
import RatingStars from "./RatingStars";
import { useStore } from "../context/StoreContext";

export default function QuickViewModal() {
  const { quickViewProduct: product, setQuickViewProduct, addToCart, toggleWishlist, wishlist } = useStore();
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) {
      setSize(product.sizes[Math.floor(product.sizes.length / 2)]);
      setColor(product.colors[0]);
      setQty(1);
    }
  }, [product]);

  if (!product) return null;
  const isWished = wishlist.some((p) => p.id === product.id);

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/50" onClick={() => setQuickViewProduct(null)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-1/2 z-[70] mx-auto grid max-w-3xl -translate-y-1/2 grid-cols-1 overflow-hidden rounded-2xl bg-white text-zinc-900 shadow-2xl dark:bg-[#0f0f10] dark:text-white sm:grid-cols-2"
          >
            <button onClick={() => setQuickViewProduct(null)} className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-1.5 text-zinc-800 dark:bg-black/60 dark:text-white"><X size={16} /></button>
            <div className="aspect-[4/5] bg-cloud dark:bg-neutral-900 sm:aspect-auto">
              <ProductImage src={product.image} seed={product.id} alt={product.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex max-h-[85vh] flex-col gap-3 overflow-y-auto p-6">
              <span className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{product.brand}</span>
              <h3 className="font-display text-xl font-semibold text-zinc-900 dark:text-white">{product.name}</h3>
              <RatingStars rating={product.rating} count={product.reviews} />
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-semibold text-zinc-900 dark:text-white">₹{product.finalPrice.toLocaleString("en-IN")}</span>
                {product.discount > 0 && <span className="text-sm text-zinc-400 line-through dark:text-zinc-500">₹{product.price.toLocaleString("en-IN")}</span>}
                {product.discount > 0 && <span className="text-xs font-semibold text-emerald-600">{product.discount}% off</span>}
              </div>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{product.description}</p>

              <div>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-900 dark:text-white">Color: {color?.name}</p>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button key={c.name} onClick={() => setColor(c)} className={`h-7 w-7 rounded-full border-2 ${color?.name === c.name ? "border-royal" : "border-transparent"}`} style={{ backgroundColor: c.hex }} title={c.name} />
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-900 dark:text-white">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button key={s} onClick={() => setSize(s)} className={`rounded-lg border px-3 py-1.5 text-xs ${size === s ? "border-royal bg-royal text-white" : "hairline text-zinc-800 dark:text-zinc-200"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2">
                <div className="flex items-center justify-between gap-3 rounded-full border hairline px-3 py-2 bg-zinc-50 dark:bg-zinc-800/80">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="text-zinc-500 hover:text-royal"><Minus size={14} /></button>
                  <span className="w-4 text-center text-xs font-bold text-zinc-900 dark:text-white">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="text-zinc-500 hover:text-royal"><Plus size={14} /></button>
                </div>
                <button
                  onClick={() => addToCart(product, size, color, qty)}
                  className="flex-1 rounded-full border-2 border-royal bg-white py-2.5 text-xs font-bold text-royal hover:bg-blue-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    addToCart(product, size, color, qty);
                    setQuickViewProduct(null);
                    setCartOpen(true);
                  }}
                  className="flex-1 rounded-full bg-royal py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-600 transition"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border hairline transition ${isWished ? "bg-royal text-white border-royal shadow-sm" : "bg-zinc-50 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200"}`}
                  title="Wishlist"
                >
                  <Heart size={16} className={isWished ? "fill-current" : ""} />
                </button>
              </div>
              <Link to={`/product/${product.id}`} onClick={() => setQuickViewProduct(null)} className="text-center text-xs font-medium text-royal underline underline-offset-4">
                View full details
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
