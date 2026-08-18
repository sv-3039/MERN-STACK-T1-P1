import { motion } from "framer-motion";
import { Heart, Eye, ShoppingBag, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ProductImage from "./ProductImage";
import RatingStars from "./RatingStars";
import { useStore } from "../context/StoreContext";

const TAG_STYLES = {
  "New Arrival": "bg-royal text-white font-bold",
  "Trending": "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold",
  "Best Seller": "bg-amber-400 text-zinc-950 font-bold",
  "Sale": "bg-rose-600 text-white font-bold",
};

export default function ProductCard({ product, index = 0 }) {
  const { toggleWishlist, wishlist, addToCart, setQuickViewProduct, setCartOpen } = useStore();
  const navigate = useNavigate();
  const isWished = wishlist.some((p) => p.id === product.id);

  const defaultSize = product.sizes?.[Math.floor(product.sizes.length / 2)] || "M";
  const defaultColor = product.colors?.[0]?.name || "Default";

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, defaultSize, defaultColor, 1);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, defaultSize, defaultColor, 1);
    setCartOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 8) * 0.04 }}
      className="group relative flex flex-col rounded-3xl border hairline bg-white p-2.5 shadow-xs transition-all hover:shadow-xl dark:bg-zinc-900/90 dark:text-white"
    >
      <div className="relative overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 aspect-[3/4]">
        <Link to={`/product/${product.id}`} aria-label={product.name}>
          <ProductImage
            src={product.image}
            seed={product.id}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <ProductImage
            src={product.image2}
            seed={product.id + "b"}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </Link>

        {/* Badges */}
        <div className="absolute left-2.5 top-2.5 flex flex-col gap-1.5 z-10">
          {product.tags?.[0] && (
            <span className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wider shadow-sm ${TAG_STYLES[product.tags[0]] || "bg-royal text-white font-bold"}`}>
              {product.tags[0]}
            </span>
          )}
          {product.discount > 0 && (
            <span className="w-fit rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Floating Quick Action Icons (Wishlist & Eye) - Appears on Hover */}
        <div className="absolute right-2.5 top-2.5 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}
            aria-label="Toggle wishlist"
            className={`flex h-9 w-9 items-center justify-center rounded-full shadow-lg backdrop-blur-md transition-all duration-300 ${isWished ? "bg-rose-600 text-white scale-100" : "bg-white/90 text-zinc-800 hover:bg-royal hover:text-white dark:bg-zinc-800/90 dark:text-white dark:hover:bg-royal"}`}
          >
            <Heart size={16} className={isWished ? "fill-current" : ""} />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQuickViewProduct(product); }}
            aria-label="Quick view"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-zinc-800 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-royal hover:text-white dark:bg-zinc-800/90 dark:text-white dark:hover:bg-royal"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-col justify-between px-1 pb-1">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 dark:text-zinc-500">{product.brand}</span>
          <Link to={`/product/${product.id}`} className="line-clamp-1 text-sm font-bold text-zinc-900 hover:text-royal dark:text-white dark:hover:text-royal transition">
            {product.name}
          </Link>
          <RatingStars rating={product.rating} count={product.reviews} />
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-display text-base font-bold text-zinc-900 dark:text-white">₹{product.finalPrice.toLocaleString("en-IN")}</span>
            {product.discount > 0 && (
              <span className="text-xs text-zinc-400 line-through dark:text-zinc-500">₹{product.price.toLocaleString("en-IN")}</span>
            )}
          </div>
          <div className="mt-1.5 flex gap-1.5">
            {product.colors?.slice(0, 4).map((c) => (
              <span key={c.name} title={c.name} className="h-3 w-3 rounded-full border border-zinc-300 dark:border-zinc-700 shadow-2xs" style={{ backgroundColor: c.hex }} />
            ))}
          </div>
        </div>

        {/* Always Visible Add to Cart and Buy Now Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-2 pt-2.5 border-t hairline">
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-1 rounded-xl border border-royal/30 text-royal hover:bg-royal hover:text-white dark:border-blue-400/40 dark:text-blue-400 dark:hover:bg-royal dark:hover:text-white py-2 text-xs font-bold transition shadow-2xs active:scale-95"
            title="Add to Cart"
          >
            <ShoppingBag size={13} /> Add
          </button>
          <button
            onClick={handleBuyNow}
            className="flex items-center justify-center gap-1 rounded-xl bg-royal text-white hover:bg-blue-600 py-2 text-xs font-bold transition shadow-xs active:scale-95"
            title="Buy Now"
          >
            <Zap size={13} /> Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}
