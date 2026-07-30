import "./FoodCard.css";
import { useCart } from "../../context/CartContext";

function FoodCard({ item }) {
  const { addToCart } = useCart();

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
          className="cart-button"
          onClick={() => addToCart(item)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default FoodCard;