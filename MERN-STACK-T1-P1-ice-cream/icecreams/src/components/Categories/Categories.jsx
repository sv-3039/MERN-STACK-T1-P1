import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { categories } from '../../data/products';
import './categories.css';

export default function Categories() {
  const navigate = useNavigate();

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Browse</span>
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-sub">From classic cups to gourmet gelato — find exactly what you're craving.</p>
        </div>

        <div className="category-grid">
          {categories.map((c, i) => (
            <motion.button
              key={c.id}
              className="category-card"
              onClick={() => navigate(`/products?category=${c.id}`)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              whileHover={{ y: -6 }}
            >
              <div className="category-img-wrap">
                <img src={c.image} alt={c.name} loading="lazy" />
                <span className="category-icon">{c.icon}</span>
              </div>
              <p>{c.name}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
