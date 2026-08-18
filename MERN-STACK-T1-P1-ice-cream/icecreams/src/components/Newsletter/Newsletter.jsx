import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';
import { useToast } from '../../context/ToastContext';
import './newsletter.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    showToast('Subscribed! Check your inbox for sweet deals.', 'success');
    setEmail('');
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <motion.div
          className="newsletter-box"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2>Get 15% off your first order</h2>
            <p>Subscribe for new flavour drops, exclusive offers, and store news.</p>
          </div>
          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-ripple">
              Subscribe <FiSend />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
