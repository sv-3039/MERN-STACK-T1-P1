import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES } from "../data/content";
import { HERO_IMG } from "../data/images";
import ProductImage from "./ProductImage";

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const slide = HERO_SLIDES[index];

  return (
    <section className="relative h-[86vh] min-h-[560px] w-full overflow-hidden bg-ink">
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <ProductImage src={HERO_IMG[index % HERO_IMG.length]} seed={`hero-${index}`} alt="" className="h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-4 pb-20 sm:px-6 lg:px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <span className="mb-4 inline-block rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
              {slide.eyebrow}
            </span>
            <h1 className="font-display text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-6xl">{slide.title}</h1>
            <p className="mt-4 max-w-md text-sm text-white/75 sm:text-base">{slide.sub}</p>
            <Link
              to={slide.to}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-royal px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white hover:text-ink"
            >
              {slide.cta} <ArrowRight size={16} />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 right-4 z-10 flex items-center gap-3 sm:right-10">
        <button onClick={() => setIndex((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white hover:text-ink">
          <ChevronLeft size={16} />
        </button>
        <div className="flex gap-1.5">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-royal" : "w-1.5 bg-white/40"}`} />
          ))}
        </div>
        <button onClick={() => setIndex((i) => (i + 1) % HERO_SLIDES.length)} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white hover:text-ink">
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}
