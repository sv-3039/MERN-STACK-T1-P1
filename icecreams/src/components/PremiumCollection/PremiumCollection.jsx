import { motion } from 'framer-motion';
import { FiShoppingCart } from 'react-icons/fi';
import { premiumCollection } from '../../data/products';
import { useCart } from '../../context/CartContext';
import './premiumCollection.css';

export default function PremiumCollection() {
  const { addToCart } = useCart();

  return (
    <section className="section premium-section">
      <div className="premium-bg" />
      <div className="container">
        <div className="section-head" style={{ color: '#fff' }}>
          <span className="eyebrow premium-eyebrow">Gold Collection</span>
          <h2 className="section-title" style={{ color: '#fff' }}>Premium Collection</h2>
          <p className="section-sub" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Luxury flavours, imported ingredients, and chef-curated specials.
          </p>
        </div>

        <div className="premium-grid">
          {premiumCollection.map((p, i) => (
            <motion.div
              key={p.id}
              className="premium-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -8 }}
            >
              <div className="premium-img">
                <img src={p.image} alt={p.name} loading="lazy" />
                <span className="premium-tag">{p.tag}</span>
              </div>
              <div className="premium-body">
                <h4>{p.name}</h4>
                <div className="pc-price-row">
                  <span className="pc-price">₹{p.price}</span>
                </div>
                <button className="btn btn-primary btn-ripple pc-add" onClick={() => addToCart(p)}>
                  <FiShoppingCart /> Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
