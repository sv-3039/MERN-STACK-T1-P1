function Cart({ cart, removeFromCart, closeCart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart">
      <div className="cart-header">
        <h2>🛒 Shopping Cart</h2>

        <button className="close-cart" onClick={closeCart}>
          ✖
        </button>
      </div>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div>
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
              </div>

              <button onClick={() => removeFromCart(item.id)}>
                ❌
              </button>
            </div>
          ))}

          <hr />

          <h3>Total: ₹{total}</h3>

          <button className="checkout">
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;