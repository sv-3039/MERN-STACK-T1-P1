import { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import {
  FaShoppingCart,
  FaHeart,
  FaBook,
  FaCog,
  FaSignOutAlt,
  FaBoxOpen,
  FaUserCircle,
  FaGift,
  FaStar,
  FaMapMarkerAlt,
  FaCreditCard,
  FaHistory,
} from "react-icons/fa";

import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

const defaultAvatar =
  "https://cdn-icons-png.flaticon.com/512/847/847969.png";
  
function Profile() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const totalCartItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div
      className="container-fluid py-5"
      style={{
        background: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      <div className="container">

        {/* Profile Header */}

        <div
          className="card border-0 shadow-lg mb-5"
          style={{
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >

          <div
            className="text-center text-white p-5"
            style={{
              background:
                "linear-gradient(135deg,#0d6efd,#6610f2)",
            }}
          >

            <img
  src={user?.profileImage || defaultAvatar}
  alt="Profile"
  className="rounded-circle border border-4 border-white shadow"
  width="140"
  height="140"
/>

            <h2 className="mt-4 fw-bold">
              {user.name}
            </h2>

            <p className="fs-5">
              {user.email}
            </p>

            <span className="badge bg-warning text-dark fs-6 px-4 py-2">
              ⭐ Gold Member
            </span>

          </div>

          <div className="card-body">

            <div className="row text-center py-3">

              <div className="col-md-3">
                <FaUserCircle
                  className="text-primary mb-2"
                  size={35}
                />
                <h6>Name</h6>
                <strong>{user.name}</strong>
              </div>

              <div className="col-md-3">
                <FaMapMarkerAlt
                  className="text-danger mb-2"
                  size={35}
                />
                <h6>Location</h6>
                <strong>India</strong>
              </div>

              <div className="col-md-3">
                <FaGift
                  className="text-success mb-2"
                  size={35}
                />
                <h6>Membership</h6>
                <strong>Premium</strong>
              </div>

              <div className="col-md-3">
                <FaStar
                  className="text-warning mb-2"
                  size={35}
                />
                <h6>Reward Points</h6>
                <strong>1250</strong>
              </div>

            </div>

            <hr />



<h3 className="fw-bold mb-4">
  Quick Actions
</h3>

<div className="row g-4 mb-5">

  {/* Home */}

  <div className="col-md-4">
    <Link to="/" className="text-decoration-none text-dark">
      <div className="card border-0 shadow h-100 text-center">
        <div className="card-body">

          <FaBook
            size={40}
            className="text-primary mb-3"
          />

          <h5>Continue Shopping</h5>

          <p className="text-muted">
            Explore all books
          </p>

        </div>
      </div>
    </Link>
  </div>

  {/* Wishlist */}

  <div className="col-md-4">
    <Link
      to="/wishlist"
      className="text-decoration-none text-dark"
    >
      <div className="card border-0 shadow h-100 text-center">
        <div className="card-body">

          <FaHeart
            size={40}
            className="text-danger mb-3"
          />

          <h5>My Wishlist</h5>

          <p className="text-muted">
            Favourite books
          </p>

        </div>
      </div>
    </Link>
  </div>

  {/* Cart */}

  <div className="col-md-4">
    <Link
      to="/cart"
      className="text-decoration-none text-dark"
    >
      <div className="card border-0 shadow h-100 text-center">
        <div className="card-body">

          <FaShoppingCart
            size={40}
            className="text-success mb-3"
          />

          <h5>My Cart</h5>

          <p className="text-muted">
            Checkout your books
          </p>

        </div>
      </div>
    </Link>
  </div>

  {/* Settings */}

  <div className="col-md-4">
    <Link
      to="/settings"
      className="text-decoration-none text-dark"
    >
      <div className="card border-0 shadow h-100 text-center">
        <div className="card-body">

          <FaCog
            size={40}
            className="text-secondary mb-3"
          />

          <h5>Settings</h5>

          <p className="text-muted">
            Update account settings
          </p>

        </div>
      </div>
    </Link>
  </div>

  {/* Orders */}

  <div className="col-md-4">
    <Link
      to="/orders"
      className="text-decoration-none text-dark"
    >
      <div className="card border-0 shadow h-100 text-center">
        <div className="card-body">

          <FaBoxOpen
            size={40}
            className="text-primary mb-3"
          />

          <h5>My Orders</h5>

          <p className="text-muted">
            View purchase history
          </p>

        </div>
      </div>
    </Link>
  </div>

  {/* Membership */}

  <div className="col-md-4">
    <div className="card border-0 shadow h-100 text-center">
      <div className="card-body">

        <FaGift
          size={40}
          className="text-warning mb-3"
        />

        <h5>Premium Member</h5>

        <p className="text-muted">
          Gold Membership Active
        </p>

      </div>
    </div>
  </div>

</div>

<hr className="my-5" />

<h3 className="fw-bold mb-4">
  Recent Activity
</h3>

<div className="card border-0 shadow mb-5">
  <div className="card-body">

    <ul className="list-group list-group-flush">

      <li className="list-group-item">
        📖 Viewed <strong>The Alchemist</strong>
      </li>

      <li className="list-group-item">
        ❤️ Added <strong>Atomic Habits</strong> to Wishlist
      </li>

      <li className="list-group-item">
        🛒 Added <strong>Rich Dad Poor Dad</strong> to Cart
      </li>

      <li className="list-group-item">
        📦 Purchased <strong>Harry Potter</strong>
      </li>

      <li className="list-group-item">
        ⭐ Rated <strong>Ikigai</strong> (5/5)
      </li>

    </ul>

  </div>
</div>

{/* Account Information */}

<h3 className="fw-bold mb-4">
  Account Information
</h3>

<div className="card border-0 shadow mb-5">

  <div className="card-body">

    <div className="row">

      <div className="col-md-6 mb-4">
        <h6 className="text-muted">
          Full Name
        </h6>

        <h5>{user.name}</h5>
      </div>

      <div className="col-md-6 mb-4">
        <h6 className="text-muted">
          Email
        </h6>

        <h5>{user.email}</h5>
      </div>

      <div className="col-md-6 mb-4">
        <h6 className="text-muted">
          Membership
        </h6>

        <span className="badge bg-success fs-6">
          Premium Gold
        </span>
      </div>

      <div className="col-md-6 mb-4">
        <h6 className="text-muted">
          Account Status
        </h6>

        <span className="badge bg-primary fs-6">
          Active
        </span>
      </div>

    </div>

  </div>

</div>

{/* Reading Statistics */}

<h3 className="fw-bold mb-4">
  Reading Statistics
</h3>

<div className="row g-4 mb-5">

  <div className="col-md-3">
    <div className="card shadow border-0 text-center h-100">
      <div className="card-body">

        <h2 className="text-primary">
          39
        </h2>

        <p className="mb-0">
          Books Read
        </p>

      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card shadow border-0 text-center h-100">
      <div className="card-body">

        <h2 className="text-success">
          12
        </h2>

        <p className="mb-0">
          Orders
        </p>

      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card shadow border-0 text-center h-100">
      <div className="card-body">

        <h2 className="text-danger">
          {wishlist.length}
        </h2>

        <p className="mb-0">
          Wishlist Books
        </p>

      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card shadow border-0 text-center h-100">
      <div className="card-body">

        <h2 className="text-warning">
          {totalCartItems}
        </h2>

        <p className="mb-0">
          Cart Items
        </p>

      </div>
    </div>
  </div>

</div>

<hr className="my-5" />

<div className="text-center mb-5">

  <button
    className="btn btn-danger btn-lg px-5"
    onClick={logout}
  >
    <FaSignOutAlt className="me-2" />
    Logout
  </button>

</div>

<hr />

{/* Footer */}

<div className="text-center py-3">

  <p className="text-muted mb-1">
    📚 Book Stall Management System
  </p>

  <small className="text-secondary">
    Thank you for being a valued reader ❤️
  </small>

</div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
