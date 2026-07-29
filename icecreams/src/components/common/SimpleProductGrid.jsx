import { motion } from 'framer-motion';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import './simpleProductGrid.css';

export default function SimpleProductGrid({ eyebrow, title, sub, items, bg }) {
  const { addToCart } = useCart();

  return (
    <section className={`section ${bg ? 'spg-tinted' : ''}`}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="section-title">{title}</h2>
          {sub && <p className="section-sub">{sub}</p>}
        </div>

        <div className="spg-grid">
          {items.map((it, i) => (
            <motion.div
              key={it.id}
              className="spg-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              whileHover={{ y: -5 }}
            >
              <div className="spg-img">
                <img src={it.image} alt={it.name} loading="lazy" />
              </div>
              <div className="spg-body">
                <h4>{it.name}</h4>
                {it.size && <p className="spg-size">{it.size}</p>}
                <div className="pc-price-row">
                  <span className="pc-price">₹{it.price}</span>
                  {it.mrp && <span className="pc-mrp">₹{it.mrp}</span>}
                </div>
                <button className="btn btn-primary btn-ripple pc-add" onClick={() => addToCart(it)}>
                  <FiShoppingCart /> Add
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
