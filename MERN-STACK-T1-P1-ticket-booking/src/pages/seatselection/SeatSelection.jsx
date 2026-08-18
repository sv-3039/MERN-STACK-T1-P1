import "./SeatSelection.css";
import { useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../components/navbar/navbar";
import { useNavigate } from "react-router-dom";
import theatres from "../../data/theatres";
import dates from "../../data/dates";

function SeatSelection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(dates[0]);

  return (
    <>
      <Navbar />

      <div className="theatre-page">
        <h1>Select Theatre</h1>

        <p>Movie ID: {id}</p>

        <div className="date-container">
          {dates.map((date) => (
            <button
              key={date.id}
              className={
                selectedDate.id === date.id ? "date-btn active" : "date-btn"
              }
              onClick={() => setSelectedDate(date)}
            >
              <h3>{date.day}</h3>

              <p>{date.date}</p>
            </button>
          ))}
        </div>

        {theatres.map((theatre) => (
          <div className="theatre-card" key={theatre.id}>
            <h2>{theatre.name}</h2>

            <p>{theatre.location}</p>

            <div className="timings">
              {theatre.timings.map((time, index) => (
                <button
                  key={index}
                  onClick={() =>
                    navigate(`/movie/${id}/seats`, {
                      state: {
                        movieId: id,
                        theatre: theatre.name,
                        location: theatre.location,
                        date: selectedDate,
                        time: time,
                      },
                    })
                  }
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default SeatSelection;
