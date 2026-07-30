import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/hero/Hero";
import Footer from "../../components/footer/Footer";

import MovieCard from "../../components/moviecard/MovieCard";

import movies from "../../data/movies";

import "./Home.css";

function Home() {

    return (

        <>

            <Navbar />

            <Hero />

            <section className="movies-section">

                <h2>Now Showing</h2>

                <div className="movies-grid">

                    {
                        movies.map((movie)=>(
                            <MovieCard
                                key={movie.id}
                                title={movie.title}
                                genre={movie.genre}
                                rating={movie.rating}
                                duration={movie.duration}
                                image={movie.image}
                            />
                        ))
                    }

                </div>

            </section>

            <Footer />

        </>

    );

}

export default Home;