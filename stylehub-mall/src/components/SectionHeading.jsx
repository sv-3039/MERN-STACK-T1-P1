import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function SectionHeading({ eyebrow, title, sub, linkTo, linkLabel = "View all" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-8 flex flex-wrap items-end justify-between gap-4"
    >
      <div>
        {eyebrow && <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-royal">{eyebrow}</span>}
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">{title}</h2>
        {sub && <p className="mt-1.5 max-w-lg text-sm text-ink/55 dark:text-white/50">{sub}</p>}
      </div>
      {linkTo && (
        <Link to={linkTo} className="group flex items-center gap-1.5 text-sm font-medium text-ink/70 hover:text-royal dark:text-white/60">
          {linkLabel} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </motion.div>
  );
}
