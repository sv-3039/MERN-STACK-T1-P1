import "../styles/ProductCard.css";

function ProductCard({ bag, addToCart }) {
  return (
    <div className="product-card">

      {/* Discount Badge */}
      <div
        style={{
          background: "red",
          color: "white",
          padding: "6px",
          fontWeight: "bold",
          borderRadius: "5px",
          width: "fit-content",
          marginBottom: "10px",
        }}
      >
        {bag.discount}% OFF
      </div>

      <p
        style={{
          color: "green",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        🆕 New Arrival
      </p>

      {/* Product Image */}
      <img
  src={`/images/${bag.image.trim()}`}
  alt={bag.name}
  className="product-image"
/>

      <div className="product-details">
        <h3>{bag.name}</h3>

        <p className="brand">{bag.brand}</p>

<p className="rating">
  ⭐⭐⭐⭐⭐ <strong>{bag.rating}</strong>
</p>
        <p className="price">₹{bag.price}</p>

        <button
          className="cart-btn"
          onClick={() => addToCart(bag)}
        >
          Add to Cart
        </button>
      </div>

    </div>
  );
}

export default ProductCard;