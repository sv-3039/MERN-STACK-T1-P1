import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiHome, FiRefreshCw } from 'react-icons/fi';
import './notfound.css';

export default function ErrorPage({ error, onRetry }) {
  return (
    <div className="notfound">
      <motion.span
        className="notfound-emoji"
        animate={{ rotate: [0, -8, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      >
        <FiAlertTriangle />
      </motion.span>
      <h1>Something Melted</h1>
      <p>
        Sorry, something went wrong on our end.
        {import.meta.env?.DEV && error?.message ? ` (${error.message})` : ' Please try again.'}
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        {onRetry && (
          <button className="btn btn-primary btn-ripple" onClick={onRetry}>
            <FiRefreshCw /> Try Again
          </button>
        )}
        <Link to="/" className="btn btn-outline"><FiHome /> Back to Home</Link>
      </div>
    </div>
  );
}
