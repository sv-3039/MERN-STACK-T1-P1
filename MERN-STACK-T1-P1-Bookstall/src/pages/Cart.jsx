import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="container text-center mt-5">
        <h2>Your Cart is Empty 🛒</h2>

        <Link to="/" className="btn btn-primary mt-3">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Your Cart</h2>

      <div className="row">
        {cart.map((item) => (
          <div
            className="col-md-8 offset-md-2 mb-3"
            key={item.id}
          >
            <div className="card p-3 d-flex flex-row align-items-center">
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "100px",
                  height: "130px",
                  objectFit: "cover",
                }}
              />

              <div className="ms-3 flex-grow-1">
                <h5>{item.title}</h5>

                <p className="mb-1">
                  Author: {item.author}
                </p>

                <p className="mb-1 text-success fw-bold">
                  ₹{item.price}
                </p>

                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>

                  <button
                    className="btn btn-sm btn-danger ms-3"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div>
                <h5>₹{item.price * item.quantity}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <h4>Total: ₹{totalPrice}</h4>

        <button
          className="btn btn-success mt-2"
          onClick={() => navigate("/checkout")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;