import { useState } from "react";
import "./Checkout.css";
import {
  FaMoneyBillWave,
  FaMobileAlt,
  FaTimes,
  FaCheckCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";
import AddressPicker from "./AddressPicker";

// Merchant UPI ID the "Pay with UPI app" link points to.
// Replace with a real merchant VPA before going live.
const MERCHANT_UPI_ID = "7816096147@naviaxis";
const MERCHANT_PAYEE_NAME = "Jithendra Kumar";

function Checkout({ cart, total, address, onSelectAddress, onClose, onOrderComplete }) {
  const [method, setMethod] = useState("cod");
  const [upiId, setUpiId] = useState("");
  const [step, setStep] = useState("select"); // select | processing | success
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");
  const [addressOpen, setAddressOpen] = useState(false);

  const upiPattern = /^[\w.\-]{2,256}@[a-zA-Z]{2,64}$/;

  const upiLink = `upi://pay?pa=${MERCHANT_UPI_ID}&pn=${encodeURIComponent(MERCHANT_PAYEE_NAME)}&am=${total}&cu=INR&tn=${encodeURIComponent("Shoe order")}`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(upiLink)}`;

  const placeOrder = () => {
    setError("");

    if (!address) {
      setError("Please select a delivery address.");
      return;
    }

    if (method === "upi" && !upiPattern.test(upiId)) {
      setError("Enter a valid UPI ID.");
      return;
    }

    setStep("processing");

    setTimeout(() => {
      const id = "SE" + Math.floor(100000 + Math.random() * 900000);
      setOrderId(id);
      setStep("success");
      onOrderComplete(method, id);
    }, 1400);
  };

  return (
    <div className="checkoutOverlay" onClick={step === "select" ? onClose : undefined}>
      <div className="checkoutModal" onClick={(e) => e.stopPropagation()}>
        {step !== "success" && (
          <FaTimes className="checkoutClose" onClick={onClose} />
        )}

        {step === "select" && (
          <>
            <h2>Checkout</h2>

            <div className="checkoutSummary">
              {cart.map((item) => (
                <div className="summaryRow" key={item.id}>
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}

              <div className="summaryTotal">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <h3 className="payHeading">Delivery Address</h3>

            <button
              type="button"
              className="addressSelectBtn"
              onClick={() => setAddressOpen(true)}
            >
              <FaMapMarkerAlt />
              <span className="addressSelectText">
                {address ? address.label : "Select delivery address"}
              </span>
              <span className="addressChangeLabel">{address ? "Change" : "Select"}</span>
            </button>

            <h3 className="payHeading">Select Payment Method</h3>

            <div className="paymentOptions">
              <label className={`payOption ${method === "cod" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={method === "cod"}
                  onChange={() => setMethod("cod")}
                />
                <FaMoneyBillWave className="payIcon" />
                <div>
                  <p className="payTitle">Cash on Delivery</p>
                  <p className="paySub">Pay ₹{total} when your order arrives</p>
                </div>
              </label>

              <label className={`payOption ${method === "upi" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={method === "upi"}
                  onChange={() => setMethod("upi")}
                />
                <FaMobileAlt className="payIcon" />
                <div>
                  <p className="payTitle">UPI</p>
                  <p className="paySub">Pay instantly via Google Pay, PhonePe, Paytm...</p>
                </div>
              </label>
            </div>

            {method === "upi" && (
              <div className="upiBox">
                <div className="upiQrCard">
                  <img
                    className="upiQrImage"
                    src={qrImageUrl}
                    alt="Scan this QR code with any UPI app"
                  />
                  <p className="qrLabel">Scan this code with any UPI app to pay ₹{total}</p>
                </div>

                <input
                  type="text"
                  placeholder="Enter your UPI ID (e.g. name@okhdfcbank)"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              </div>
            )}

            {error && <p className="checkoutError">{error}</p>}

            <button className="placeOrderBtn" onClick={placeOrder}>
              {method === "cod" ? `Place Order · ₹${total}` : `Pay ₹${total}`}
            </button>
          </>
        )}

        {step === "processing" && (
          <div className="processingState">
            <div className="spinner" />
            <p>{method === "cod" ? "Placing your order..." : "Confirming UPI payment..."}</p>
          </div>
        )}

        {step === "success" && (
          <div className="successState">
            <FaCheckCircle className="successIcon" />
            <h2>Order Placed!</h2>
            <p className="orderIdText">Order ID: {orderId}</p>
            <p className="successSub">
              {method === "cod"
                ? `Pay ₹${total} in cash when your order is delivered.`
                : `₹${total} paid successfully via UPI.`}
            </p>
            <button className="placeOrderBtn" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      {addressOpen && (
        <AddressPicker
          onSelect={(addr) => {
            onSelectAddress(addr);
            setAddressOpen(false);
          }}
          onClose={() => setAddressOpen(false)}
        />
      )}
    </div>
  );
}

export default Checkout;
