import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Brand Section */}
        <div className="footer-section brand-section">
          <h2>💄 Radha Beauty Co</h2>
          <p>
            Your ultimate destination for all things beauty. We provide the best cosmetics from top brands to help you shine every day.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Offers & Discounts</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h3>Top Categories</h3>
          <ul>
            <li><a href="#face-makeup">Face Makeup</a></li>
            <li><a href="#lip-products">Lip Products</a></li>
            <li><a href="#skincare">Skincare</a></li>
            <li><a href="#fragrance">Fragrances</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div className="footer-section">
          <h3>Connect With Us</h3>
          <p>Email: support@glambeauty.com</p>
          <p>Phone: +91 98765 43210</p>
          <div className="social-icons">
            <a href="#">🌐</a>
            <a href="#">📸</a>
            <a href="#">🐦</a>
            <a href="#">📘</a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Radha Beauty Co. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;