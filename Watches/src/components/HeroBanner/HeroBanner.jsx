import { useState } from 'react';
import './HeroBanner.css';

export default function HeroBanner() {
  const [filmOpen, setFilmOpen] = useState(false);

  return (
    <section className="hero-banner">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-subtitle">Since 1852</p>
          <h1 className="hero-title">
            Timeless<br />
            <span className="gold">Elegance</span>
          </h1>
          <p className="hero-description">
            Discover our curated collection of the world's finest luxury timepieces.
            Each watch tells a story of craftsmanship, heritage, and precision.
          </p>
          <div className="hero-actions">
            <button
              className="hero-btn hero-btn-primary"
              onClick={() => {
                document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Collection
            </button>
            <button
              className="hero-btn hero-btn-secondary"
              onClick={() => setFilmOpen(true)}
            >
              ▶ Watch Film
            </button>
          </div>
        </div>

        {filmOpen && (
          <div className="film-modal" onClick={() => setFilmOpen(false)}>
            <div className="film-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="film-modal-close" onClick={() => setFilmOpen(false)}>✕</button>
              <div className="film-modal-video">
                <iframe
                  src="https://www.youtube.com/embed/9T9X9P1uXvY?autoplay=1"
                  title="Luxury Watch Film"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
        <div className="hero-image-wrapper">
          <div className="hero-image-container">
            <div className="hero-image-glow"></div>
            <img
              src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600"
              alt="Luxury Watch"
              className="hero-watch-image"
            />
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-value">200+</span>
              <span className="hero-stat-label">Exclusive Models</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">50+</span>
              <span className="hero-stat-label">Premium Brands</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">15k+</span>
              <span className="hero-stat-label">Happy Clients</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

