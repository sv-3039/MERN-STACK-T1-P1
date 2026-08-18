import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Minus, Plus, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";
import ProductImage from "../components/ProductImage";
import RatingStars from "../components/RatingStars";
import ProductCard from "../components/ProductCard";
import SectionHeading from "../components/SectionHeading";
import { getProductById, ALL_PRODUCTS } from "../data/products";
import { useStore } from "../context/StoreContext";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const { addToCart, toggleWishlist, wishlist, addRecentlyViewed, recentlyViewed } = useStore();
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("description");
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (product) {
      setSize(product.sizes[Math.floor(product.sizes.length / 2)]);
      setColor(product.colors[0]);
      setQty(1);
      setActiveImg(0);
      addRecentlyViewed(product);
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!product) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <p className="text-lg font-medium">Product not found.</p>
        <button onClick={() => navigate("/")} className="mt-4 rounded-full bg-royal px-5 py-2.5 text-sm font-semibold text-white">Back to Home</button>
      </div>
    );
  }

  const isWished = wishlist.some((p) => p.id === product.id);
  const related = ALL_PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const images = [product.image, product.image2, product.image];

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-10">
      <Breadcrumb items={[{ label: product.section, to: `/${product.gender === "Women" ? "women" : product.section === "Accessories" ? "accessories" : "men"}` }, { label: product.name }]} />

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <motion.div key={activeImg} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} className="overflow-hidden rounded-3xl bg-cloud dark:bg-neutral-900 aspect-[4/5]">
            <ProductImage src={images[activeImg]} seed={product.id + activeImg} alt={product.name} className="h-full w-full object-cover" />
          </motion.div>
          <div className="mt-3 flex gap-3">
            {images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`h-20 w-16 overflow-hidden rounded-xl border-2 ${activeImg === i ? "border-royal" : "border-transparent"}`}>
                <ProductImage src={img} seed={product.id + i} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          {product.tags?.[0] && <span className="mb-2.5 w-fit rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-royal dark:bg-blue-950/60 dark:text-blue-400">{product.tags[0]}</span>}
          <span className="block text-xs uppercase font-bold tracking-widest text-zinc-500 dark:text-zinc-400">{product.brand} · {product.category}</span>
          <h1 className="mt-1.5 font-display text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">{product.name}</h1>
          <div className="mt-3"><RatingStars rating={product.rating} count={product.reviews} size={16} /></div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-3xl font-bold text-zinc-900 dark:text-white">₹{product.finalPrice.toLocaleString("en-IN")}</span>
            {product.discount > 0 && (
              <>
                <span className="text-lg text-zinc-400 line-through dark:text-zinc-500">₹{product.price.toLocaleString("en-IN")}</span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400">{product.discount}% OFF</span>
              </>
            )}
          </div>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Inclusive of all taxes · Free shipping over ₹1,999</p>

          <p className="mt-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{product.description}</p>

          <div className="mt-6 border-t hairline pt-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">Color: <span className="font-semibold text-zinc-600 dark:text-zinc-300">{color?.name}</span></p>
            <div className="flex gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c)}
                  className={`h-9 w-9 rounded-full border-2 transition-all shadow-sm ${color?.name === c.name ? "border-royal ring-2 ring-royal/30 scale-110" : "border-zinc-300 dark:border-zinc-700 hover:border-zinc-400"}`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">Size: <span className="font-semibold text-zinc-600 dark:text-zinc-300">{size}</span></p>
            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`rounded-xl border px-4 py-2 text-xs font-bold transition ${size === s ? "border-royal bg-royal text-white shadow-md" : "hairline text-zinc-800 dark:text-zinc-200 hover:border-royal"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons: Add to Cart and Buy Now */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex items-center justify-between gap-4 rounded-full border hairline px-4 py-3 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="text-zinc-500 hover:text-royal"><Minus size={15} /></button>
              <span className="w-6 text-center text-sm font-bold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="text-zinc-500 hover:text-royal"><Plus size={15} /></button>
            </div>

            <button
              onClick={() => addToCart(product, size, color, qty)}
              className="flex-1 rounded-full border-2 border-royal bg-white px-6 py-3.5 text-sm font-bold text-royal shadow-sm transition hover:bg-blue-50 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                addToCart(product, size, color, qty);
                navigate("/cart");
              }}
              className="flex-1 rounded-full bg-royal px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-blue-600"
            >
              Buy Now
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border hairline transition ${isWished ? "bg-royal text-white border-royal shadow-md" : "bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:border-royal"}`}
              title="Save to Wishlist"
            >
              <Heart size={20} className={isWished ? "fill-current" : ""} />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 rounded-2xl border hairline bg-zinc-50 p-4 dark:bg-zinc-900/60 text-center text-xs text-zinc-600 dark:text-zinc-400">
            <div className="flex flex-col items-center gap-1.5"><Truck size={20} className="text-royal" /> <span className="font-semibold text-zinc-800 dark:text-zinc-200">Free Shipping</span> ₹1,999+</div>
            <div className="flex flex-col items-center gap-1.5"><RotateCcw size={20} className="text-royal" /> <span className="font-semibold text-zinc-800 dark:text-zinc-200">15-Day Returns</span> Easy exchange</div>
            <div className="flex flex-col items-center gap-1.5"><ShieldCheck size={20} className="text-royal" /> <span className="font-semibold text-zinc-800 dark:text-zinc-200">Secure Payment</span> 100% Verified</div>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <div className="flex gap-6 border-b hairline">
          {["description", "reviews"].map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`border-b-2 pb-3 text-sm font-medium capitalize ${tab === t ? "border-royal text-royal" : "border-transparent text-ink/50 dark:text-white/45"}`}>
              {t} {t === "reviews" && `(${product.reviews})`}
            </button>
          ))}
        </div>
        <div className="max-w-2xl py-6 text-sm leading-relaxed text-ink/65 dark:text-white/55">
          {tab === "description" ? (
            <p>{product.description} Made for movement and everyday wear, this piece pairs easily with the rest of your wardrobe and holds its shape wash after wash. Available in sizes {product.sizes.join(", ")}.</p>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="font-display text-4xl font-semibold">{product.rating}</span>
                <div>
                  <RatingStars rating={product.rating} showValue={false} size={16} />
                  <p className="text-xs text-ink/50 dark:text-white/45">Based on {product.reviews} reviews</p>
                </div>
              </div>
              <p className="text-ink/55 dark:text-white/50">Customers highlight the fit, fabric quality and true-to-size sizing as the standout qualities of this piece.</p>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-10">
          <SectionHeading eyebrow="You Might Also Like" title="Related Products" />
          <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      )}

      {recentlyViewed.filter((p) => p.id !== product.id).length > 0 && (
        <div className="mt-10">
          <SectionHeading eyebrow="Your History" title="Recently Viewed" />
          <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">
            {recentlyViewed.filter((p) => p.id !== product.id).slice(0, 4).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      )}
    </div>
  );
}
