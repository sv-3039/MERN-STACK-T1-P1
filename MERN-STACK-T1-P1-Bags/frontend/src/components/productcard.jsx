import "../styles/productcard.css";

function ProductCard({ bag, addToCart }) {
  const getImageSrc = (img) => {
    if (!img) return "/images/bag1.jpg";
    if (typeof img === "string") {
      if (img.startsWith("http") || img.startsWith("data:") || img.startsWith("/") || img.startsWith("blob:")) {
        return img;
      }
      return `/images/${img.trim()}`;
    }
    return img;
  };

  const discountText = bag.discount
    ? typeof bag.discount === "number"
      ? `${bag.discount}% OFF`
      : bag.discount
    : "10% OFF";

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
        {discountText}
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
        src={getImageSrc(bag.image)}
        alt={bag.name}
        className="product-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500";
        }}
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