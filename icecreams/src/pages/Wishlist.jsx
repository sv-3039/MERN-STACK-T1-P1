import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import PageHeader from '../components/common/PageHeader';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import './wishlist.css';

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <>
        <PageHeader eyebrow="Saved for Later" title="Your Wishlist" />
        <div className="empty-state">
          <FiHeart className="empty-icon" />
          <h3>Your wishlist is empty</h3>
          <p>Tap the heart icon on any product to save it here for later.</p>
          <Link to="/products" className="btn btn-primary btn-ripple">Browse Ice Creams</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Saved for Later" title="Your Wishlist" sub={`${items.length} item${items.length > 1 ? 's' : ''} saved`} />
      <section className="section">
        <div className="container">
          <div className="wishlist-grid">
            {items.map((p, i) => (
              <motion.div
                key={p.id}
                className="wishlist-card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <img src={p.image} alt={p.name} />
                <div className="wishlist-body">
                  <p className="pc-brand">{p.brand}</p>
                  <h4>{p.name}</h4>
                  <span className="pc-price">₹{p.price}</span>
                </div>
                <div className="wishlist-actions">
                  <button
                    className="btn btn-primary btn-ripple"
                    onClick={() => {
                      addToCart(p);
                      removeFromWishlist(p.id);
                    }}
                  >
                    <FiShoppingCart /> Move to Cart
                  </button>
                  <button className="wishlist-remove" onClick={() => removeFromWishlist(p.id)} aria-label="Remove">
                    <FiTrash2 />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
