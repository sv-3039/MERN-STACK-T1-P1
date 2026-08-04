import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiTag } from 'react-icons/fi';
import heroImg from '../../assets/hero.jpg';
import './hero.css';

const floaters = [
  { emoji: '🍦', top: '12%', left: '6%', size: 46, delay: 0 },
  { emoji: '🍨', top: '68%', left: '10%', size: 38, delay: 0.6 },
  { emoji: '🍧', top: '22%', left: '90%', size: 44, delay: 0.3 },
  { emoji: '🍫', top: '78%', left: '88%', size: 34, delay: 0.9 },
  { emoji: '🍓', top: '48%', left: '4%', size: 30, delay: 1.2 },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-blob hero-blob-1" />
      <div className="hero-blob hero-blob-2" />

      {floaters.map((f, i) => (
        <motion.span
          key={i}
          className="hero-float"
          style={{ top: f.top, left: f.left, fontSize: f.size }}
          animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: f.delay, ease: 'easeInOut' }}
        >
          {f.emoji}
        </motion.span>
      ))}

      <div className="container hero-inner">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow"><FiTag /> Freshly Churned Daily</span>
          <h1 className="hero-title">
            Experience Happiness in <span>Every Scoop</span>
          </h1>
          <p className="hero-sub">
            Premium Ice Creams, Sundaes, Gelatos &amp; Family Packs — crafted by India's
            most loved brands, delivered straight to your door.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary btn-ripple">
              Shop Now <FiArrowRight />
            </Link>
            <Link to="/offers" className="btn btn-outline">
              Explore Offers
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <strong>10+</strong>
              <span>Premium Brands</span>
            </div>
            <div>
              <strong>40+</strong>
              <span>Flavours</span>
            </div>
            <div>
              <strong>4.8★</strong>
              <span>Customer Rating</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="hero-visual-glow" />
          <img
            src={heroImg}
            alt="Premium ice cream cones"
          />
          <motion.div
            className="hero-float-card"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🔥 500+ orders today
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
