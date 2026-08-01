import "./Checkout.css";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

function Checkout() {
  const { cart, clearCart } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [instructions, setInstructions] = useState("");

  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = () => {
    if (!customerName || !mobile || !address) {
      return;
    }

    const order = {
      customerName,
      mobile,
      address,
      instructions,
      items: cart,
      total,
      status: "Confirmed",
    };

    console.log(order);

    setOrderPlaced(true);

    clearCart();
  };

  return (
    <div className="checkout">

      <div className="checkout-left">

        <h2>Customer Details</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          disabled={orderPlaced}
        />

        <input
          type="tel"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          disabled={orderPlaced}
        />

        <textarea
          rows="4"
          placeholder="Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={orderPlaced}
        />

        <textarea
          rows="4"
          placeholder="Special Instructions (Optional)"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          disabled={orderPlaced}
        />

      </div>

      <div className="checkout-right">

        <h2>Order Summary</h2>

        {cart.map((item) => (
          <div className="summary-item" key={item.id}>
            <span>
              {item.name} × {item.quantity}
            </span>

            <span>
              ₹{item.price * item.quantity}
            </span>
          </div>
        ))}

        <hr />

        <h3>Total : ₹{total}</h3>

        {!orderPlaced ? (
          <button onClick={placeOrder}>
            Place Order
          </button>
        ) : (
          <div className="order-success">
            <h2>✅ Order Confirmed!</h2>
            <p>
              Thank you for ordering from <b>Crunchio</b>.
            </p>
            <p>Your food is being prepared. 🍗</p>
          </div>
        )}

      </div>

    </div>
  );
}

export default Checkout;