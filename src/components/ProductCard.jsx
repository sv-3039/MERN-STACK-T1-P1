import { useState } from "react";

function ProductCard({ product, addToCart }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
  };

  return (
    <div className="card">
      <img src={product.image} alt={product.name} />

      <h3>{product.name}</h3>

      <p>Brand: {product.brand}</p>

      <h4>₹{product.price}</h4>

      <button
        onClick={handleAdd}
        disabled={added}
        className={added ? "added-btn" : ""}
      >
        {added ? "Added ✓" : "Add to Cart"}
      </button>
    </div>
  );
}

export default ProductCard;