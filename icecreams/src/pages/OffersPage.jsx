import { motion } from 'framer-motion';
import PageHeader from '../components/common/PageHeader';
import { offers } from '../data/products';

export default function OffersPage() {
  const triggerSpin = () => {
    window.dispatchEvent(new Event('open-spin-wheel'));
  };

  return (
    <>
      <PageHeader
        eyebrow="Sweet Deals"
        title="Today's Offers"
        sub="Every deal we've got running right now, updated daily."
      />
      <section className="section">
        <div className="container">
          {/* Giant Interactive Spin the Wheel Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, #7a1f2b 0%, #c74163 100%)',
              color: '#ffffff',
              borderRadius: '24px',
              padding: '36px 32px',
              textAlign: 'center',
              marginBottom: '40px',
              boxShadow: '0 12px 36px rgba(122, 31, 43, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <span style={{ fontSize: '48px' }}>🎰</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', margin: 0, color: '#fff' }}>
              Spin the Lucky Wheel &amp; Win Instant Coupons!
            </h2>
            <p style={{ maxWidth: '580px', fontSize: '15px', color: 'rgba(255,255,255,0.9)', margin: 0 }}>
              Spin our Lulu Mall Express wheel to win up to 20% OFF, ₹100 Family Pack discounts, or free toppings!
            </p>
            <button
              onClick={triggerSpin}
              className="btn btn-ripple"
              style={{
                background: '#ffffff',
                color: '#7a1f2b',
                fontWeight: 800,
                fontSize: '16px',
                padding: '14px 32px',
                borderRadius: '30px',
                border: 'none',
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                cursor: 'pointer',
                marginTop: '8px',
              }}
            >
              🎰 CLICK HERE TO SPIN WHEEL NOW
            </button>
          </div>

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
