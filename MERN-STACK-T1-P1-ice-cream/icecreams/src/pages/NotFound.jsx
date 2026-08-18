import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome } from 'react-icons/fi';
import './notfound.css';

export default function NotFound() {
  return (
    <div className="notfound">
      <motion.span
        className="notfound-emoji"
        animate={{ rotate: [0, -8, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      >
        🍦
      </motion.span>
      <h1>404</h1>
      <p>Oops! This scoop melted away. The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary btn-ripple"><FiHome /> Back to Home</Link>
    </div>
  );
}
