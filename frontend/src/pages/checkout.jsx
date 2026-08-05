import { useState } from "react";
import { toast } from "react-toastify";
import API from "../api/axios";
import "../styles/Checkout.css";

function Checkout({ cart }) {
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    payment: "COD",
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const placeOrder = async (e) => {
  e.preventDefault();

  try {
    const order = {
      user: formData.fullname,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      paymentMethod: formData.payment,
      products: cart,
      totalPrice: total,
    };

    await API.post("/orders", order);

    toast.success("🎉 Order Placed Successfully!");

    setTimeout(() => {
      window.location.href = "/";
    }, 1500);

  } catch (error) {
    toast.error("Failed to place order");
    console.log(error);
  }
};
  return (
    <div className="checkout-page">

      <div className="checkout-left">

        <h2>Shipping Details</h2>

        <form onSubmit={placeOrder} className="checkout-form">

          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />

          <textarea
            name="address"
            placeholder="Address"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            onChange={handleChange}
            required
          />

          <h3>Payment Method</h3>

          <label>
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={formData.payment === "COD"}
              onChange={handleChange}
            />
            Cash on Delivery
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="UPI"
              onChange={handleChange}
            />
            UPI
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="CARD"
              onChange={handleChange}
            />
            Credit / Debit Card
          </label>

          <button type="submit">
            Place Order
          </button>

        </form>

      </div>

      <div className="checkout-right">

        <h2>Order Summary</h2>

        {cart.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div className="summary-item" key={index}>
                <img
                  src={`/images/${item.image.trim()}`}
                  alt={item.name}
                />

                <div>
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                </div>
              </div>
            ))}

            <hr />

            <h2>Total : ₹{total}</h2>
          </>
        )}

      </div>

    </div>
  );
}

export default Checkout;