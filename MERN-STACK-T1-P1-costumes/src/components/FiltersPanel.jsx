import { COLOR_LIST } from "../data/products";
import { Star, RotateCcw } from "lucide-react";

function Section({ title, children }) {
  return (
    <div className="border-b hairline py-4 first:pt-0 last:border-0 last:pb-0">
      <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-royal">{title}</h4>
      {children}
    </div>
  );
}

export default function FiltersPanel({ f }) {
  return (
    <div className="flex flex-col rounded-3xl border hairline bg-white p-5 shadow-sm dark:bg-zinc-900/90 text-zinc-900 dark:text-white">
      <div className="mb-4 flex items-center justify-between border-b hairline pb-3">
        <h3 className="font-display text-base font-bold tracking-tight">Filters</h3>
        <button
          onClick={f.resetFilters}
          className="flex items-center gap-1.5 text-xs font-bold text-royal hover:underline"
        >
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      <Section title="Category">
        <div className="flex flex-col gap-2.5">
          {f.categories.map((c) => (
            <label key={c} className="flex cursor-pointer items-center gap-2.5 text-xs font-medium text-zinc-700 hover:text-royal dark:text-zinc-300 dark:hover:text-royal">
              <input type="radio" name="category" checked={f.category === c} onChange={() => f.setCategory(c)} className="h-4 w-4 accent-royal" />
              {c}
            </label>
          ))}
        </div>
      </Section>

      <Section title="Brand">
        <select value={f.brand} onChange={(e) => f.setBrand(e.target.value)} className="w-full rounded-xl border hairline bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-xs font-semibold text-zinc-900 dark:text-white outline-none">
          {f.brands.map((b) => <option key={b} value={b} className="bg-white dark:bg-zinc-900">{b}</option>)}
        </select>
      </Section>

      <Section title="Size">
        <div className="flex flex-wrap gap-2">
          {["All", "XS", "S", "M", "L", "XL", "XXL"].map((s) => (
            <button
              key={s}
              onClick={() => f.setSize(s)}
              className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition ${f.size === s ? "border-royal bg-royal text-white shadow-sm" : "border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-royal"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Color">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => f.setColor("All")}
            className={`rounded-full border px-3 py-1 text-xs font-bold transition ${f.color === "All" ? "border-royal bg-royal text-white" : "border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300"}`}
          >
            All
          </button>
          {COLOR_LIST.map((c) => (
            <button
              key={c.name}
              onClick={() => f.setColor(c.name)}
              title={c.name}
              className={`h-6 w-6 rounded-full border-2 transition-transform shadow-xs ${f.color === c.name ? "border-royal ring-2 ring-royal/30 scale-110" : "border-zinc-300 dark:border-zinc-700 hover:scale-105"}`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </Section>

      <Section title="Price Range">
        <input type="range" min="500" max="6000" step="100" value={f.priceRange} onChange={(e) => f.setPriceRange(+e.target.value)} className="w-full accent-royal" />
        <div className="mt-2 flex justify-between text-xs font-semibold text-zinc-500 dark:text-zinc-400"><span>₹500</span><span className="text-royal font-bold">Up to ₹{f.priceRange.toLocaleString("en-IN")}</span></div>
      </Section>

      <Section title="Discount">
        <div className="flex flex-col gap-2">
          {[0, 10, 20, 30, 40].map((d) => (
            <label key={d} className="flex cursor-pointer items-center gap-2.5 text-xs font-medium text-zinc-700 hover:text-royal dark:text-zinc-300 dark:hover:text-royal">
              <input type="radio" name="discount" checked={f.minDiscount === d} onChange={() => f.setMinDiscount(d)} className="h-4 w-4 accent-royal" />
              {d === 0 ? "All Items" : `${d}% or more`}
            </label>
          ))}
        </div>
      </Section>

      <Section title="Customer Rating">
        <div className="flex flex-col gap-2">
          {[0, 3, 4, 4.5].map((r) => (
            <label key={r} className="flex cursor-pointer items-center gap-2.5 text-xs font-medium text-zinc-700 hover:text-royal dark:text-zinc-300 dark:hover:text-royal">
              <input type="radio" name="rating" checked={f.minRating === r} onChange={() => f.setMinRating(r)} className="h-4 w-4 accent-royal" />
              {r === 0 ? "All Ratings" : <span className="flex items-center gap-1 font-semibold">{r}+ <Star size={12} className="fill-amber-400 text-amber-400" /></span>}
            </label>
          ))}
        </div>
      </Section>
    </div>
  );
}
