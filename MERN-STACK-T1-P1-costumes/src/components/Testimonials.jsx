import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { TESTIMONIALS } from "../data/content";
import RatingStars from "./RatingStars";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];
  const next = () => setI((v) => (v + 1) % TESTIMONIALS.length);
  const prev = () => setI((v) => (v - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="bg-cloud py-16 dark:bg-neutral-950">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <SectionHeading eyebrow="Loved by Thousands" title="What our customers say" />
        <div className="relative mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center text-zinc-900 shadow-md dark:bg-neutral-900 dark:text-white sm:p-12">
          <Quote className="mx-auto mb-4 text-royal/30" size={32} />
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              <p className="font-display text-lg leading-relaxed text-zinc-900 dark:text-white sm:text-xl">"{t.text}"</p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <img src={t.avatar} alt={t.name} className="h-11 w-11 rounded-full object-cover border border-zinc-200 dark:border-zinc-700" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{t.role}</p>
                </div>
              </div>
              <div className="mt-3 flex justify-center"><RatingStars rating={t.rating} showValue={false} size={15} /></div>
            </motion.div>
          </AnimatePresence>

          <button onClick={prev} className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-100 text-zinc-800 hover:bg-royal hover:text-white dark:bg-neutral-800 dark:text-white sm:-left-4 shadow-sm">
            <ChevronLeft size={16} />
          </button>
          <button onClick={next} className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-100 text-zinc-800 hover:bg-royal hover:text-white dark:bg-neutral-800 dark:text-white sm:-right-4 shadow-sm">
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="mt-5 flex justify-center gap-1.5">
          {TESTIMONIALS.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} className={`h-1.5 rounded-full transition-all ${idx === i ? "w-6 bg-royal" : "w-1.5 bg-ink/15 dark:bg-white/20"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
