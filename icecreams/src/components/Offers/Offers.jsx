import { motion } from 'framer-motion';
import { offers } from '../../data/products';
import './offers.css';

export default function Offers() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Don't Miss Out</span>
          <h2 className="section-title">Today's Offers</h2>
          <p className="section-sub">Sweet deals updated daily, just for you.</p>
        </div>

        <div className="offers-grid">
          {offers.map((o, i) => (
            <motion.div
              key={o.id}
              className="offer-card"
              style={{ background: o.color }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -6, rotate: -1 }}
            >
              <span className="offer-icon">{o.icon}</span>
              <h3>{o.title}</h3>
              <p>{o.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
