import React from "react";

function Cart({ cart, total, setShowCart, setSelectedProduct, updateQuantity, removeFromCart }) {
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
              <div className="cart-item-row" key={item.id}>
                
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
                  <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span className="qty-display">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>

                {/* Subtotal for this item */}
                <div className="cart-item-total">
                  ₹{item.price * item.quantity}
                </div>

                {/* Delete Button */}
                <button className="delete-btn" onClick={() => removeFromCart(item.id)}>🗑️</button>
              
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Total Amount: <span style={{ color: '#e91e63' }}>₹{total}</span></h3>
            
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