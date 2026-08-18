import { useState } from "react";
import "./Navbar.css";

function Navbar({ cart, setShowCart, setShowAbout, setShowOffers }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const goHome = (e) => {
    e.preventDefault();
    setShowCart(false);
    setShowAbout(false);
    setShowOffers(false);
  };

  const goAbout = (e) => {
    e.preventDefault();
    setShowCart(false);
    setShowAbout(true);
    setShowOffers(false);
  };

  // NEW FUNCTION: This ensures we go to the home view, but ALLOWS the browser to scroll down to the ID
  const handleCategoryClick = () => {
    setShowCart(false);
    setShowAbout(false);
    setShowOffers(false);
    setShowDropdown(false); // Closes the menu after clicking
  };

  // NEW FUNCTION: Opens the Offers page
  const goOffers = (e) => {
    e.preventDefault();
    setShowCart(false);
    setShowAbout(false);
    setShowOffers(true);
  };

  return (
    <nav className="navbar">
      <div className="logo">💄</div>
      <div className="website-name">Radha Beauty Co</div>

      <ul className="nav-links">
        <li><a href="#" onClick={goHome}>Home</a></li>
        
        <li 
          className="dropdown"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
          onClick={() => setShowDropdown(!showDropdown)} // Allows clicking to open/close
        >
          {/* Removed href="#" so it doesn't jump to the top of the page when clicked */}
          <a style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            Categories <span>▼</span>
          </a>
          
          {showDropdown && (
            <ul className="dropdown-menu">
              <li><a href="#face-makeup" onClick={handleCategoryClick}>Face Makeup</a></li>
              <li><a href="#eye-makeup" onClick={handleCategoryClick}>Eye Makeup</a></li>
              <li><a href="#lip-products" onClick={handleCategoryClick}>Lip Products</a></li>
              <li><a href="#skincare" onClick={handleCategoryClick}>Skincare</a></li>
              <li><a href="#nail-care" onClick={handleCategoryClick}>Nail Care</a></li>
              <li><a href="#fragrance" onClick={handleCategoryClick}>Fragrances</a></li>
            </ul>
          )}
        </li>

        <li><a href="#" onClick={goOffers}>Offers</a></li>
        <li><a href="#" onClick={goAbout}>About</a></li>
      </ul>

      <div className="cart" onClick={() => { setShowCart(true); setShowAbout(false); setShowOffers(false); }}>
        🛒 Cart ({totalItems})
      </div>
    </nav>
  );
}

export default Navbar;