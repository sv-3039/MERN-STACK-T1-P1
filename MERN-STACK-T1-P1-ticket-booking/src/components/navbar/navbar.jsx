import "./navbar.css";
import { Link } from "react-router-dom";
import { FaSearch, FaUserCircle, FaFilm } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <FaFilm className="logo-icon" />
        <span>Mall Movies</span>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/bookings">My Bookings</Link>
        </li>
      </ul>

      <div className="nav-icons">
        <FaSearch className="icon" />
        <FaUserCircle className="icon" />
      </div>
    </nav>
  );
}

export default Navbar;