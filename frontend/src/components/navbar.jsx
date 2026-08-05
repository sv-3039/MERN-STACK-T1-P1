import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ cart, removeFromCart }) {
  const [showCart, setShowCart] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">

        <div className="logo">
          👜 <span>Mall Store</span>
        </div>

        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/">Bags</Link>
          </li>

          <li>
            <Link to="/">New Arrivals</Link>
          </li>

          <li>
            <Link to="/">Contact</Link>
          </li>
          <li>
  <Link to="/orders">Orders</Link>
</li>     
        </ul>

        <div className="nav-icons">

          <span className="icon">❤️</span>

          <span
            className="icon cart-icon"
            onClick={() => setShowCart(!showCart)}
          >
            🛒

            {cart.length > 0 && (
              <span className="cart-badge">
                {cart.length}
              </span>
            )}
          </span>

          {user ? (
            <>
              <span
                style={{
                  fontWeight: "bold",
                  color: "#4b2e2e",
                }}
              >
                👋 {user.name}
              </span>

              <button
                className="login-btn"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="login-btn">
                  Login
                </button>
              </Link>

              <Link to="/register">
                <button className="register-btn">
                  Register
                </button>
              </Link>
            </>
          )}

        </div>

      </nav>

      {showCart && (
        <div className="cart-popup">

          <h2>Your Cart</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item, index) => (
                <div
                  className="cart-item"
                  key={index}
                >
                  <img
                    src={`/images/${item.image.trim()}`}
                    alt={item.name}
                  />

                  <div className="cart-details">

                    <h4>{item.name}</h4>

                    <p>₹{item.price}</p>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeFromCart(index)
                      }
                    >
                      Remove
                    </button>

                  </div>
                </div>
              ))}

              <hr />

              <h3 className="cart-total">
                Total: ₹{total}
              </h3>

              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </>
          )}

        </div>
      )}
    </>
  );
}

export default Navbar;