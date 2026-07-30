import "./MovieCard.css";

function MovieCard(props) {

    return (

        <div className="movie-card">

            <img
                src={props.image}
                alt={props.title}
            />

            <div className="movie-info">

                <h3>{props.title}</h3>

                <p>{props.genre}</p>

                <p>⭐ {props.rating}</p>

                <p>{props.duration}</p>

                <button>Book Now</button>

            </div>

        </div>

    );

}

export default MovieCard;