import React from "react";
import "../style.css";

import banner from "../assets/images/outdoor-banner.jpg";

import cricket from "../assets/images/cricket.jpg";
import football from "../assets/images/football.jpg";
import basketball from "../assets/images/basketball.jpg";
import volleyball from "../assets/images/volleyball.jpg";
import hockey from "../assets/images/hockey.jpg";
import athletics from "../assets/images/athletics.jpg";
import cycling from "../assets/images/cycling.jpg";
import tennis from "../assets/images/tennis.jpg";

function OutdoorGames() {
  const games = [
    {
      image: cricket,
      title: "Cricket",
      desc: "A team sport played with bat and ball, hugely popular worldwide.",
      players: "11 Players per team",
      price: "₹2,999",
    },
    {
      image: football,
      title: "Football",
      desc: "The world's most popular sport, played on a field with goals.",
      players: "11 Players per team",
      price: "₹1,999",
    },
    {
      image: basketball,
      title: "Basketball",
      desc: "Fast-paced game played on a court with hoops.",
      players: "5 Players per team",
      price: "₹2,499",
    },
    {
      image: volleyball,
      title: "Volleyball",
      desc: "Played with a ball over a net, requiring teamwork and agility.",
      players: "6 Players per team",
      price: "₹1,499",
    },
    {
      image: hockey,
      title: "Hockey",
      desc: "Field hockey is played with sticks and a ball on grass or turf.",
      players: "11 Players per team",
      price: "₹3,499",
    },
    {
      image: athletics,
      title: "Athletics",
      desc: "Includes track and field events like running, jumping, and throwing.",
      players: "Individual/Team",
      price: "₹4,999",
    },
    {
      image: cycling,
      title: "Cycling",
      desc: "Outdoor endurance sport on bicycles, both competitive and recreational.",
      players: "Individual/Team",
      price: "₹12,999",
    },
    {
      image: tennis,
      title: "Tennis",
      desc: "Outdoor racket sport played on a court with singles or doubles.",
      players: "Singles/Doubles",
      price: "₹3,999",
    },
  ];

  return (
    <>
      <div className="heading">
        <h1>
          Outdoor <span>Games</span>
        </h1>
      </div>

      <section className="news-section">
        <div
          className="main-news-image"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url(${banner})`,
          }}
        >
          <h4 className="main-news-head">Outdoor Sports</h4>

          <h1>
            Experience thrilling outdoor games that build stamina, teamwork, and
            competitive spirit.
          </h1>
        </div>

        <div className="news-cards">
          {games.map((game, index) => (
            <div
              className="news-card"
              key={index}
              onClick={() =>
                alert(
                  `${game.title}\nPrice: ${game.price}\nPlayers: ${game.players}`
                )
              }
            >
              <img
                src={game.image}
                className="news-image"
                alt={game.title}
              />

              <div className="news-content">
                <h3>{game.title}</h3>

                <p>{game.desc}</p>

                <h3 className="game-price">{game.price}</h3>

                <div className="comp-date">
                  <h4 className="comp">{game.players}</h4>
                  <h4 className="price">Outdoor Game</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Premium Store Section */}
      <section className="store-section">
        <div className="store-container">
          <h2 className="store-title">🏬 Classic Mall Sports Store</h2>

          <p className="store-desc">
            From cricket bats to football kits — our mall store has every
            outdoor sports item you need. Gear up for the game with premium
            equipment.
          </p>

          <div className="store-actions">
            <button className="store-btn primary">
              Explore Outdoor Gear
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

export default OutdoorGames;