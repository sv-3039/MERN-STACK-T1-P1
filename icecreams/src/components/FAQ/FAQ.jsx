import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { faqs } from '../../data/products';
import './faq.css';

export default function FAQ() {
  const [openId, setOpenId] = useState(faqs[0]?.id);

  return (
    <section className="section faq-section">
      <div className="container faq-container">
        <div className="section-head" style={{ marginBottom: 32 }}>
          <span className="eyebrow">Need Help?</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>

        <div className="faq-list">
          {faqs.map((f) => {
            const isOpen = openId === f.id;
            return (
              <div className={`faq-item ${isOpen ? 'open' : ''}`} key={f.id}>
                <button className="faq-question" onClick={() => setOpenId(isOpen ? null : f.id)}>
                  <span>{f.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="faq-icon">
                    <FiPlus />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                    >
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
