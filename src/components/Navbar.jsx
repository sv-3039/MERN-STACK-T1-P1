import React from "react";
import { Link } from "react-router-dom";
import "./../App.css";

function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="logo">
        <i className="fa-solid fa-table-tennis-paddle-ball"></i> Sports
      </Link>

      {/* Navigation Links */}
      <ul className="nav_link">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/indoor-games">Indoor Games</Link>
        </li>

        <li>
          <Link to="/outdoor-games">Outdoor Games</Link>
        </li>
      </ul>

      {/* Right Side Buttons */}
      <div className="button">
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;