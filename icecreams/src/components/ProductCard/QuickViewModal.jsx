import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiX, FiStar, FiShoppingCart, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

export default function QuickViewModal({ product, open, onClose }) {
  const { addToCart } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="qv-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="qv-panel"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="qv-close" onClick={onClose}><FiX /></button>
            <div className="qv-img">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="qv-info">
              <p className="pc-brand">{product.brand}</p>
              <h2>{product.name}</h2>
              <div className="pc-rating">
                <FiStar className="star" />
                <span>{product.rating}</span>
                <span className="pc-reviews">({product.reviewsCount} reviews)</span>
              </div>
              <p className="qv-desc">{product.description}</p>
              <div className="pc-price-row" style={{ margin: '14px 0' }}>
                <span className="pc-price" style={{ fontSize: 26 }}>₹{product.price}</span>
                {product.mrp && <span className="pc-mrp">₹{product.mrp}</span>}
              </div>
              <button className="btn btn-primary btn-ripple" style={{ width: '100%' }} onClick={() => { addToCart(product); onClose(); }}>
                <FiShoppingCart /> Add to Cart
              </button>
              <Link
                to={`/product/${product.id}`}
                className="btn btn-outline"
                style={{ width: '100%', marginTop: 10, justifyContent: 'center' }}
                onClick={onClose}
              >
                View Full Details <FiArrowRight />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
