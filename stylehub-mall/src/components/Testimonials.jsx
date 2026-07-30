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
        <div className="relative mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center shadow-sm dark:bg-neutral-900 sm:p-12">
          <Quote className="mx-auto mb-4 text-royal/30" size={32} />
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              <p className="font-display text-lg leading-relaxed text-ink dark:text-white sm:text-xl">"{t.text}"</p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <img src={t.avatar} alt={t.name} className="h-11 w-11 rounded-full object-cover" />
                <div className="text-left">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-ink/50 dark:text-white/45">{t.role}</p>
                </div>
              </div>
              <div className="mt-3 flex justify-center"><RatingStars rating={t.rating} showValue={false} size={15} /></div>
            </motion.div>
          </AnimatePresence>

          <button onClick={prev} className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-cloud hover:bg-royal hover:text-white dark:bg-neutral-800 sm:-left-4">
            <ChevronLeft size={16} />
          </button>
          <button onClick={next} className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-cloud hover:bg-royal hover:text-white dark:bg-neutral-800 sm:-right-4">
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
