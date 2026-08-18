import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import defaultBags from "../data/bags";
import { toast } from "react-toastify";
import "../styles/ManageProducts.css";

function ManageProducts() {
  const [products, setProducts] = useState(defaultBags);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      if (Array.isArray(data) && data.length > 0) {
        setProducts(data);
      }
    } catch (error) {
      console.warn("Using default bags fallback for ManageProducts:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/products/${id}`);

      toast.success("Product Deleted");

      fetchProducts();

    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="manage-products">

      <h1>Manage Products</h1>

      <table>

        <thead>

          <tr>

            <th>Image</th>

            <th>Name</th>

            <th>Brand</th>

            <th>Price</th>

            <th>Category</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {products.map((product) => (
            <tr key={product._id || product.id}>
              <td>
                <img
                  src={typeof product.image === "string" ? (product.image.startsWith("http") || product.image.startsWith("data:") || product.image.startsWith("/") ? product.image : `/images/${product.image.trim()}`) : product.image}
                  alt={product.name}
                  style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }}
                />
              </td>

              <td>{product.name}</td>

              <td>{product.brand}</td>

              <td>₹{product.price}</td>

              <td>{product.category}</td>

              <td>

                <Link
                  className="edit-btn"
                  to={`/admin/edit/${product._id}`}
                >
                  Edit
                </Link>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteProduct(product._id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ManageProducts;