import avengers from "../assets/movies/avengers.jpg";
import avatar from "../assets/movies/avatar.jpg";
const joker = "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600";
import interstellar from "../assets/movies/interstellar.jpg";
import batman from "../assets/movies/batman.jpg";
import f1 from "../assets/movies/f1.jpg";

const movies = [
  {
    id: 1,
    title: "Avengers: Endgame",
    genre: "Action",
    language: "English",
    duration: "3h 1m",
    rating: "8.4",
    releaseDate: "26 April 2019",
    director: "Anthony Russo, Joe Russo",
    cast: "Robert Downey Jr., Chris Evans, Scarlett Johansson, Mark Ruffalo",
    description:
      "After the devastating events of Infinity War, the remaining Avengers unite for one final mission to reverse Thanos' actions and restore balance to the universe.",
    image: avengers,
  },

  {
    id: 2,
    title: "Avatar: The Way of Water",
    genre: "Sci-Fi",
    language: "English",
    duration: "3h 12m",
    rating: "7.9",
    releaseDate: "16 December 2022",
    director: "James Cameron",
    cast: "Sam Worthington, Zoe Saldana, Sigourney Weaver",
    description:
      "Jake Sully and Neytiri build a family and face a new threat that forces them to protect Pandora and their loved ones.",
    image: avatar,
  },

  {
    id: 3,
    title: "Joker",
    genre: "Drama",
    language: "English",
    duration: "2h 2m",
    rating: "8.5",
    releaseDate: "4 October 2019",
    director: "Todd Phillips",
    cast: "Joaquin Phoenix, Robert De Niro, Zazie Beetz",
    description:
      "A failed comedian struggles with mental illness and isolation before transforming into Gotham City's infamous Joker.",
    image: joker,
  },

  {
    id: 4,
    title: "Interstellar",
    genre: "Sci-Fi",
    language: "English",
    duration: "2h 49m",
    rating: "8.7",
    releaseDate: "7 November 2014",
    director: "Christopher Nolan",
    cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
    description:
      "A group of astronauts travel through a wormhole in search of a new home for humanity as Earth faces extinction.",
    image: interstellar,
  },

  {
    id: 5,
    title: "The Batman",
    genre: "Action",
    language: "English",
    duration: "2h 56m",
    rating: "7.8",
    releaseDate: "4 March 2022",
    director: "Matt Reeves",
    cast: "Robert Pattinson, Zoë Kravitz, Paul Dano",
    description:
      "Batman investigates a series of murders committed by the Riddler while uncovering deep corruption within Gotham City.",
    image: batman,
  },

  {
    id: 6,
    title: "F1",
    genre: "Sports",
    language: "English",
    duration: "2h 35m",
    rating: "8.2",
    releaseDate: "27 June 2025",
    director: "Joseph Kosinski",
    cast: "Brad Pitt, Damson Idris, Kerry Condon",
    description:
      "A retired Formula One driver returns to the track to mentor a talented young racer and help save a struggling team.",
    image: f1,
  },
];

export default movies;