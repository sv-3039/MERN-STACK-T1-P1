import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiHeart,
  FiShare2,
  FiShoppingCart,
  FiStar,
  FiTruck,
  FiCheckCircle,
  FiXCircle,
  FiMinus,
  FiPlus,
  FiChevronRight,
} from 'react-icons/fi';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import ProductCard from '../components/ProductCard/ProductCard';
import { ProductDetailsSkeleton } from '../components/Skeleton/Skeleton';
import ErrorPage from './ErrorPage';
import './productDetails.css';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const { ids: recentIds, trackView } = useRecentlyViewed();

  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [zoom, setZoom] = useState({ active: false, x: 0, y: 0 });

  const product = useMemo(() => products.find((p) => p.id === id), [id]);

  // Simulated fetch delay so the skeleton has a real job to do; also
  // covers the "loading" phase you'd have with a real product API.
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 380);
    return () => clearTimeout(t);
  }, [id]);

  useEffect(() => {
    setQty(1);
    setActiveImg(0);
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (product) trackView(product.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  if (loading) return <ProductDetailsSkeleton />;

  if (!product) {
    return (
      <ErrorPage
        error={{ message: `No product found for id "${id}"` }}
        onRetry={() => navigate('/products')}
      />
    );
  }

  const gallery = [
    product.image,
    `${product.image}&sat=-20`,
    `${product.image}&sat=20`,
  ];

  const outOfStock = product.stock === 0;
  const lowStock = !outOfStock && product.stock <= 5;
  const discount = product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;
  const deliveryDays = 2 + (parseInt(product.id.replace(/\D/g, ''), 10) % 3);

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const recentlyViewed = recentIds
    .map((rid) => products.find((p) => p.id === rid))
    .filter((p) => p && p.id !== product.id)
    .slice(0, 4);

  const wishlisted = isWishlisted(product.id);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoom({ active: true, x, y });
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, text: product.description, url });
      } catch {
        /* user cancelled share sheet — no-op */
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      showToast('Product link copied to clipboard', 'success');
    }
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    navigate('/checkout');
  };

  return (
    <div className="section pd-page">
      <div className="container">
        <nav className="pd-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link> <FiChevronRight />
          <Link to="/products">Products</Link> <FiChevronRight />
          <span>{product.name}</span>
        </nav>

        <div className="pd-layout">
          {/* ---------- Image Gallery + Zoom ---------- */}
          <div className="pd-gallery">
            <div
              className="pd-main-img"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setZoom((z) => ({ ...z, active: false }))}
            >
              {discount > 0 && <span className="badge badge-discount pd-badge">{discount}% OFF</span>}
              <img src={gallery[activeImg]} alt={product.name} />
              {zoom.active && (
                <div
                  className="pd-zoom-lens"
                  style={{
                    backgroundImage: `url(${gallery[activeImg]})`,
                    backgroundPosition: `${zoom.x}% ${zoom.y}%`,
                  }}
                />
              )}
            </div>
            <div className="pd-thumbs">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  className={`pd-thumb ${activeImg === i ? 'active' : ''}`}
                  onClick={() => setActiveImg(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          </div>

          {/* ---------- Info ---------- */}
          <motion.div
            className="pd-info"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <p className="pc-brand">{product.brand}</p>
            <h1 className="pd-title">{product.name}</h1>

            <div className="pc-rating pd-rating">
              <FiStar className="star" />
              <span>{product.rating}</span>
              <span className="pc-reviews">({product.reviewsCount} reviews)</span>
            </div>

            <div className="pd-price-row">
              <span className="pd-price">₹{product.price}</span>
              {product.mrp && <span className="pc-mrp">₹{product.mrp}</span>}
              {discount > 0 && <span className="pd-discount-tag">{discount}% off</span>}
            </div>

            <p className="pd-desc">{product.description}</p>

            <div className="pd-meta-grid">
              <div><span>Flavour</span><strong>{product.flavor}</strong></div>
              <div><span>Category</span><strong>{formatLabel(product.category)}</strong></div>
              <div><span>Weight</span><strong>{product.weight || '500 g (approx.)'}</strong></div>
              <div><span>SKU</span><strong>{product.sku || product.id.toUpperCase()}</strong></div>
            </div>

            <div className="pd-stock-row">
              {outOfStock ? (
                <span className="pd-stock out"><FiXCircle /> Out of Stock</span>
              ) : lowStock ? (
                <span className="pd-stock low"><FiCheckCircle /> Only {product.stock} left — order soon</span>
              ) : (
                <span className="pd-stock in"><FiCheckCircle /> In Stock</span>
              )}
              <span className="pd-delivery"><FiTruck /> Delivery in {deliveryDays}-{deliveryDays + 2} days</span>
            </div>

            <div className="pd-qty-row">
              <div className="cart-qty pd-qty">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity"><FiMinus /></button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity"><FiPlus /></button>
              </div>

              <button
                className={`pd-wishlist-btn ${wishlisted ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
                aria-label="Toggle wishlist"
              >
                <FiHeart />
              </button>

              <button className="pd-share-btn" onClick={handleShare} aria-label="Share product">
                <FiShare2 />
              </button>
            </div>

            <div className="pd-actions">
              <button
                className="btn btn-outline pd-add-btn"
                disabled={outOfStock}
                onClick={() => addToCart(product, qty)}
              >
                <FiShoppingCart /> Add to Cart
              </button>
              <button
                className="btn btn-primary btn-ripple pd-buy-btn"
                disabled={outOfStock}
                onClick={handleBuyNow}
              >
                {outOfStock ? 'Notify Me' : 'Buy Now'}
              </button>
            </div>

            {(product.ingredients || product.nutrition) && (
              <div className="pd-extra">
                {product.ingredients && (
                  <div>
                    <h4>Ingredients</h4>
                    <p>{product.ingredients}</p>
                  </div>
                )}
                {product.nutrition && (
                  <div>
                    <h4>Nutrition</h4>
                    <p>{product.nutrition}</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>

        {related.length > 0 && (
          <section className="pd-related">
            <div className="section-head">
              <span className="eyebrow">You May Also Like</span>
              <h2 className="section-title">Related Products</h2>
            </div>
            <div className="products-grid">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}

        {recentlyViewed.length > 0 && (
          <section className="pd-related">
            <div className="section-head">
              <span className="eyebrow">Continue Browsing</span>
              <h2 className="section-title">Recently Viewed</h2>
            </div>
            <div className="products-grid">
              {recentlyViewed.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function formatLabel(slug = '') {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
