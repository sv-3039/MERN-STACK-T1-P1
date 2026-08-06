import { useState, useMemo } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import products from '../../data/products';
import './ProductList.css';

export default function ProductList({ activeCategory, onCategoryChange, brandFilter }) {
  const [filterBrand, setFilterBrand] = useState('all');

  // Brands available in the current category (men/women)
  const categoryBrands = useMemo(() => {
    const scoped = activeCategory === 'men' || activeCategory === 'women'
      ? products.filter(p => p.category === activeCategory)
      : products;
    const uniqueBrands = [...new Set(scoped.map(p => p.brand))];
    return ['all', ...uniqueBrands];
  }, [activeCategory]);

  const filteredProducts = useMemo(() => {
    let result = products;

    // Filter by category (men/women)
    if (activeCategory === 'men' || activeCategory === 'women') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Apply brand filter (whether from nav brandFilter or category chip)
    const activeBrand = brandFilter && brandFilter !== 'all' ? brandFilter : filterBrand;
    if (activeBrand && activeBrand !== 'all') {
      result = result.filter(p => p.brand === activeBrand);
    }

    return result;
  }, [activeCategory, filterBrand, brandFilter]);

  const currentBrand = (brandFilter && brandFilter !== 'all') ? brandFilter : filterBrand;

  const showBrandFilters = activeCategory === 'men' || activeCategory === 'women' || activeCategory === 'brands';

  return (
    <section className="product-list-section" id="products-section">
      <div className="product-list-container">
        <div className="product-list-header">
          <h2 className="product-list-title">
            {activeCategory === 'men' ? "Men's Collection" :
             activeCategory === 'women' ? "Women's Collection" :
             activeCategory === 'brands' ? 'Browse by Brand' :
             'Our Collection'}
          </h2>
          <p className="product-list-subtitle">
            {activeCategory === 'men' || activeCategory === 'women' || activeCategory === 'brands'
              ? `Showing ${currentBrand === 'all' ? 'all brands' : currentBrand}`
              : 'Handpicked luxury timepieces for discerning collectors'}
          </p>
        </div>

        {showBrandFilters && (
          <div className="product-filters">
            <div className="brand-filter-buttons">
              {categoryBrands.map(brand => (
                <button
                  key={brand}
                  className={`filter-btn ${currentBrand === brand ? 'active' : ''}`}
                  onClick={() => setFilterBrand(brand)}
                >
                  {brand === 'all' ? 'All Brands' : brand}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="no-products">
              <span className="no-products-icon">⌚</span>
              <p>No watches found matching your criteria.</p>
              <button
                className="reset-btn"
                onClick={() => { setFilterBrand('all'); onCategoryChange('all'); }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
