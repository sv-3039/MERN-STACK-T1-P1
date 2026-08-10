import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiZap } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import './comboOffers.css';

export default function ComboOffers() {
  const { addToCart } = useCart();
  const { combos } = useProducts();
  const navigate = useNavigate();

  return (
    <section className="section combo-section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Better Together</span>
          <h2 className="section-title">Combo Offers</h2>
          <p className="section-sub">Curated combos for every occasion, from date nights to festivals.</p>
        </div>

        <div className="combo-grid">
          {combos.map((c, i) => {
            const discount = Math.round(((c.mrp - c.price) / c.mrp) * 100);
            return (
              <motion.div
                key={c.id}
                className="combo-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
              >
                <div className="combo-img">
                  <img src={c.image} alt={c.name} loading="lazy" />
                  <span className="badge badge-discount">{discount}% OFF</span>
                </div>
                <div className="combo-body">
                  <span className="combo-tag">{c.tag}</span>
                  <h3>{c.name}</h3>
                  <div className="pc-price-row">
                    <span className="pc-price">₹{c.price}</span>
                    <span className="pc-mrp">₹{c.mrp}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8px', marginTop: 'auto' }}>
                    <button
                      className="btn btn-outline"
                      style={{ padding: '9px 6px', fontSize: '13px', justifyContent: 'center' }}
                      onClick={() => addToCart({ id: c.id, name: c.name, price: c.price, image: c.image, brand: 'Combo' })}
                    >
                      <FiShoppingCart /> Add Combo
                    </button>
                    <button
                      className="btn btn-primary btn-ripple"
                      style={{ padding: '9px 6px', fontSize: '13px', justifyContent: 'center' }}
                      onClick={() => {
                        addToCart({ id: c.id, name: c.name, price: c.price, image: c.image, brand: 'Combo' });
                        navigate('/checkout');
                      }}
                    >
                      <FiZap /> Buy Now
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
