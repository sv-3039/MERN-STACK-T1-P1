import "./Bookings.css";
import Navbar from "../../components/navbar/navbar";

function Bookings() {

  const bookings =
    JSON.parse(localStorage.getItem("bookings")) || [];

  return (
    <>
      <Navbar />

      <div className="bookings-page">

        <h1>🎟 My Bookings</h1>

        {bookings.length === 0 ? (

          <div className="booking-card">

            <h2>No Bookings Yet</h2>

          </div>

        ) : (

          bookings.map((item, index) => (

            <div
              className="booking-card"
              key={index}
            >

              <h2>{item.bookingId}</h2>

              <p>
                <strong>Theatre:</strong> {item.theatre}
              </p>

              <p>
                <strong>Location:</strong> {item.location}
              </p>

              <p>
                <strong>Date:</strong> {item.date?.day} {item.date?.date}
              </p>

              <p>
                <strong>Time:</strong> {item.time}
              </p>

              <p>
                <strong>Seats:</strong> {Array.isArray(item.seats) ? item.seats.join(", ") : item.seats}
              </p>

              <h3>
                ₹{item.totalAmount}
              </h3>

            </div>

          ))

        )}

      </div>

    </>
  );
}

export default Bookings;