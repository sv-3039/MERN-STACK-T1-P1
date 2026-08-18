import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch, FiHeart, FiShoppingBag, FiSun, FiMoon, FiMenu, FiX, FiChevronDown, FiUser, FiLogOut, FiPackage,
} from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import SearchOverlay from '../Search/SearchOverlay';
import './navbar.css';

const links = [
  { to: '/', label: 'Home' },
  {
    to: '/products',
    label: 'Ice Creams',
    dropdown: [
      { to: '/products?category=sundaes', label: 'Sundaes' },
      { to: '/products?category=gelato', label: 'Gelato' },
      { to: '/products?category=kulfi', label: 'Kulfi' },
      { to: '/products?category=milkshakes', label: 'Milkshakes' },
    ],
  },
  { to: '/offers', label: 'Offers' },
  { to: '/combos', label: 'Combos' },
  { to: '/brands', label: 'Brands' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/admin', label: 'Admin' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { items: cartItems } = useCart();
  const { items: wishItems } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const initials = user
    ? user.name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
    : '';

  const handleLogout = () => {
    setUserMenuOpen(false);
    setMobileOpen(false);
    logout();
    navigate('/');
  };

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container navbar-inner">
          <Link to="/" className="navbar-logo" onClick={() => setMobileOpen(false)}>
            <span className="logo-scoop">🍦</span>
            <span className="logo-text">
              Scoop<span>&amp;Co.</span>
            </span>
          </Link>

          <nav className="navbar-links">
            {links.map((link) => (
              <div className="nav-item" key={link.label}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  {link.label}
                  {link.dropdown && <FiChevronDown className="chev" />}
                </NavLink>
                {link.dropdown && (
                  <div className="nav-dropdown">
                    {link.dropdown.map((d) => (
                      <Link key={d.label} to={d.to} className="nav-dropdown-item">
                        {d.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="navbar-actions">
            <button className="icon-btn" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <FiSearch />
            </button>
            <button className="icon-btn" aria-label="Toggle dark mode" onClick={toggleTheme}>
              {theme === 'light' ? <FiMoon /> : <FiSun />}
            </button>
            <button className="icon-btn" aria-label="Wishlist" onClick={() => navigate('/wishlist')}>
              <FiHeart />
              {wishItems.length > 0 && <span className="icon-badge">{wishItems.length}</span>}
            </button>
            <button className="icon-btn" aria-label="Cart" onClick={() => navigate('/cart')}>
              <FiShoppingBag />
              {cartCount > 0 && <span className="icon-badge">{cartCount}</span>}
            </button>
            {user ? (
              <div className="nav-item user-menu" ref={userMenuRef}>
                <button
                  className="user-avatar-btn"
                  onClick={() => setUserMenuOpen((s) => !s)}
                  aria-label="Account menu"
                >
                  {initials}
                </button>
                <div className={`nav-dropdown user-dropdown ${userMenuOpen ? 'force-open' : ''}`}>
                  <div className="user-dropdown-header">
                    <strong>{user.name}</strong>
                    <span>{user.email}</span>
                  </div>
                  <Link to="/account" className="nav-dropdown-item" onClick={() => setUserMenuOpen(false)}>
                    <FiPackage /> My Account
                  </Link>
                  <button className="nav-dropdown-item nav-dropdown-btn" onClick={handleLogout}>
                    <FiLogOut /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <button className="btn btn-primary btn-ripple login-btn" onClick={() => navigate('/login')}>
                <FiUser /> Login
              </button>
            )}

            <button className="icon-btn mobile-toggle" onClick={() => setMobileOpen((s) => !s)} aria-label="Menu">
              {mobileOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {links.map((link) => (
                <div key={link.label} className="mobile-nav-group">
                  <Link to={link.to} onClick={() => setMobileOpen(false)} className="mobile-nav-link">
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <div className="mobile-dropdown">
                      {link.dropdown.map((d) => (
                        <Link key={d.label} to={d.to} onClick={() => setMobileOpen(false)}>
                          {d.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {user ? (
                <div className="mobile-user-block">
                  <div className="mobile-user-info">
                    <span className="mobile-user-avatar">{initials}</span>
                    <div>
                      <strong>{user.name}</strong>
                      <span>{user.email}</span>
                    </div>
                  </div>
                  <Link
                    to="/account"
                    className="btn btn-outline"
                    style={{ width: '100%', marginTop: 10 }}
                    onClick={() => setMobileOpen(false)}
                  >
                    My Account
                  </Link>
                  <button className="btn btn-primary" style={{ width: '100%', marginTop: 10 }} onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: 12 }}
                  onClick={() => {
                    setMobileOpen(false);
                    navigate('/login');
                  }}
                >
                  Login
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
