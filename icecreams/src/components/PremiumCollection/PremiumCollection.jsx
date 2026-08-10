import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiZap } from 'react-icons/fi';
import { premiumCollection as fallbackCollection } from '../../data/products';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import './premiumCollection.css';

export default function PremiumCollection() {
  const { addToCart } = useCart();
  const { products } = useProducts();
  const navigate = useNavigate();

  const livePremium = products.filter(
    (p) => p.isPremium || p.category === 'premium'
  );

  // Use top 5 luxury existing catalog products with real ice cream photos
  const fallbackLuxuryIds = ['gl1', 'sd1', 'kl1', 'gl3', 'ms1'];
  const displayItems =
    livePremium.length >= 4
      ? livePremium.slice(0, 5)
      : products.filter((p) => fallbackLuxuryIds.includes(p.id));

  const tags = ['Gold Collection', 'Chef Special', 'Limited Edition', 'Imported', 'Gold Series'];

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
          {displayItems.map((p, i) => (
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
                <span className="premium-tag">{p.tag || tags[i % tags.length]}</span>
              </div>
              <div className="premium-body">
                <h4>{p.name}</h4>
                <div className="pc-price-row">
                  <span className="pc-price">₹{p.price}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8px', marginTop: 'auto' }}>
                  <button className="btn btn-outline" style={{ padding: '8px 4px', fontSize: '12.5px', justifyContent: 'center' }} onClick={() => addToCart(p)}>
                    <FiShoppingCart /> Add to Cart
                  </button>
                  <button
                    className="btn btn-primary btn-ripple"
                    style={{ padding: '8px 4px', fontSize: '12.5px', justifyContent: 'center' }}
                    onClick={() => {
                      addToCart(p);
                      navigate('/checkout');
                    }}
                  >
                    <FiZap /> Buy Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
