import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiX, FiGrid, FiList } from 'react-icons/fi';
import PageHeader from '../components/common/PageHeader';
import ProductCard from '../components/ProductCard/ProductCard';
import Pagination from '../components/common/Pagination';
import { ProductGridSkeleton } from '../components/Skeleton/Skeleton';
import usePagination from '../hooks/usePagination';
import { products, categories, brands } from '../data/products';
import './products.css';

const PAGE_SIZE = 12;

const flavorList = [...new Set(products.map((p) => p.flavor))];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const highlight = searchParams.get('highlight');
  const searchTerm = (searchParams.get('search') || '').toLowerCase();

  const [category, setCategory] = useState(initialCategory);
  const [brand, setBrand] = useState('');
  const [flavor, setFlavor] = useState('');
  const [maxPrice, setMaxPrice] = useState(400);
  const [minRating, setMinRating] = useState(0);
  const [stockOnly, setStockOnly] = useState(false);
  const [sort, setSort] = useState('popularity');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState('paginated'); // 'paginated' | 'infinite'
  const [loading, setLoading] = useState(true);

  // Simulated network delay so the skeleton grid actually has work to do.
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, brand, flavor, maxPrice, minRating, stockOnly, sort, searchTerm]);

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
      if (stockOnly && p.stock === 0) return false;
      if (searchTerm) {
        const hay = `${p.name} ${p.brand} ${p.flavor}`.toLowerCase();
        if (!hay.includes(searchTerm)) return false;
      }
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
  }, [category, brand, flavor, maxPrice, minRating, stockOnly, sort, highlight, searchTerm]);

  const { page, totalPages, goToPage, pageItems, infiniteItems, hasMore, loadMore } =
    usePagination(filtered, PAGE_SIZE);

  const visibleItems = viewMode === 'paginated' ? pageItems : infiniteItems;

  const clearFilters = () => {
    setCategory('');
    setBrand('');
    setFlavor('');
    setMaxPrice(400);
    setMinRating(0);
    setStockOnly(false);
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

      <div className="filter-group">
        <label className="filter-checkbox">
          <input type="checkbox" checked={stockOnly} onChange={(e) => setStockOnly(e.target.checked)} />
          In Stock Only
        </label>
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
              <div className="view-mode-toggle" role="group" aria-label="View mode">
                <button
                  className={viewMode === 'paginated' ? 'active' : ''}
                  onClick={() => setViewMode('paginated')}
                  aria-label="Paginated view"
                  title="Page numbers"
                >
                  <FiGrid />
                </button>
                <button
                  className={viewMode === 'infinite' ? 'active' : ''}
                  onClick={() => setViewMode('infinite')}
                  aria-label="Infinite scroll view"
                  title="Infinite scroll"
                >
                  <FiList />
                </button>
              </div>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="filter-select sort-select">
                <option value="popularity">Sort: Popularity</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="rating">Sort: Top Rated</option>
                <option value="newest">Sort: Newest</option>
              </select>
            </div>

            {loading ? (
              <ProductGridSkeleton count={8} />
            ) : filtered.length === 0 ? (
              <div className="products-empty">
                <p>
                  {searchTerm
                    ? `No results for "${searchParams.get('search')}". Try adjusting your search or filters.`
                    : 'No ice creams match your filters. Try adjusting them.'}
                </p>
                <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
              </div>
            ) : (
              <>
                <div className="products-grid">
                  {visibleItems.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </div>

                {viewMode === 'paginated' ? (
                  <Pagination page={page} totalPages={totalPages} onChange={goToPage} />
                ) : (
                  hasMore && (
                    <div className="load-more-wrap">
                      <p>Showing {infiniteItems.length} of {filtered.length}</p>
                      <button className="btn btn-outline" onClick={loadMore}>Load More</button>
                    </div>
                  )
                )}
              </>
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
