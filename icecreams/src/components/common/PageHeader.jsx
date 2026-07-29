import { motion } from 'framer-motion';
import './pageHeader.css';

export default function PageHeader({ eyebrow, title, sub }) {
  return (
    <div className="page-header">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1>{title}</h1>
          {sub && <p>{sub}</p>}
        </motion.div>
      </div>
    </div>
  );
}
