import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />

      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={<Home search={search} />}
        />

        {/* Book Details */}
        <Route
          path="/book/:id"
          element={<BookDetails />}
        />

        {/* Cart */}
        <Route
          path="/cart"
          element={<Cart />}
        />

        {/* Wishlist */}
        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Checkout */}
        <Route
          path="/checkout"
          element={<Checkout />}
        />
      </Routes>
    </>
  );
}

export default App;