import Hero from "../components/Hero";
import CategoryGrid from "../components/CategoryGrid";
import ProductRail from "../components/ProductRail";
import FlashSaleBanner from "../components/FlashSaleBanner";
import BrandsMarquee from "../components/BrandsMarquee";
import Testimonials from "../components/Testimonials";
import BlogPreview from "../components/BlogPreview";
import SectionHeading from "../components/SectionHeading";
import ProductCard from "../components/ProductCard";
import { ALL_PRODUCTS } from "../data/products";

const featured = ALL_PRODUCTS.filter((p) => p.rating >= 4.4).slice(0, 8);

export default function Home() {
  return (
    <div>
      <Hero />
      <CategoryGrid />

      <section className="mx-auto max-w-[1400px] px-4 py-4 sm:px-6 lg:px-10">
        <SectionHeading eyebrow="Editor's Pick" title="Featured Products" sub="The pieces our stylists keep coming back to." linkTo="/men" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      <ProductRail eyebrow="Right Now" title="Trending Collection" />
      <FlashSaleBanner />
      <BrandsMarquee />
      <Testimonials />
      <BlogPreview />
    </div>
  );
}
