import { useState } from "react";
import "../styles/Navbar.css";

function Navbar({ cart, removeFromCart }) {
    const [showCart, setShowCart] = useState(false);

  return (
    <>
      <nav>
        <h2>👜 Mall Store</h2>

        <ul>
          <li>Home</li>

          <li onClick={() => setShowCart(!showCart)}>
            🛒 Cart ({cart.length})
          </li>
        </ul>
      </nav>

      {showCart && (
        <div className="cart-popup">
          <h3>Shopping Cart</h3>

          {cart.length === 0 ? (
  <p>Your cart is empty.</p>
) : (
  <>
  
    {cart.map((item, index) => (
      <div className="cart-item" key={index}>
        <img src={item.image} alt={item.name} />

       <div className="cart-details">
  <h4>{item.name}</h4>
  <p>${item.price}</p>

  <button
    className="remove-btn"
    onClick={() => removeFromCart(index)}
  >
    Remove
  </button>
</div>
      </div>
    ))}

    <hr />

    <h3 style={{ textAlign: "right", marginTop: "15px" }}>
      Total: $
      {cart.reduce((total, item) => total + item.price, 0)}
    </h3>
  </>
)}
        </div>
      )}
    </>
  );
}

export default Navbar;