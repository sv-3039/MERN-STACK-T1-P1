import { useState } from "react";
import "./FoodCard.css";
import { useCart } from "../../context/CartContext";

function FoodCard({ item }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(item);
    setAdded(true);
  };

  return (
    <div className="food-card">
      <img
        src={item.image}
        alt={item.name}
        className="food-image"
      />

      <div className="food-info">
        <h3>{item.name}</h3>

        <p>{item.description}</p>

        <h2>₹{item.price}</h2>

        <button
          className={added ? "added-btn" : "cart-button"}
          onClick={handleAddToCart}
          disabled={added}
        >
          {added ? "✔ Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default FoodCard;