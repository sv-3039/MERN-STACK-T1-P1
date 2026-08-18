import Navbar from "../../components/navbar/navbar";
import Hero from "../../components/hero/hero";
import Footer from "../../components/footer/footer";
import MovieCard from "../../components/moviecard/moviecard";

import movies from "../../data/movies";

import "./home.css";

function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <section className="movies-section">
        <h2>Now Showing</h2>

        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              genre={movie.genre}
              rating={movie.rating}
              duration={movie.duration}
              language={movie.language}
              image={movie.image}
            />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;