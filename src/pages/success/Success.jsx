import "./Success.css";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

function Success() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const bookingId = "BMS" + Math.floor(100000 + Math.random() * 900000);

  const booking = state?.booking;
  const seats = state?.seats || [];
  const totalAmount = state?.totalAmount || 0;

  return (
    <>
      <Navbar />

      <div className="success-page">
        <div className="success-card">
          <h1>🎉 Booking Successful</h1>

          <h3>Booking ID</h3>

          <h2>{bookingId}</h2>

          <hr />

          <p>
            <strong>Theatre:</strong> {booking?.theatre}
          </p>

          <p>
            <strong>Location:</strong> {booking?.location}
          </p>

          <p>
            <strong>Date:</strong> {booking?.date?.day} {booking?.date?.date}
          </p>

          <p>
            <strong>Time:</strong> {booking?.time}
          </p>

          <p>
            <strong>Seats:</strong> {seats.join(", ")}
          </p>

          <h2>Total ₹{totalAmount}</h2>

          <button
            onClick={() => {
              if (!booking) {
                alert("Booking information not found.");
                return;
              }

              const bookingData = {
                bookingId,
                theatre: booking.theatre,
                location: booking.location,
                date: booking.date,
                time: booking.time,
                seats,
                totalAmount,
              };

              const previousBookings =
                JSON.parse(localStorage.getItem("bookings")) || [];

              previousBookings.push(bookingData);

              localStorage.setItem(
                "bookings",
                JSON.stringify(previousBookings),
              );

              navigate("/bookings");
            }}
          >
            Go To My Bookings
          </button>
        </div>
      </div>
    </>
  );
}

export default Success;
