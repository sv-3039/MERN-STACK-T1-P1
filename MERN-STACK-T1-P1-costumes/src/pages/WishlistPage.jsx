import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import ProductCard from "../components/ProductCard";
import { useStore } from "../context/StoreContext";

export default function WishlistPage() {
  const { wishlist } = useStore();

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-10">
      <Breadcrumb items={[{ label: "Wishlist" }]} />
      <h1 className="mt-4 mb-8 font-display text-3xl font-semibold sm:text-4xl">Your Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border hairline py-24 text-center">
          <Heart size={36} className="mb-3 text-ink/20" />
          <p className="text-sm text-ink/60 dark:text-white/55">Nothing saved yet — tap the heart on any product to add it here.</p>
          <Link to="/women" className="mt-4 rounded-full bg-royal px-5 py-2.5 text-xs font-semibold text-white">Browse Women's Collection</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">
          {wishlist.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
}
