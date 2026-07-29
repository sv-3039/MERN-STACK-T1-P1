import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import myqr from "../assets/myqr.png";

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [payment, setPayment] = useState("UPI");

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (
      !address.name ||
      !address.phone ||
      !address.address ||
      !address.city ||
      !address.state ||
      !address.pincode
    ) {
      alert("Please fill in the delivery address.");
      return;
    }

    alert("Order Placed Successfully!");

    clearCart();

    navigate("/");
  };

  return (
    <div className="container my-5">

      <div className="row">

        {/* Address */}

        <div className="col-lg-7 mb-4">

          <div className="card shadow border-0">

            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Delivery Address</h4>
            </div>

            <div className="card-body">

              <div className="mb-3">
                <label className="form-label">Full Name</label>

                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={address.name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone Number</label>

                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={address.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Address</label>

                <textarea
                  className="form-control"
                  rows="3"
                  name="address"
                  value={address.address}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label className="form-label">City</label>

                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={address.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">

                  <label className="form-label">State</label>

                  <input
                    type="text"
                    className="form-control"
                    name="state"
                    value={address.state}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <div className="mb-3">
                <label className="form-label">Pincode</label>

                <input
                  type="text"
                  className="form-control"
                  name="pincode"
                  value={address.pincode}
                  onChange={handleChange}
                />
              </div>

            </div>

          </div>

        </div>

        {/* Order Summary */}

        <div className="col-lg-5">

          <div className="card shadow border-0">

            <div className="card-header bg-success text-white">
              <h4 className="mb-0">Order Summary</h4>
            </div>

            <div className="card-body">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between mb-3"
                >
                  <div>
                    <strong>{item.title}</strong>
                    <br />
                    Qty : {item.quantity}
                  </div>

                  <div>
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}

              <hr />

              <h4 className="text-end text-success">
                Total : ₹{total}
              </h4>

              <hr />
              <h5 className="mb-3">Select Payment Method</h5>

<div className="form-check mb-2">
    <input
        className="form-check-input"
        type="radio"
        value="UPI"
        checked={payment === "UPI"}
        onChange={(e)=>setPayment(e.target.value)}
    />
    <label className="form-check-label">
        📱 UPI (Google Pay / PhonePe / Paytm)
    </label>
</div>

<div className="form-check mb-2">
    <input
        className="form-check-input"
        type="radio"
        value="Card"
        checked={payment==="Card"}
        onChange={(e)=>setPayment(e.target.value)}
    />
    <label className="form-check-label">
        💳 Debit / Credit Card
    </label>
</div>

<div className="form-check">
    <input
        className="form-check-input"
        type="radio"
        value="COD"
        checked={payment==="COD"}
        onChange={(e)=>setPayment(e.target.value)}
    />
    <label className="form-check-label">
        💵 Cash On Delivery
    </label>
</div>

              {/* UPI */}

              {payment === "UPI" && (
<div className="text-center mt-4">

<h5 className="mb-3">
Scan to Pay
</h5>

<img
src={myqr}
alt="UPI QR"
className="img-thumbnail shadow"
style={{
width:"220px"
}}
/>

<p className="mt-3 text-muted">
Scan using Google Pay, PhonePe or Paytm
</p>

<button
className="btn btn-primary"
onClick={handlePlaceOrder}
>
I Have Paid
</button>

</div>
)}
              {/* Card */}

              {payment === "Card" && (
                <div>

                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Card Number"
                  />

                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Card Holder Name"
                  />

                  <div className="row">

                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="MM/YY"
                      />
                    </div>

                    <div className="col">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="CVV"
                      />
                    </div>

                  </div>

                </div>
              )}

              {/* COD */}

              {payment === "COD" && (
                <div className="alert alert-info">
                  You will pay at the time of delivery.
                </div>
              )}

              <button
                className="btn btn-success btn-lg w-100 mt-4"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;