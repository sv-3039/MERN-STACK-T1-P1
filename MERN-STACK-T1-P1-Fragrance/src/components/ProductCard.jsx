import { useState } from "react";

function ProductCard({ product, addToCart }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
  };

  return (
    <div className="card">
      <div className="card-img-wrapper">
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=300";
          }}
        />
      </div>

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