import "./MovieDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import movies from "../../data/movies";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = movies.find((item) => item.id === Number(id));

  if (!movie) {
    return <h1>Movie Not Found</h1>;
  }

  return (
    <>
      <Navbar />

      <div className="movie-details-container">
        <div className="movie-poster">
          <img src={movie.image} alt={movie.title} />
        </div>

        <div className="movie-content">
          <h1>{movie.title}</h1>

          <p>
            <strong>⭐ Rating :</strong> {movie.rating}/10
          </p>

          <p>
            <strong>🎭 Genre :</strong> {movie.genre}
          </p>

          <p>
            <strong>🌐 Language :</strong> {movie.language}
          </p>

          <p>
            <strong>⏱ Duration :</strong> {movie.duration}
          </p>

          <p>
            <strong>📅 Release Date :</strong> {movie.releaseDate}
          </p>

          <p>
            <strong>🎬 Director :</strong> {movie.director}
          </p>

          <p>
            <strong>👥 Cast :</strong> {movie.cast}
          </p>

          <p className="description">{movie.description}</p>

          <button
            className="book-btn"
            onClick={() => navigate(`/movie/${movie.id}/theatres`)}
          >
            Select Theatre
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default MovieDetails;
