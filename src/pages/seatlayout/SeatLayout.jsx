import "./SeatLayout.css";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import { useState } from "react";
import seats from "../../data/seats";


function SeatLayout() {
  const { id } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const ticketPrice = 250;
  const totalAmount = selectedSeats.length * ticketPrice;
  const handleSeatClick = (seat) => {
    if (seat.booked) return;

    if (selectedSeats.includes(seat.seatNo)) {
      setSelectedSeats(
        selectedSeats.filter((item) => item !== seat.seatNo)
      );
    } else {
      setSelectedSeats([...selectedSeats, seat.seatNo]);
    }
  };

  return (
    <>
      <Navbar />

      <div className="seat-layout">
        <h1>Select Your Seats</h1>

        <p className="movie-id">Movie ID : {id}</p>

        <div className="screen">
          SCREEN
        </div>

        <div className="seat-grid">
          {seats.map((seat) => (
            <button
              key={seat.id}
              onClick={() => handleSeatClick(seat)}
              className={`seat
                ${seat.booked ? "booked" : ""}
                ${selectedSeats.includes(seat.seatNo) ? "selected" : ""}
              `}
            >
              {seat.seatNo}
            </button>
          ))}
        </div>

        <div className="legend">
          <div>
            <span className="box available"></span>
            Available
          </div>

          <div>
            <span className="box booked-box"></span>
            Booked
          </div>

          <div>
            <span className="box selected-box"></span>
            Selected
          </div>
        </div>

        <div className="selected-info">

  <h2>Booking Summary</h2>

  <p>
    <strong>Selected Seats:</strong>
    {" "}
    {selectedSeats.length > 0
      ? selectedSeats.join(", ")
      : "None"}
  </p>

  <p>
    <strong>Number of Seats:</strong>
    {" "}
    {selectedSeats.length}
  </p>

  <p>
    <strong>Price Per Seat:</strong>
    ₹{ticketPrice}
  </p>

  <h3>
    Total Amount : ₹{totalAmount}
  </h3>

  <button
    className="checkout-btn"
    disabled={selectedSeats.length === 0}
  >
    Proceed to Checkout
  </button>

</div>
      </div>
    </>
  );
}

export default SeatLayout;