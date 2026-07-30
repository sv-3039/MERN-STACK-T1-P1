import { useState } from "react";
import Navbar from "./components/Navbar";
import Bags from "./pages/Bags";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (bag) => {
    setCart((prev) => [...prev, bag]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <>
      <Navbar
        cart={cart}
        removeFromCart={removeFromCart}
      />

      <Bags addToCart={addToCart} />
    </>
  );
}

export default App;