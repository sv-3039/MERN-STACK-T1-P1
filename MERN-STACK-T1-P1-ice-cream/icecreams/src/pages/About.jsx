import { motion } from 'framer-motion';
import { FiHeart, FiClock, FiAward, FiSmile } from 'react-icons/fi';
import PageHeader from '../components/common/PageHeader';
import Reviews from '../components/Reviews/Reviews';
import './about.css';

const values = [
  { icon: <FiHeart />, title: 'Made with Love', desc: 'Every scoop is churned with care by our partner brands, never rushed.' },
  { icon: <FiClock />, title: 'Counter Express', desc: 'Freshly served at our Mall Counter in 5-10 minutes, always perfectly frozen.' },
  { icon: <FiAward />, title: 'Premium Quality', desc: 'We partner only with India\'s most trusted and awarded ice cream brands.' },
  { icon: <FiSmile />, title: 'Customer First', desc: '50,000+ happy mall visitors and counting, with a 4.8★ average rating.' },
];

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title="About Scoop & Co."
        sub="A premium ice cream destination bringing India's favourite brands under one roof."
      />

      <section className="section about-story">
        <div className="container about-story-inner">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow">Since 2015</span>
            <h2 className="section-title">A scoop shop with mall-sized ambition</h2>
            <p className="about-text">
              Scoop &amp; Co. started as a flagship counter inside the shopping mall food court, built on a simple
              idea: give shoppers access to every great ice cream brand in one place, without compromise.
            </p>
            <p className="about-text">
              Today, we curate 70+ authentic flavours across cups, cones, sundaes, gelato, kulfi, and family packs from
              ten of India's most loved brands — served fresh, chilled, and always with a smile at our Mall Counter.
            </p>
          </motion.div>
          <motion.img
            src="https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=700&q=80"
            alt="Ice cream store interior"
            className="about-img"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </section>

      <section className="section about-values">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Why Choose Us</span>
            <h2 className="section-title">What We Stand For</h2>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className="value-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="value-icon">{v.icon}</div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Reviews />
    </>
  );
}
