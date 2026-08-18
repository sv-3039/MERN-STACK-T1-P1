import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify";
import "../styles/EditProduct.css";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    price: "",
    category: "",
    image: "",
    rating: "",
    discount: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { data } = await API.get("/products");

      const selected = data.find((p) => p._id === id);

      if (selected) {
        setProduct(selected);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/products/${id}`, product);

      toast.success("Product Updated Successfully");

      navigate("/admin/products");

    } catch (error) {
      toast.error("Update Failed");
    }
  };

  return (
    <div className="edit-page">

      <form className="edit-form" onSubmit={updateProduct}>

        <h1>Edit Product</h1>

        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
        />

        <input
          name="brand"
          value={product.brand}
          onChange={handleChange}
          placeholder="Brand"
        />

        <input
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
        />

        <input
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
        />

        <input
          name="image"
          value={product.image}
          onChange={handleChange}
          placeholder="Image"
        />

        <input
          name="rating"
          value={product.rating}
          onChange={handleChange}
          placeholder="Rating"
        />

        <input
          name="discount"
          value={product.discount}
          onChange={handleChange}
          placeholder="Discount"
        />

        <button>
          Update Product
        </button>

      </form>

    </div>
  );
}

export default EditProduct;