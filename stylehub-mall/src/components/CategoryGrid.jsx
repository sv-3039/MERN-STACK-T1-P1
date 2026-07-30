import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductImage from "./ProductImage";
import SectionHeading from "./SectionHeading";
import { MEN_IMG, WOMEN_IMG, ACCESSORY_IMG } from "../data/images";

const CATS = [
  { label: "Women — Ethnic Wear", to: "/women?category=Ethnic+Wear", img: WOMEN_IMG[8], span: "sm:col-span-2 sm:row-span-2", size: "text-2xl sm:text-3xl" },
  { label: "Men — Formal Wear", to: "/men?category=Formal+Wear", img: MEN_IMG[10], span: "" },
  { label: "Women — Party Wear", to: "/women?category=Party+Wear", img: WOMEN_IMG[3], span: "" },
  { label: "Men — Winter Collection", to: "/men?category=Winter+Collection", img: MEN_IMG[17], span: "" },
  { label: "Accessories", to: "/accessories", img: ACCESSORY_IMG[2], span: "" },
];

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10">
      <SectionHeading eyebrow="Shop by Edit" title="Curated categories, not endless scroll" sub="Five entry points into the collection, chosen for how you actually shop." />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:grid-rows-2">
        {CATS.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className={`group relative overflow-hidden rounded-2xl ${c.span} ${i === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-auto" : "aspect-square"}`}
          >
            <Link to={c.to} className="block h-full w-full">
              <ProductImage src={c.img} seed={c.label} alt={c.label} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5">
                <span className={`font-display font-semibold text-white ${i === 0 ? c.size : "text-base"}`}>{c.label}</span>
                <div className="mt-1 h-px w-8 bg-royal transition-all duration-300 group-hover:w-14" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
