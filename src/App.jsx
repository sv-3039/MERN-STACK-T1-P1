import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import About from "./pages/About/About";
import Offers from "./pages/Offers/Offers";
import Contact from "./pages/Contact/Contact";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/about" element={<About />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;