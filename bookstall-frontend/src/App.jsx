import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import BookDetails from "./pages/BookDetails";
import Settings from "./pages/Settings";
import Orders from "./pages/Orders";
import OrderSuccess from "./pages/OrderSuccess";

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
      />

      <Routes>
        <Route
          path="/"
          element={<Home search={search} />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/book/:id"
          element={<BookDetails />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />
      </Routes>
    </>
  );
}

export default App; 