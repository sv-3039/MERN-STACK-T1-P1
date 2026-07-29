import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import './footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="navbar-logo">
            <span className="logo-scoop">🍦</span>
            <span className="logo-text">Scoop<span>&amp;Co.</span></span>
          </Link>
          <p>Premium ice creams, sundaes, gelatos and family packs from India's most loved brands — delivered fresh, every day.</p>
          <div className="footer-social">
            <a href="#" aria-label="Instagram"><FiInstagram /></a>
            <a href="#" aria-label="Facebook"><FiFacebook /></a>
            <a href="#" aria-label="Twitter"><FiTwitter /></a>
            <a href="#" aria-label="YouTube"><FiYoutube /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <Link to="/products">Ice Creams</Link>
          <Link to="/offers">Offers</Link>
          <Link to="/combos">Combos</Link>
          <Link to="/brands">Brands</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-col">
          <h4>Customer Support</h4>
          <a href="#">Track Order</a>
          <a href="#">Returns &amp; Refunds</a>
          <a href="#">Shipping Info</a>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">My Cart</Link>
        </div>

        <div className="footer-col">
          <h4>Store Locations</h4>
          <p className="footer-contact"><FiMapPin /> Lulu Mall, Hyderabad, Telangana</p>
          <p className="footer-contact"><FiPhone /> +91 98765 43210</p>
          <p className="footer-contact"><FiMail /> hello@scoopandco.in</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} Scoop &amp; Co. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
