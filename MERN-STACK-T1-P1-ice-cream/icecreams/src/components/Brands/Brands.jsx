import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { brands, products } from '../../data/products';
import './brands.css';

export default function Brands() {
  const navigate = useNavigate();

  return (
    <section className="section brands-section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Trusted Partners</span>
          <h2 className="section-title">Our Brands</h2>
          <p className="section-sub">Ten iconic ice cream brands, all under one roof. Tap any brand to view its authentic products & prices.</p>
        </div>

        <div className="brands-grid">
          {brands.map((b, i) => {
            const count = products.filter((p) => p.brandId === b.id).length;
            return (
              <motion.button
                key={b.id}
                type="button"
                className="brand-card"
                onClick={() => navigate(`/products?brand=${b.id}`)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                whileHover={{ y: -6, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="brand-logo-wrap">
                  {b.image ? (
                    <img src={b.image} alt={b.name} className="brand-logo-img" />
                  ) : (
                    <div className="brand-mark" style={{ background: b.color }}>
                      {b.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h4>{b.name}</h4>
                <p className="brand-tagline">{b.tagline}</p>
                <span className="brand-count-badge">{count} Products</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

