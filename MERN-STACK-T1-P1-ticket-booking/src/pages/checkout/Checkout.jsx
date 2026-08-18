import "./Checkout.css";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingData = location.state;

  if (!bookingData) {
    return (
      <>
        <Navbar />
        <div className="checkout">
          <h2>No booking data found.</h2>
        </div>
      </>
    );
  }

  const { booking, seats, totalAmount } = bookingData;

  return (
    <>
      <Navbar />

      <div className="checkout">
        <div className="summary">
          <h1>Checkout</h1>

          <p>
            <strong>Theatre:</strong> {booking.theatre}
          </p>

          <p>
            <strong>Location:</strong> {booking.location}
          </p>

          <p>
            <strong>Date:</strong> {booking.date.day} {booking.date.date}
          </p>

          <p>
            <strong>Show Time:</strong> {booking.time}
          </p>

          <p>
            <strong>Seats:</strong> {seats.join(", ")}
          </p>

          <h2>Total Amount: ₹{totalAmount}</h2>

          <button
            onClick={() =>
              navigate("/success", {
                state: {
                  booking,
                  seats,
                  totalAmount,
                },
              })
            }
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </>
  );
}

export default Checkout;
