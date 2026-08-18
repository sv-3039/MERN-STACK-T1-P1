import { useState, useMemo } from "react";
import SectionHeading from "./SectionHeading";
import ProductCard from "./ProductCard";
import { ALL_PRODUCTS } from "../data/products";

const TABS = ["Trending", "New Arrival", "Best Seller"];

export default function ProductRail({ eyebrow = "Handpicked", title = "Trending Collection" }) {
  const [tab, setTab] = useState(TABS[0]);

  const items = useMemo(() => {
    const filtered = ALL_PRODUCTS.filter((p) => p.tags.includes(tab));
    return (filtered.length ? filtered : ALL_PRODUCTS).slice(0, 8);
  }, [tab]);

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10">
      <SectionHeading eyebrow={eyebrow} title={title} />
      <div className="my-6 flex flex-wrap gap-2.5 border-b hairline pb-4">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all shadow-sm ${tab === t ? "bg-royal text-white shadow-md scale-105" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:text-zinc-300 dark:hover:bg-zinc-700"}`}
          >
            {t === "New Arrival" ? "New Arrivals" : t === "Best Seller" ? "Best Sellers" : t}
          </button>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </section>
  );
}
