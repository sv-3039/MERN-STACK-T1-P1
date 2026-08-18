import { motion } from 'framer-motion';
import PageHeader from '../components/common/PageHeader';
import { offers } from '../data/products';

export default function OffersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sweet Deals"
        title="Today's Offers"
        sub="Every deal we've got running right now, updated daily."
      />
      <section className="section">
        <div className="container">
          <div className="offers-grid">
            {offers.map((o, i) => (
              <motion.div
                key={o.id}
                className="offer-card"
                style={{ background: o.color }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                whileHover={{ y: -6 }}
              >
                <span className="offer-icon">{o.icon}</span>
                <h3>{o.title}</h3>
                <p>{o.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
