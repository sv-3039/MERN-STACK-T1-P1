import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { products } from '../../data/products';
import './search.css';

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.flavor.toLowerCase().includes(q))
      .slice(0, 6);
  }, [query]);

  const handleSelect = (id) => {
    onClose();
    setQuery('');
    navigate(`/products?highlight=${id}`);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="search-panel"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="search-bar">
              <FiSearch className="search-bar-icon" />
              <input
                autoFocus
                type="text"
                placeholder="Search flavours, brands, cones, sundaes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="search-close" onClick={onClose} aria-label="Close search">
                <FiX />
              </button>
            </div>

            {query.trim() && (
              <div className="search-results">
                {results.length === 0 ? (
                  <p className="search-empty">No matches found for "{query}"</p>
                ) : (
                  results.map((r) => (
                    <button key={r.id} className="search-result-item" onClick={() => handleSelect(r.id)}>
                      <img src={r.image} alt={r.name} />
                      <div>
                        <p className="sr-name">{r.name}</p>
                        <p className="sr-meta">{r.brand} · ₹{r.price}</p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}

            {!query.trim() && (
              <div className="search-suggestions">
                <p className="ss-label">Popular searches</p>
                <div className="ss-chips">
                  {['Belgian Chocolate', 'Mango', 'Sundae', 'Kulfi', 'Oreo', 'Family Pack'].map((s) => (
                    <button key={s} onClick={() => setQuery(s)}>{s}</button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
