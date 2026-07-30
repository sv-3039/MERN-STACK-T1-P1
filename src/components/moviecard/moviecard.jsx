import "./MovieCard.css";
import { useNavigate } from "react-router-dom";

function MovieCard(props) {
  const navigate = useNavigate();

  return (
    <div className="movie-card">
      <img src={props.image} alt={props.title} />

      <div className="movie-info">
        <h3>{props.title}</h3>

        <p>
          <strong>Genre:</strong> {props.genre}
        </p>

        <p>
          <strong>Language:</strong> {props.language}
        </p>

        <p>
          ⭐ {props.rating}/10
        </p>

        <p>
          ⏱ {props.duration}
        </p>

        <button
          onClick={() => navigate(`/movie/${props.id}`)}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export default MovieCard;