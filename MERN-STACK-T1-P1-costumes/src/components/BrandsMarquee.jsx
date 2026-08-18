import { FEATURED_BRANDS } from "../data/content";

export default function BrandsMarquee() {
  const loop = [...FEATURED_BRANDS, ...FEATURED_BRANDS];
  return (
    <section className="border-y hairline bg-white py-8 dark:bg-[#0b0b0c]">
      <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-ink/40 dark:text-white/35">Featured Brands</p>
      <div className="relative overflow-hidden">
        <div className="flex w-max animate-marquee gap-16">
          {loop.map((b, i) => (
            <span key={i} className="font-display shrink-0 text-xl font-semibold text-ink/25 transition hover:text-royal dark:text-white/25">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
