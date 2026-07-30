import "./Hero.css";
import heroImage from "../../assets/hero.png";


function Hero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="overlay">
        <p className="tag">NOW SHOWING</p>

        <h1>Avengers: Endgame</h1>

        <p className="genre">
          Action • Adventure • Sci-Fi
        </p>

        <div className="details">
          <span>⭐ 8.4/10</span>
          <span>⏱ 3h 1m</span>
          <span>U/A</span>
        </div>

        <p className="description">
          After the devastating events of Infinity War, the remaining Avengers
          unite for one final mission to restore hope and save the universe.
        </p>

        <div className="hero-buttons">
          <button className="book-btn">Book Now</button>

          <button className="trailer-btn">
            Watch Trailer
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;