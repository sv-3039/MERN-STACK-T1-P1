import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";
import Footer from "./components/Footer";

import {
  perfumes,
  roomSprays,
  pooja,
  bathroom,
  candles,
  oils,
} from "./data/products";

function App() {
  const [cart, setCart] = useState([]);

  // Add product to cart
  const addToCart = (product) => {
    const alreadyExists = cart.find((item) => item.id === product.id);

    if (!alreadyExists) {
      setCart([...cart, product]);
    }
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="fragrance-store-app">
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
      />

      <Hero />

      <ProductSection
        id="perfumes"
        title="🌹 Luxury Perfumes"
        products={perfumes}
        addToCart={addToCart}
      />

      <ProductSection
        id="room"
        title="🏠 Room Sprays"
        products={roomSprays}
        addToCart={addToCart}
      />

      <ProductSection
        id="pooja"
        title="🪔 Pooja Fragrances"
        products={pooja}
        addToCart={addToCart}
      />

      <ProductSection
        id="bathroom"
        title="🚿 Bathroom Fresheners"
        products={bathroom}
        addToCart={addToCart}
      />

      <ProductSection
        id="candles"
        title="🕯️ Scented Candles"
        products={candles}
        addToCart={addToCart}
      />

      <ProductSection
        id="oils"
        title="🌿 Essential Oils"
        products={oils}
        addToCart={addToCart}
      />

      <Footer />
    </div>
  );
}

export default App;