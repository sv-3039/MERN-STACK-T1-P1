import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";
import FiltersPanel from "../components/FiltersPanel";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { useProductFilters } from "../hooks/useProductFilters";

export default function CollectionPage({ title, subtitle, products, banner }) {
  const [params] = useSearchParams();
  const f = useProductFilters(products, { category: params.get("category") || "All", tag: params.get("tag") });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.get("category")) f.setCategory(params.get("category"));
    if (params.get("tag")) f.setTagFilter(params.get("tag"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, [f.page, f.category, f.brand, f.size, f.color, f.sort]);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-10">
      <Breadcrumb items={[{ label: title }]} />

      <div className="mt-4 mb-8">
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-xl text-sm text-ink/55 dark:text-white/50">{subtitle}</p>}
      </div>

      {banner}

      <div className="flex gap-10">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24">
            <FiltersPanel f={f} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <button onClick={() => setMobileFiltersOpen(true)} className="flex items-center gap-2 rounded-full border hairline px-4 py-2 text-xs font-medium lg:hidden">
              <SlidersHorizontal size={14} /> Filters
            </button>
            <span className="text-xs text-ink/50 dark:text-white/45">{f.filteredCount} products</span>
            <select value={f.sort} onChange={(e) => f.setSort(e.target.value)} className="ml-auto rounded-full border hairline bg-transparent px-4 py-2 text-xs font-medium">
              {f.sorts.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {loading ? (
            <LoadingSkeleton count={8} />
          ) : f.paged.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border hairline py-24 text-center">
              <p className="text-sm text-ink/60 dark:text-white/55">No products match these filters.</p>
              <button onClick={f.resetFilters} className="mt-3 text-xs font-semibold text-royal hover:underline">Reset filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 xl:grid-cols-4">
              {f.paged.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}

          <Pagination page={f.page} totalPages={f.totalPages} onChange={f.setPage} />
        </div>
      </div>

      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "tween", duration: 0.25 }} className="fixed inset-y-0 left-0 z-50 w-[85%] max-w-xs overflow-y-auto bg-white p-6 dark:bg-[#0b0b0c]">
              <div className="mb-4 flex justify-end"><button onClick={() => setMobileFiltersOpen(false)}><X size={20} /></button></div>
              <FiltersPanel f={f} />
              <button onClick={() => setMobileFiltersOpen(false)} className="mt-4 w-full rounded-full bg-royal py-3 text-sm font-semibold text-white">Show results</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
