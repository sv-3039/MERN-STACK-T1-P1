import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, ArrowRight } from "lucide-react";

function useCountdown(hours = 18) {
  const [target] = useState(() => Date.now() + hours * 3600 * 1000);
  const [left, setLeft] = useState(target - Date.now());
  useEffect(() => {
    const t = setInterval(() => setLeft(Math.max(0, target - Date.now())), 1000);
    return () => clearInterval(t);
  }, [target]);
  const h = Math.floor(left / 3600000);
  const m = Math.floor((left % 3600000) / 60000);
  const s = Math.floor((left % 60000) / 1000);
  return { h, m, s };
}

export default function FlashSaleBanner() {
  const { h, m, s } = useCountdown();
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-royal to-indigo-900 px-6 py-10 sm:px-12 sm:py-14 shadow-xl text-white"
      >
        <div className="absolute -right-10 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-16 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-300 backdrop-blur-md border border-white/20">
              <Zap size={16} className="fill-amber-300 text-amber-300 animate-pulse" />
              <span>Limited Time Offer</span>
            </div>
            <h3 className="font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl tracking-tight">
              Up to <span className="text-amber-300">50% OFF</span> — Today Only
            </h3>
            <p className="mt-2.5 max-w-lg text-sm sm:text-base leading-relaxed text-blue-100">
              Discover statement layers, seasonal knitwear, and select ethnic edits. High demand, stock is strictly limited.
            </p>
          </div>

          <div className="flex flex-col items-start gap-5 lg:items-end w-full lg:w-auto">
            <div className="flex items-center gap-2.5 sm:gap-3">
              {[["Hours", h], ["Mins", m], ["Secs", s]].map(([label, val]) => (
                <div key={label} className="flex min-w-[68px] sm:min-w-[76px] flex-col items-center rounded-2xl bg-white/15 px-3 py-2.5 backdrop-blur-md border border-white/20 shadow-md">
                  <span className="font-display text-2xl font-bold text-white tabular-nums sm:text-3xl">{String(val).padStart(2, "0")}</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-blue-200">{label}</span>
                </div>
              ))}
            </div>
            <Link to="/men?tag=Sale" className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-blue-900 shadow-xl transition hover:bg-amber-300 hover:text-zinc-950 hover:scale-105">
              Explore Flash Sale <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
