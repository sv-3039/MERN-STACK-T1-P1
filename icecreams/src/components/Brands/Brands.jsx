import { motion } from 'framer-motion';
import { brands } from '../../data/products';
import './brands.css';

export default function Brands() {
  return (
    <section className="section brands-section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Trusted Partners</span>
          <h2 className="section-title">Our Brands</h2>
          <p className="section-sub">Ten iconic ice cream brands, all under one roof.</p>
        </div>

        <div className="brands-grid">
          {brands.map((b, i) => (
            <motion.div
              key={b.id}
              className="brand-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              whileHover={{ y: -5, scale: 1.03 }}
            >
              <div className="brand-mark" style={{ background: b.color }}>
                {b.name.charAt(0)}
              </div>
              <h4>{b.name}</h4>
              <p>{b.tagline}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
