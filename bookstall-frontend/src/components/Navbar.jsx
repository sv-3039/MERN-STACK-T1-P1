import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaBook,
  FaHeart,
  FaShoppingCart,
  FaUserCircle,
  FaSearch,
} from "react-icons/fa";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";

function Navbar({ search, setSearch }) {
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { user, logout } = useContext(AuthContext);

  const totalCartItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalWishlistItems = wishlist.length;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand fw-bold fs-2" to="/">
          <FaBook className="text-warning me-2" />
          Book Stall
        </Link>

        {/* Search */}
        <form className="d-flex mx-auto" style={{ width: "45%" }}>
          <input
            type="search"
            className="form-control"
            placeholder="Search Books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="button" className="btn btn-warning ms-2">
            <FaSearch />
          </button>
        </form>

        {/* Right Side */}
        <div className="d-flex align-items-center gap-3">

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="btn btn-outline-light position-relative"
          >
            <FaHeart />

            {totalWishlistItems > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {totalWishlistItems}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="btn btn-outline-light position-relative"
          >
            <FaShoppingCart />

            {totalCartItems > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {totalCartItems}
              </span>
            )}
          </Link>

          {/* Login / Logout */}
          {user ? (
            <button
              className="btn btn-danger"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="btn btn-warning"
            >
              <FaUserCircle className="me-1" />
              Login
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;