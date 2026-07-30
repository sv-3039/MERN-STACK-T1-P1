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
    <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10">
      <SectionHeading eyebrow={eyebrow} title={title} />
      <div className="mb-8 flex gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${tab === t ? "bg-ink text-white dark:bg-white dark:text-ink" : "bg-cloud text-ink/60 hover:bg-ink/10 dark:bg-neutral-900 dark:text-white/55"}`}
          >
            {t === "New Arrival" ? "New Arrivals" : t === "Best Seller" ? "Best Sellers" : t}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </section>
  );
}
