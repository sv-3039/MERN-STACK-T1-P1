import { FaArrowRight } from "react-icons/fa";

function Hero() {
  return (
    <section className="hero-section">
      <div className="container">

        <h1 className="display-3 fw-bold">
          Welcome to Book Stall 📚
        </h1>

        <p className="lead mt-4 mb-4">
          Discover your next favorite book from thousands of collections.
          <br />
          Read, Learn and Grow with the best books.
        </p>

        <button className="btn btn-warning btn-lg px-4">
          Explore Books <FaArrowRight className="ms-2" />
        </button>

      </div>
    </section>
  );
}

export default Hero;