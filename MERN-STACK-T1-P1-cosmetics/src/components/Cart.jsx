import { useState } from "react";

function Cart({ cart, total, discount, setDiscount, setShowCart, setSelectedProduct, updateQuantity, removeFromCart }) {
  // ---- Coupon feature state (message + input stay local) ----
  const [promoCode, setPromoCode] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleApplyCoupon = () => {
    const cartSubtotal = total;
    const code = promoCode.trim().toUpperCase();

    if (code === "RADHA20") {
      if (cartSubtotal >= 999) {
        setDiscount(cartSubtotal * 0.20);
        setMessage({ text: "Success! 20% off applied on your order.", type: "success" });
      } else {
        setDiscount(0);
        setMessage({ text: "RADHA20 requires a minimum spend of ₹999.", type: "error" });
      }
    } else if (code === "BOGO1") {
      if (cartSubtotal >= 499) {
        // Simulating BOGO by giving a 50% discount on the cart for presentation purposes
        setDiscount(cartSubtotal * 0.50);
        setMessage({ text: "Success! BOGO1 applied. 2nd Lipstick is FREE.", type: "success" });
      } else {
        setDiscount(0);
        setMessage({ text: "BOGO1 requires a minimum spend of ₹499.", type: "error" });
      }
    } else if (code === "GLAM50") {
      if (cartSubtotal >= 1999) {
        setDiscount(cartSubtotal * 0.50);
        setMessage({ text: "Success! 50% off Festive Glam Sale applied.", type: "success" });
      } else {
        setDiscount(0);
        setMessage({ text: "GLAM50 requires a minimum spend of ₹1999.", type: "error" });
      }
    } else if (code === "UNDER399") {
      if (cartSubtotal >= 399) {
        setDiscount(100);
        setMessage({ text: "Success! Flat ₹100 off applied on your order.", type: "success" });
      } else {
        setDiscount(0);
        setMessage({ text: "UNDER399 requires a minimum spend of ₹399.", type: "error" });
      }
    } else if (code === "COMBO10") {
      if (cartSubtotal > 0) {
        // Simulating 10% discount for the combo kit code
        setDiscount(cartSubtotal * 0.10);
        setMessage({ text: "Success! 10% off Starter Beauty Combo applied.", type: "success" });
      } else {
        setDiscount(0);
        setMessage({ text: "Cart is empty.", type: "error" });
      }
    } else if (code === "GLOWFREE") {
      if (cartSubtotal >= 1499) {
        // Simulating Free Shipping by deducting a flat shipping rate (e.g., ₹50)
        setDiscount(50);
        setMessage({ text: "Success! Free Shipping + Bonus Mini Serum applied.", type: "success" });
      } else {
        setDiscount(0);
        setMessage({ text: "GLOWFREE requires a minimum spend of ₹1499.", type: "error" });
      }
    } else {
      setDiscount(0);
      setMessage({ text: "Invalid promo code.", type: "error" });
    }
  };

  const finalTotal = total - discount;

  return (
    <div className="cart-page">
      <h2 style={{ color: '#e91e63', marginBottom: '25px', fontSize: '32px' }}>Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <div style={{ padding: '40px', color: '#777' }}>
          <p style={{ fontSize: '20px', marginBottom: '20px' }}>Your cart is currently empty.</p>
          <button onClick={() => setShowCart(false)} style={{ width: '250px' }}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items-container">
            {cart.map((item) => (
              <div className="cart-item-row" key={item._id || item.id}>

                {/* Product Image */}
                <img src={item.image} alt={item.name} className="cart-item-img" />

                {/* Product Details */}
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p className="cart-item-brand">{item.brand}</p>
                  <p className="cart-item-price">₹{item.price}</p>
                </div>

                {/* Quantity Controls */}
                <div className="qty-controls" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button className="qty-btn" onClick={() => updateQuantity(item._id ?? item.id, -1)}>-</button>
                  <span className="qty-display">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateQuantity(item._id ?? item.id, 1)}>+</button>
                </div>

                {/* Subtotal for this item */}
                <div className="cart-item-total">
                  ₹{item.price * item.quantity}
                </div>

                {/* Delete Button */}
                <button className="delete-btn" onClick={() => removeFromCart(item._id ?? item.id)}>🗑️</button>

              </div>
            ))}
          </div>

          <div className="cart-summary">
            {/* ===== COUPON SECTION ===== */}
            <div className="coupon-section">
              <div className="coupon-row">
                <input
                  type="text"
                  className="coupon-input"
                  placeholder="Enter Promo Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button className="coupon-apply-btn" onClick={handleApplyCoupon}>
                  Apply
                </button>
              </div>
              {message.text && (
                <p className={`coupon-message ${message.type}`}>{message.text}</p>
              )}
              {discount > 0 && (
                <p className="coupon-discount">Discount: -₹{discount.toFixed(2)}</p>
              )}
            </div>

            <h3>Total Amount: <span style={{ color: '#e91e63' }}>₹{finalTotal.toFixed(2)}</span></h3>

            <div className="cart-actions">
              <button
                className="back-btn"
                onClick={() => setShowCart(false)}
              >
                Continue Shopping
              </button>
              <button
                className="checkout-btn"
                onClick={() => {
                  setShowCart(false);
                  setSelectedProduct({}); // Triggers order page
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
