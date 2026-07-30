import { motion } from "framer-motion";
import Breadcrumb from "../components/Breadcrumb";
import ProductImage from "../components/ProductImage";
import Newsletter from "../components/Newsletter";
import { BLOG_POSTS } from "../data/content";

export default function BlogPage() {
  return (
    <div>
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-10">
        <Breadcrumb items={[{ label: "Blog" }]} />
        <h1 className="mt-4 mb-2 font-display text-3xl font-semibold sm:text-4xl">Style Journal</h1>
        <p className="mb-10 max-w-xl text-sm text-ink/55 dark:text-white/50">Fashion tips, styling edits and wardrobe guides from the StyleHub team.</p>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {[...BLOG_POSTS, ...BLOG_POSTS.map((p) => ({ ...p, title: p.title + " — Part II" }))].map((post, i) => (
            <motion.article key={post.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 3) * 0.08 }} className="group cursor-pointer">
              <div className="mb-4 overflow-hidden rounded-2xl aspect-[4/3]">
                <ProductImage src={post.image} seed={post.title} alt={post.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wide text-royal">{post.tag}</span>
              <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug group-hover:text-royal">{post.title}</h3>
              <p className="mt-1.5 text-sm text-ink/55 dark:text-white/50">{post.excerpt}</p>
            </motion.article>
          ))}
        </div>
      </div>
      <Newsletter />
    </div>
  );
}
