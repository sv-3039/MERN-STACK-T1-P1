import { useState } from "react";
import Cart from "./Cart";

function Header({ cart, removeFromCart }) {
  const [showCart, setShowCart] = useState(false);

  return (
    <header>
      <h1>🌸 Fragrance World</h1>

      <nav>
        <a href="#perfumes">Perfumes</a>
        <a href="#room">Room Sprays</a>
        <a href="#pooja">Pooja</a>
        <a href="#bathroom">Bathroom</a>
        <a href="#candles">Candles</a>
        <a href="#oils">Essential Oils</a>
      </nav>

      <button
        className="cart-btn"
        onClick={() => setShowCart(!showCart)}
      >
        🛒 Cart ({cart.length})
      </button>

      {showCart && (
        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
          closeCart={() => setShowCart(false)}
        />
      )}
    </header>
  );
}

export default Header;