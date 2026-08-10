import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiEye, FiShoppingCart, FiStar, FiZap } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import QuickViewModal from './QuickViewModal';
import './productCard.css';

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [quickView, setQuickView] = useState(false);
  const navigate = useNavigate();

  const wishlisted = isWishlisted(product.id);
  const outOfStock = product.stock === 0;
  const discount = product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;

  const handleBuyNow = (e) => {
    e.stopPropagation();
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <>
      <motion.div
        className="product-card"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.4, delay: (index % 8) * 0.04 }}
        whileHover={{ y: -6 }}
      >
        <div className="pc-img-wrap">
          {product.isNew && <span className="badge badge-new">New</span>}
          {product.isBestseller && !product.isNew && <span className="badge badge-best">Bestseller</span>}
          {discount > 0 && <span className="badge badge-discount">{discount}% OFF</span>}

          <Link to={`/product/${product.id}`} className="pc-img-link">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80';
              }}
            />
          </Link>

          {outOfStock && <div className="pc-oos">Out of Stock</div>}

          <button
            className={`pc-fav ${wishlisted ? 'active' : ''}`}
            onClick={() => toggleWishlist(product)}
            aria-label="Add to wishlist"
          >
            <FiHeart />
          </button>

          <button className="pc-quickview" onClick={() => setQuickView(true)}>
            <FiEye /> Quick View
          </button>
        </div>

        <div className="pc-body">
          <p className="pc-brand">{product.brand}</p>
          <Link to={`/product/${product.id}`} className="pc-name-link">
            <h3 className="pc-name">{product.name}</h3>
          </Link>

          <div className="pc-rating">
            <FiStar className="star" />
            <span>{product.rating}</span>
            <span className="pc-reviews">({product.reviewsCount})</span>
          </div>

          <div className="pc-price-row">
            <span className="pc-price">₹{product.price}</span>
            {product.mrp > product.price && <span className="pc-mrp">₹{product.mrp}</span>}
          </div>

          <div className="pc-btn-group">
            <button
              className="btn btn-primary btn-ripple pc-add"
              disabled={outOfStock}
              onClick={() => addToCart(product)}
            >
              <FiShoppingCart /> {outOfStock ? 'Notify Me' : 'Add to Cart'}
            </button>

            {!outOfStock && (
              <button
                className="btn pc-buy btn-ripple"
                onClick={handleBuyNow}
              >
                <FiZap /> Buy Now
              </button>
            )}
          </div>
        </div>
      </motion.div>

      <QuickViewModal product={product} open={quickView} onClose={() => setQuickView(false)} />
    </>
  );
}
