import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiX } from 'react-icons/fi';
import PageHeader from '../components/common/PageHeader';
import ProductCard from '../components/ProductCard/ProductCard';
import { products, categories, brands } from '../data/products';
import './products.css';

const flavorList = [...new Set(products.map((p) => p.flavor))];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const highlight = searchParams.get('highlight');

  const [category, setCategory] = useState(initialCategory);
  const [brand, setBrand] = useState('');
  const [flavor, setFlavor] = useState('');
  const [maxPrice, setMaxPrice] = useState(400);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState('popularity');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCategory(searchParams.get('category') || '');
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (category && p.category !== category) return false;
      if (brand && p.brandId !== brand) return false;
      if (flavor && p.flavor !== flavor) return false;
      if (p.price > maxPrice) return false;
      if (Number(p.rating) < minRating) return false;
      return true;
    });

    if (sort === 'priceLow') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'priceHigh') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === 'newest') list = [...list].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

    if (highlight) {
      const idx = list.findIndex((p) => p.id === highlight);
      if (idx > 0) {
        const [item] = list.splice(idx, 1);
        list.unshift(item);
      }
    }
    return list;
  }, [category, brand, flavor, maxPrice, minRating, sort, highlight]);

  const clearFilters = () => {
    setCategory('');
    setBrand('');
    setFlavor('');
    setMaxPrice(400);
    setMinRating(0);
    setSearchParams({});
  };

  const FiltersPanel = (
    <div className="filters-panel">
      <div className="filters-head">
        <h3>Filters</h3>
        <button onClick={clearFilters} className="filters-clear">Clear all</button>
      </div>

      <div className="filter-group">
        <p className="filter-label">Category</p>
        <div className="filter-options">
          <button className={!category ? 'active' : ''} onClick={() => setCategory('')}>All</button>
          {categories.map((c) => (
            <button key={c.id} className={category === c.id ? 'active' : ''} onClick={() => setCategory(c.id)}>
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <p className="filter-label">Brand</p>
        <div className="filter-options">
          <button className={!brand ? 'active' : ''} onClick={() => setBrand('')}>All</button>
          {brands.map((b) => (
            <button key={b.id} className={brand === b.id ? 'active' : ''} onClick={() => setBrand(b.id)}>
              {b.name}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <p className="filter-label">Flavor</p>
        <select value={flavor} onChange={(e) => setFlavor(e.target.value)} className="filter-select">
          <option value="">All Flavors</option>
          {flavorList.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <p className="filter-label">Max Price: ₹{maxPrice}</p>
        <input
          type="range"
          min="99"
          max="350"
          step="10"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="filter-range"
        />
      </div>

      <div className="filter-group">
        <p className="filter-label">Minimum Rating</p>
        <div className="filter-options">
          {[0, 3.5, 4, 4.5].map((r) => (
            <button key={r} className={minRating === r ? 'active' : ''} onClick={() => setMinRating(r)}>
              {r === 0 ? 'Any' : `${r}+`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <PageHeader
        eyebrow="Full Catalogue"
        title="All Ice Creams"
        sub={`Browse our full range of ${products.length}+ flavours from 10 premium brands.`}
      />

      <section className="section products-section">
        <div className="container products-layout">
          <aside className="products-sidebar">{FiltersPanel}</aside>

          <div className="products-main">
            <div className="products-toolbar">
              <button className="mobile-filter-btn" onClick={() => setMobileFiltersOpen(true)}>
                <FiFilter /> Filters
              </button>
              <p className="products-count">{filtered.length} products</p>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="filter-select sort-select">
                <option value="popularity">Sort: Popularity</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="rating">Sort: Top Rated</option>
                <option value="newest">Sort: Newest</option>
              </select>
            </div>

            {filtered.length === 0 ? (
              <div className="products-empty">
                <p>No ice creams match your filters. Try adjusting them.</p>
                <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
              </div>
            ) : (
              <div className="products-grid">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {mobileFiltersOpen && (
        <div className="mobile-filters-overlay" onClick={() => setMobileFiltersOpen(false)}>
          <div className="mobile-filters-panel" onClick={(e) => e.stopPropagation()}>
            <button className="mf-close" onClick={() => setMobileFiltersOpen(false)}><FiX /></button>
            {FiltersPanel}
          </div>
        </div>
      )}
    </>
  );
}
