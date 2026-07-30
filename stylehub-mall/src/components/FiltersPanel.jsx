import { COLOR_LIST } from "../data/products";
import { Star } from "lucide-react";

function Section({ title, children }) {
  return (
    <div className="border-b hairline py-5 first:pt-0">
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide">{title}</h4>
      {children}
    </div>
  );
}

export default function FiltersPanel({ f }) {
  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">Filters</h3>
        <button onClick={f.resetFilters} className="text-xs font-medium text-royal hover:underline">Reset all</button>
      </div>

      <Section title="Category">
        <div className="flex flex-col gap-2">
          {f.categories.map((c) => (
            <label key={c} className="flex items-center gap-2 text-sm">
              <input type="radio" name="category" checked={f.category === c} onChange={() => f.setCategory(c)} className="accent-royal" />
              {c}
            </label>
          ))}
        </div>
      </Section>

      <Section title="Brand">
        <select value={f.brand} onChange={(e) => f.setBrand(e.target.value)} className="w-full rounded-lg border hairline bg-transparent px-3 py-2 text-sm">
          {f.brands.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </Section>

      <Section title="Size">
        <div className="flex flex-wrap gap-2">
          {["All", "XS", "S", "M", "L", "XL", "XXL"].map((s) => (
            <button key={s} onClick={() => f.setSize(s)} className={`rounded-lg border px-2.5 py-1 text-xs ${f.size === s ? "border-royal bg-royal text-white" : "hairline"}`}>{s}</button>
          ))}
        </div>
      </Section>

      <Section title="Color">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => f.setColor("All")} className={`rounded-full border px-2.5 py-1 text-xs ${f.color === "All" ? "border-royal text-royal" : "hairline"}`}>All</button>
          {COLOR_LIST.map((c) => (
            <button key={c.name} onClick={() => f.setColor(c.name)} title={c.name} className={`h-6 w-6 rounded-full border-2 ${f.color === c.name ? "border-royal" : "border-transparent"}`} style={{ backgroundColor: c.hex }} />
          ))}
        </div>
      </Section>

      <Section title="Price Range">
        <input type="range" min="500" max="6000" step="100" value={f.priceRange} onChange={(e) => f.setPriceRange(+e.target.value)} className="w-full accent-royal" />
        <div className="mt-1 flex justify-between text-xs text-ink/50 dark:text-white/45"><span>₹500</span><span>Up to ₹{f.priceRange.toLocaleString("en-IN")}</span></div>
      </Section>

      <Section title="Discount">
        <div className="flex flex-col gap-2">
          {[0, 10, 20, 30, 40].map((d) => (
            <label key={d} className="flex items-center gap-2 text-sm">
              <input type="radio" name="discount" checked={f.minDiscount === d} onChange={() => f.setMinDiscount(d)} className="accent-royal" />
              {d === 0 ? "All" : `${d}% or more`}
            </label>
          ))}
        </div>
      </Section>

      <Section title="Customer Rating">
        <div className="flex flex-col gap-2">
          {[0, 3, 4, 4.5].map((r) => (
            <label key={r} className="flex items-center gap-1.5 text-sm">
              <input type="radio" name="rating" checked={f.minRating === r} onChange={() => f.setMinRating(r)} className="accent-royal" />
              {r === 0 ? "All Ratings" : <span className="flex items-center gap-1">{r}+ <Star size={12} className="fill-royal text-royal" /></span>}
            </label>
          ))}
        </div>
      </Section>
    </div>
  );
}
