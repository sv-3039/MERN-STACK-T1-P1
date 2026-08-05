import { useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import "../styles/AddProduct.css";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    price: "",
    category: "",
    image: "",
    rating: "",
    discount: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.post("/products", product);

      toast.success("Product Added Successfully");

      setProduct({
        name: "",
        brand: "",
        price: "",
        category: "",
        image: "",
        rating: "",
        discount: "",
      });

    } catch (error) {
      toast.error("Failed to Add Product");
    }
  };

  return (
    <div className="add-product-page">
      <form className="add-product-form" onSubmit={submitHandler}>

        <h1>Add Product</h1>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={product.brand}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image Name (e.g. bag13.jpg)"
          value={product.image}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={product.rating}
          onChange={handleChange}
        />

        <input
          type="number"
          name="discount"
          placeholder="Discount (%)"
          value={product.discount}
          onChange={handleChange}
        />

        <button type="submit">Add Product</button>

      </form>
    </div>
  );
}

export default AddProduct;