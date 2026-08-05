import { Link } from "react-router-dom";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="admin-container">

      <aside className="sidebar">

        <h2>🛍 Mall Store</h2>

        <ul>

          <li>
            <Link to="/admin">Dashboard</Link>
          </li>

          <li>
            <Link to="/admin/add-product">
              Add Product
            </Link>
          </li>

          <li>
            <Link to="/admin/products">
              Manage Products
            </Link>
          </li>

          <li>
            <Link to="/admin/orders">
              Manage Orders
            </Link>
          </li>

          <li>
            <Link to="/">
              Back to Store
            </Link>
          </li>

        </ul>

      </aside>

      <main className="dashboard">

        <h1>Admin Dashboard</h1>

        <div className="cards">

          <div className="card">
            <h2>📦 Products</h2>
            <h1>12</h1>
          </div>

          <div className="card">
            <h2>🛒 Orders</h2>
            <h1>8</h1>
          </div>

          <div className="card">
            <h2>👤 Users</h2>
            <h1>5</h1>
          </div>

          <div className="card">
            <h2>💰 Revenue</h2>
            <h1>₹15,500</h1>
          </div>

        </div>

        <h2 style={{ marginTop: "40px" }}>
          Welcome Admin 👋
        </h2>

        <p>
          Manage products, customers and orders from
          this dashboard.
        </p>

      </main>

    </div>
  );
}

export default AdminDashboard;