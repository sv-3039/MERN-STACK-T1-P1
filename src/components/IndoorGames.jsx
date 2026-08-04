import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";
import "../App.css";

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


  const [cart, setCart] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);



  const games = [

    {
      image: chess,
      title:"Chess",
      desc:"Chess is a strategic board game played by two players.",
      players:"2 Players",
      price:799,
      details:"Chess improves memory, concentration and problem solving skills."
    },

    {
      image:carrom,
      title:"Carrom",
      desc:"Carrom is a popular tabletop indoor game.",
      players:"2-4 Players",
      price:1499,
      details:"Carrom improves accuracy, patience and strategic thinking."
    },

    {
      image:tableTennis,
      title:"Weight Lifting",
      desc:"Strength training exercise using weights.",
      players:"Individual",
      price:4999,
      details:"Builds muscle strength and improves fitness."
    },


    {
      image:snooker,
      title:"Snooker",
      desc:"Indoor cue sport played with colored balls.",
      players:"2 Players",
      price:15999,
      details:"Improves focus, calculation and precision."
    },


    {
      image:badminton,
      title:"Badminton",
      desc:"Olympic racket sport played indoors.",
      players:"Singles/Doubles",
      price:2499,
      details:"Improves speed, stamina and coordination."
    },


    {
      image:bowling,
      title:"Bowling",
      desc:"Roll a ball to hit pins.",
      players:"Individual",
      price:3999,
      details:"A fun competitive indoor activity."
    },


    {
      image:darts,
      title:"Darts",
      desc:"Throw darts at a target board.",
      players:"2 Players",
      price:999,
      details:"Improves hand-eye coordination."
    },


    {
      image:foosball,
      title:"Foosball",
      desc:"Table football game.",
      players:"2-4 Players",
      price:8999,
      details:"Fast multiplayer entertainment game."
    }

  ];





  // Add Cart

  const addCart = (game)=>{

    const alreadyAdded = cart.find(
      item=>item.title === game.title
    );


    if(!alreadyAdded){

      setCart(prev=>[
        ...prev,
        game
      ]);

    }

    else{

      alert("Already added to cart");

    }

  };





  // Remove Cart

  const removeCart=(title)=>{

    setCart(
      cart.filter(
        item=>item.title !== title
      )
    );

  };







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

      backgroundImage:
      `linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url(${banner})`

    }}

    >


    <h4 className="main-news-head">
      Indoor Sports
    </h4>



    <h1>

    Discover exciting indoor games that improve
    concentration, skill and teamwork.

    </h1>


    </div>







    <div className="news-cards">


    {

    games.map((game,index)=>(


    <div

    className="news-card"

    key={index}

    >



    <img

    src={game.image}

    className="news-image"

    alt={game.title}

    />





    <div className="news-content">



    <h3>

    {game.title}

    </h3>




    <p>

    {game.desc}

    </p>






    <div className="comp-date">


    <h4>

    {game.players}

    </h4>




    <h4 className="price">

    ₹{game.price}

    </h4>



    </div>







    <button

    className="details-btn"

    onClick={()=>setSelectedGame(game)}

    >

    View Details

    </button>







    <button

    className="cart-btn"

    onClick={()=>addCart(game)}

    >

    Add To Cart 🛒

    </button>







    </div>





    </div>



    ))

    }



    </div>






    </section>









    {/* GAME DETAILS POPUP */}



    {

    selectedGame && (


    <div className="popup">



    <div className="popup-box">





    <img

    src={selectedGame.image}

    width="250"

    alt={selectedGame.title}

    />





    <h2>

    {selectedGame.title}

    </h2>





    <p>

    <b>Description:</b>

    {selectedGame.desc}

    </p>





    <p>

    <b>Players:</b>

    {selectedGame.players}

    </p>





    <p>

    <b>Information:</b>

    {selectedGame.details}

    </p>





    <h3>

    Price : ₹{selectedGame.price}

    </h3>






    <button

    className="cart-btn"

    onClick={()=>addCart(selectedGame)}

    >

    Add To Cart 🛒

    </button>






    <button

    className="details-btn"

    onClick={()=>setSelectedGame(null)}

    >

    Close

    </button>





    </div>


    </div>


    )

    }









    {/* CART SECTION */}



    <section className="cart-section">


    <h2>

    🛒 Your Cart

    </h2>





    {

    cart.length===0 ?


    (

    <p>
    Cart is empty
    </p>

    )


    :


    (

    cart.map((item,index)=>(



    <div key={index}>


    <h3>


    {item.title}

    - ₹{item.price}




    <button

    onClick={()=>removeCart(item.title)}

    >

    ❌

    </button>



    </h3>


    </div>


    ))

    )


    }





    <h3>

    Total :

    ₹

    {

    cart.reduce(

    (total,item)=>

    total + item.price,

    0

    )

    }


    </h3>



    </section>









    <section className="store-section">


    <div className="store-container">


    <h2 className="store-title">

    🏬 Classic Mall Sports Store

    </h2>




    <p className="store-desc">

    Step into our premium sports store at the mall —
    where tradition meets modern style.

    </p>



    </div>


    </section>





    </>

  );

}



export default IndoorGames;