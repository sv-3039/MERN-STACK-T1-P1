import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Bags from "./pages/bags";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/checkout";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";
import ManageProducts from "./pages/ManageProducts";
import EditProduct from "./pages/EditProduct";
import AddProduct from "./pages/AddProduct";
import ManageOrders from "./pages/ManageOrders";

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

      <Routes>
        <Route
          path="/"
          element={<Bags addToCart={addToCart} />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/checkout"
          element={<Checkout cart={cart} />}
        />
        <Route
  path="/orders"
  element={<Orders />}
/>
<Route
  path="/admin"
  element={<AdminDashboard />}
/>
<Route
  path="/admin/products"
  element={<ManageProducts />}
/>
<Route
  path="/admin/edit/:id"
  element={<EditProduct />}
/>
<Route
  path="/admin/add-product"
  element={<AddProduct />}
/>
<Route
  path="/admin/orders"
  element={<ManageOrders />}
/>
      </Routes>
    </>
  );
}

export default App;