import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify";
import "../styles/ManageProducts.css";

function ManageProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

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

            <tr key={product._id}>

              <td>

                <img
                  src={`/images/${product.image.trim()}`}
                  alt={product.name}
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