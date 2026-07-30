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

        <div>
          {product.tags?.[0] && <span className="mb-2 inline-block rounded-full bg-royal-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-royal dark:bg-royal/15">{product.tags[0]}</span>}
          <span className="block text-xs uppercase tracking-wide text-ink/45 dark:text-white/40">{product.brand} · {product.category}</span>
          <h1 className="mt-1 font-display text-3xl font-semibold">{product.name}</h1>
          <div className="mt-2"><RatingStars rating={product.rating} count={product.reviews} size={15} /></div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-3xl font-semibold">₹{product.finalPrice.toLocaleString("en-IN")}</span>
            {product.discount > 0 && (
              <>
                <span className="text-base text-ink/40 line-through dark:text-white/35">₹{product.price.toLocaleString("en-IN")}</span>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10">{product.discount}% off</span>
              </>
            )}
          </div>
          <p className="mt-1 text-xs text-ink/45 dark:text-white/40">Inclusive of all taxes · Free shipping over ₹1,999</p>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/65 dark:text-white/55">{product.description}</p>

          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide">Color: {color?.name}</p>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button key={c.name} onClick={() => setColor(c)} className={`h-8 w-8 rounded-full border-2 ${color?.name === c.name ? "border-royal" : "border-transparent"}`} style={{ backgroundColor: c.hex }} title={c.name} />
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide">Size: {size}</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button key={s} onClick={() => setSize(s)} className={`rounded-lg border px-3.5 py-2 text-xs font-medium ${size === s ? "border-royal bg-royal text-white" : "hairline hover:border-royal"}`}>{s}</button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-4 rounded-full border hairline px-4 py-2.5">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}><Minus size={14} /></button>
              <span className="w-5 text-center text-sm font-medium">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}><Plus size={14} /></button>
            </div>
            <button onClick={() => addToCart(product, size, color, qty)} className="flex-1 rounded-full bg-royal px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-royal-700">
              Add to Cart
            </button>
            <button onClick={() => toggleWishlist(product)} className={`flex h-12 w-12 items-center justify-center rounded-full border hairline ${isWished ? "bg-royal text-white" : "hover:border-royal"}`}>
              <Heart size={18} className={isWished ? "fill-current" : ""} />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 border-t hairline pt-6 text-center text-xs text-ink/60 dark:text-white/55">
            <div className="flex flex-col items-center gap-1.5"><Truck size={18} className="text-royal" /> Free shipping ₹1,999+</div>
            <div className="flex flex-col items-center gap-1.5"><RotateCcw size={18} className="text-royal" /> 15-day easy returns</div>
            <div className="flex flex-col items-center gap-1.5"><ShieldCheck size={18} className="text-royal" /> Secure checkout</div>
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
