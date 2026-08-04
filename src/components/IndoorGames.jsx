import React from "react";
import "../style.css";

import banner from "../assets/images/indoor-banner.jpg";

import chess from "../assets/images/chess.jpg";
import carrom from "../assets/images/carrom.jpg";
import tableTennis from "../assets/images/table-tennis.jpg";
import snooker from "../assets/images/snooker.jpg";
import badminton from "../assets/images/badminton.jpg";
import bowling from "../assets/images/bowling.jpg";
import darts from "../assets/images/darts.jpg";
import foosball from "../assets/images/foosball.jpg";

function IndoorGames() {
  const games = [
    {
      image: chess,
      title: "Chess",
      desc: "Chess is a strategic board game played by two players that enhances thinking skills.",
      players: "2 Players",
      price: "₹799",
    },
    {
      image: carrom,
      title: "Carrom",
      desc: "Carrom is a popular tabletop game where players pocket coins using a striker.",
      players: "2–4 Players",
      price: "₹1,499",
    },
    {
      image: tableTennis,
      title: "Weight Lifting",
      desc: "Weight lifting is a strength training exercise that involves lifting weights to build muscle.",
      players: "Individual",
      price: "₹4,999",
    },
    {
      image: snooker,
      title: "Snooker",
      desc: "Snooker is played on a large table using cues and colored balls.",
      players: "2 Players",
      price: "₹15,999",
    },
    {
      image: badminton,
      title: "Badminton",
      desc: "Badminton is an Olympic racket sport played indoors using a shuttlecock.",
      players: "Singles/Doubles",
      price: "₹2,499",
    },
    {
      image: bowling,
      title: "Bowling",
      desc: "Bowling is an indoor sport where players roll a ball to knock down pins.",
      players: "Individual",
      price: "₹3,999",
    },
    {
      image: darts,
      title: "Darts",
      desc: "Darts is a precision game where players throw darts at a circular target board.",
      players: "2 Players",
      price: "₹999",
    },
    {
      image: foosball,
      title: "Foosball",
      desc: "Foosball, also called table football, is a fun tabletop game.",
      players: "2–4 Players",
      price: "₹8,999",
    },
  ];

  return (
    <>
      <div className="heading">
        <h1>
          Indoor <span>Games</span>
        </h1>
      </div>

      <section className="news-section">
        <div
          className="main-news-image"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url(${banner})`,
          }}
        >
          <h4 className="main-news-head">Indoor Sports</h4>
          <h1>
            Discover exciting indoor games that improve concentration, skill,
            and teamwork.
          </h1>
        </div>

        <div className="news-cards">
          {games.map((game, index) => (
            <div
              className="news-card"
              key={index}
              onClick={() => alert(`${game.title} Price: ${game.price}`)}
            >
              <img
                src={game.image}
                className="news-image"
                alt={game.title}
              />

              <div className="news-content">
                <h3>{game.title}</h3>

                <p>{game.desc}</p>

                <div className="comp-date">
                  <h4 className="comp">{game.players}</h4>
                  <h4 className="price">{game.price}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Premium Store Section */}
      <section className="store-section">
        <div className="store-container">
          <h2 className="store-title">
            🏬 Classic Mall Sports Store
          </h2>

          <p className="store-desc">
            Step into our premium sports store at the mall — where tradition
            meets modern style. From indoor classics to professional gear, every
            sports item is available in one place.
          </p>

          <div className="store-actions">
            <button className="store-btn primary">
              Explore Collection
            </button>

            <button className="store-btn secondary">
              Visit Mall Store
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default IndoorGames;