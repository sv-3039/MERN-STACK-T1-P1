import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-col footer-brand-col">
            <div className="footer-brand">
              <span className="footer-logo">⌚</span>
              <span className="footer-brand-name">LUXE<span className="gold">WATCH</span></span>
            </div>
            <p className="footer-description">
              Curating the world's finest timepieces since 1852. 
              We bring you unparalleled craftsmanship and timeless elegance.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Instagram">📷</a>
              <a href="#" className="social-link" aria-label="Facebook">💬</a>
              <a href="#" className="social-link" aria-label="Twitter">🐦</a>
              <a href="#" className="social-link" aria-label="YouTube">▶️</a>
              <a href="#" className="social-link" aria-label="Pinterest">📌</a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">Men's Watches</a></li>
              <li><a href="#">Women's Watches</a></li>
              <li><a href="#">New Arrivals</a></li>
              <li><a href="#">Sale</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Customer Service</h4>
            <ul className="footer-links">
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Shipping & Returns</a></li>
              <li><a href="#">Warranty</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Size Guide</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Newsletter</h4>
            <p className="footer-newsletter-text">
              Subscribe to receive exclusive offers, early access to new collections, and watch care tips.
            </p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-btn">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 LuxeWatch. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

