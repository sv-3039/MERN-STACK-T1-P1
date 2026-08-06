import HeroBanner from '../../components/HeroBanner/HeroBanner';
import Brands from '../../components/Brands/Brands';
import ProductList from '../../components/ProductList/ProductList';
import './Home.css';

export default function Home({ activeCategory, onCategoryChange, brandFilter, onBrandSelect }) {
  return (
    <main className="home">
      <HeroBanner />
      <Brands onBrandSelect={onBrandSelect} />
      <ProductList
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
        brandFilter={brandFilter}
      />
    </main>
  );
}

