import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

export default function Navbar({ onCartToggle, onCategoryChange, activeCategory }) {
  const { totalItems } = useCart();
  const { brightMode, toggleBrightMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onCategoryChange('all');
    setSearchQuery('');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="navbar-logo">⌚</span>
          <span className="navbar-brand-name">LUXE<span className="gold">WATCH</span></span>
        </div>

        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
        </button>

        <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <li>
            <button
              className={`nav-link ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => { onCategoryChange('all'); setMenuOpen(false); }}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${activeCategory === 'men' ? 'active' : ''}`}
              onClick={() => { onCategoryChange('men'); setMenuOpen(false); }}
            >
              Men
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${activeCategory === 'women' ? 'active' : ''}`}
              onClick={() => { onCategoryChange('women'); setMenuOpen(false); }}
            >
              Women
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${activeCategory === 'brands' ? 'active' : ''}`}
              onClick={() => { onCategoryChange('brands'); setMenuOpen(false); }}
            >
              Brands
            </button>
          </li>
        </ul>

        <div className="navbar-actions">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search watches..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-btn" aria-label="Search">
              🔍
            </button>
          </form>
          <button
            className="theme-toggle-btn"
            onClick={toggleBrightMode}
            aria-label="Toggle brightness"
            title={brightMode ? 'Switch to dark mode' : 'Switch to bright mode'}
          >
            {brightMode ? '🌙' : '☀️'}
          </button>
          <button className="cart-btn" onClick={onCartToggle} aria-label="Open cart">
            🛒
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}
