import "../styles/ProductCard.css";

function ProductCard({ bag, addToCart }) {
      return (
    <div className="product-card">
        <div
  style={{
    background: "red",
    color: "white",
    padding: "6px",
    fontWeight: "bold",
  }}
>
  {bag.discount}
</div>
<p
  style={{
    color: "green",
    fontWeight: "bold",
    marginTop: "10px",
  }}
>
  New Arrival
</p>
      <img src={bag.image} alt={bag.name} />

      <div className="product-details">
        <h3>{bag.name}</h3>

        <p className="brand">{bag.brand}</p>
        <p>⭐ {bag.rating} / 5</p>

        <p className="price">${bag.price}</p>

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