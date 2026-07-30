import { motion } from "framer-motion";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";
import RatingStars from "./RatingStars";
import { useStore } from "../context/StoreContext";

const TAG_STYLES = {
  "New Arrival": "bg-royal text-white",
  "Trending": "bg-ink text-white dark:bg-white dark:text-ink",
  "Best Seller": "bg-amber-400 text-ink",
  "Sale": "bg-rose-600 text-white",
};

export default function ProductCard({ product, index = 0 }) {
  const { toggleWishlist, wishlist, addToCart, setQuickViewProduct } = useStore();
  const isWished = wishlist.some((p) => p.id === product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.04 }}
      className="group relative flex flex-col"
    >
      <div className="relative overflow-hidden rounded-2xl bg-cloud dark:bg-neutral-900 aspect-[3/4]">
        <Link to={`/product/${product.id}`} aria-label={product.name}>
          <ProductImage
            src={product.image}
            seed={product.id}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <ProductImage
            src={product.image2}
            seed={product.id + "b"}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </Link>

        {product.tags?.[0] && (
          <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${TAG_STYLES[product.tags[0]]}`}>
            {product.tags[0]}
          </span>
        )}
        {product.discount > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold text-rose-600 dark:bg-black/70">
            -{product.discount}%
          </span>
        )}

        <button
          onClick={() => toggleWishlist(product)}
          aria-label="Toggle wishlist"
          className={`absolute right-3 bottom-16 flex h-9 w-9 translate-x-14 items-center justify-center rounded-full shadow-md transition-all duration-300 group-hover:translate-x-0 ${isWished ? "bg-royal text-white" : "bg-white text-ink hover:bg-royal hover:text-white"}`}
        >
          <Heart size={16} className={isWished ? "fill-current" : ""} />
        </button>
        <button
          onClick={() => setQuickViewProduct(product)}
          aria-label="Quick view"
          className="absolute right-3 bottom-4 flex h-9 w-9 translate-x-14 items-center justify-center rounded-full bg-white text-ink shadow-md transition-all delay-75 duration-300 hover:bg-royal hover:text-white group-hover:translate-x-0"
        >
          <Eye size={16} />
        </button>

        <button
          onClick={() => addToCart(product, product.sizes[Math.floor(product.sizes.length / 2)], product.colors[0], 1)}
          className="absolute inset-x-3 bottom-3 flex translate-y-14 items-center justify-center gap-2 rounded-full bg-ink/90 py-2.5 text-xs font-semibold text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-royal dark:bg-white/90 dark:text-ink"
        >
          <ShoppingBag size={14} /> Add to Cart
        </button>
      </div>

      <div className="mt-3 flex flex-col gap-1">
        <span className="text-[11px] uppercase tracking-wide text-ink/45 dark:text-white/40">{product.brand}</span>
        <Link to={`/product/${product.id}`} className="line-clamp-1 text-sm font-medium text-ink hover:text-royal dark:text-white">
          {product.name}
        </Link>
        <RatingStars rating={product.rating} count={product.reviews} />
        <div className="mt-0.5 flex items-baseline gap-2">
          <span className="font-display text-base font-semibold text-ink dark:text-white">₹{product.finalPrice.toLocaleString("en-IN")}</span>
          {product.discount > 0 && (
            <span className="text-xs text-ink/40 line-through dark:text-white/35">₹{product.price.toLocaleString("en-IN")}</span>
          )}
        </div>
        <div className="mt-1 flex gap-1">
          {product.colors.slice(0, 4).map((c) => (
            <span key={c.name} title={c.name} className="h-3.5 w-3.5 rounded-full border border-ink/10" style={{ backgroundColor: c.hex }} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
