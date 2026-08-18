import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiSearch, FiX, FiClock, FiTrendingUp, FiSearch as FiEmptySearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { products } from '../../data/products';
import useDebounce from '../../hooks/useDebounce';
import './search.css';

const HISTORY_KEY = 'scoopco_search_history';
const TRENDING_SEARCHES = ['Belgian Chocolate', 'Mango', 'Sundae', 'Kulfi', 'Oreo', 'Family Pack'];
const MAX_HISTORY = 6;

function loadHistory() {
  try {
    const saved = localStorage.getItem(HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState(loadHistory);
  const debouncedQuery = useDebounce(query, 300);
  const navigate = useNavigate();

  // Reset the field each time the overlay opens fresh.
  useEffect(() => {
    if (open) setQuery('');
  }, [open]);

  const results = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.flavor.toLowerCase().includes(q))
      .slice(0, 6);
  }, [debouncedQuery]);

  const saveToHistory = (term) => {
    if (!term.trim()) return;
    setHistory((prev) => {
      const next = [term, ...prev.filter((h) => h.toLowerCase() !== term.toLowerCase())].slice(0, MAX_HISTORY);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      return next;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  const handleSelect = (id, term) => {
    saveToHistory(term);
    onClose();
    setQuery('');
    navigate(`/product/${id}`);
  };

  const handleViewAll = () => {
    if (!debouncedQuery.trim()) return;
    saveToHistory(debouncedQuery.trim());
    onClose();
    navigate(`/products?search=${encodeURIComponent(debouncedQuery.trim())}`);
  };

  const isTyping = query !== debouncedQuery && query.trim();

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
                onKeyDown={(e) => e.key === 'Enter' && handleViewAll()}
              />
              <button className="search-close" onClick={onClose} aria-label="Close search">
                <FiX />
              </button>
            </div>

            {debouncedQuery.trim() && (
              <div className="search-results">
                {isTyping ? (
                  <div className="search-loading">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="search-result-skeleton" />
                    ))}
                  </div>
                ) : results.length === 0 ? (
                  <div className="search-empty-state">
                    <FiEmptySearch className="search-empty-icon" />
                    <p className="search-empty">No results found for &ldquo;{debouncedQuery}&rdquo;</p>
                    <p className="search-empty-hint">Try a different flavour, brand, or category.</p>
                  </div>
                ) : (
                  <>
                    {results.map((r) => (
                      <button key={r.id} className="search-result-item" onClick={() => handleSelect(r.id, query)}>
                        <img src={r.image} alt={r.name} />
                        <div>
                          <p className="sr-name">{r.name}</p>
                          <p className="sr-meta">{r.brand} · ₹{r.price}</p>
                        </div>
                      </button>
                    ))}
                    <button className="search-view-all" onClick={handleViewAll}>
                      View all results for &ldquo;{debouncedQuery}&rdquo;
                    </button>
                  </>
                )}
              </div>
            )}

            {!debouncedQuery.trim() && (
              <div className="search-suggestions">
                {history.length > 0 && (
                  <div className="ss-block">
                    <div className="ss-block-head">
                      <p className="ss-label"><FiClock /> Recent Searches</p>
                      <button className="ss-clear" onClick={clearHistory}>Clear</button>
                    </div>
                    <div className="ss-chips">
                      {history.map((s) => (
                        <button key={s} onClick={() => setQuery(s)}>{s}</button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="ss-block">
                  <p className="ss-label"><FiTrendingUp /> Trending Searches</p>
                  <div className="ss-chips">
                    {TRENDING_SEARCHES.map((s) => (
                      <button key={s} onClick={() => setQuery(s)}>{s}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
