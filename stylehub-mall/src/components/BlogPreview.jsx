import { motion } from "framer-motion";
import ProductImage from "./ProductImage";
import SectionHeading from "./SectionHeading";
import { BLOG_POSTS } from "../data/content";

export default function BlogPreview() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10">
      <SectionHeading eyebrow="Style Journal" title="Fashion tips & edits" linkTo="/blog" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {BLOG_POSTS.map((post, i) => (
          <motion.article
            key={post.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group cursor-pointer"
          >
            <div className="mb-4 overflow-hidden rounded-2xl aspect-[4/3]">
              <ProductImage src={post.image} seed={post.title} alt={post.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wide text-royal">{post.tag}</span>
            <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug group-hover:text-royal">{post.title}</h3>
            <p className="mt-1.5 line-clamp-2 text-sm text-ink/55 dark:text-white/50">{post.excerpt}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
