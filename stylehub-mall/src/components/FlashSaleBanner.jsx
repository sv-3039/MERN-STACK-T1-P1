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
    <section className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-royal to-royal-900 px-6 py-10 sm:px-12 sm:py-14"
      >
        <div className="absolute -right-10 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -left-10 -bottom-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-white">
              <Zap size={18} className="fill-white" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]">Flash Sale</span>
            </div>
            <h3 className="font-display text-3xl font-semibold text-white sm:text-4xl">Up to 50% off — today only</h3>
            <p className="mt-2 max-w-md text-sm text-white/75">Statement layers, seasonal knitwear and select ethnic edits. Stock is limited.</p>
          </div>

          <div className="flex flex-col items-start gap-5 sm:items-end">
            <div className="flex gap-2">
              {[["Hrs", h], ["Min", m], ["Sec", s]].map(([label, val]) => (
                <div key={label} className="flex w-16 flex-col items-center rounded-xl bg-white/15 py-2.5 backdrop-blur">
                  <span className="font-display text-xl font-semibold text-white tabular-nums">{String(val).padStart(2, "0")}</span>
                  <span className="text-[10px] uppercase tracking-wide text-white/60">{label}</span>
                </div>
              ))}
            </div>
            <Link to="/men?tag=Sale" className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-royal-900 transition hover:bg-cloud">
              Shop the Sale <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
