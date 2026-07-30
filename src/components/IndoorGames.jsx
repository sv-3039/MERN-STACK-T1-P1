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


function IndoorGames(){


const games=[

{
image:chess,
title:"Chess",
desc:"Chess is a strategic board game played by two players that enhances thinking skills.",
players:"2 Players"
},

{
image:carrom,
title:"Carrom",
desc:"Carrom is a popular tabletop game where players pocket coins using a striker.",
players:"2–4 Players"
},

{
image:tableTennis,
title:"Table Tennis",
desc:"Table Tennis is a fast-paced racket sport played on a table divided by a net.",
players:"Singles/Doubles"
},

{
image:snooker,
title:"Snooker",
desc:"Snooker is played on a large table using cues and colored balls.",
players:"2 Players"
},

{
image:badminton,
title:"Badminton",
desc:"Badminton is an Olympic racket sport played indoors using a shuttlecock.",
players:"Singles/Doubles"
},

{
image:bowling,
title:"Bowling",
desc:"Bowling is an indoor sport where players roll a ball to knock down pins.",
players:"Individual"
},

{
image:darts,
title:"Darts",
desc:"Darts is a precision game where players throw darts at a circular target board.",
players:"2 Players"
},

{
image:foosball,
title:"Foosball",
desc:"Foosball, also called table football, is a fun tabletop game.",
players:"2–4 Players"
}

];



return(

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
Discover exciting indoor games that improve concentration,
skill, and teamwork.
</h1>


</div>




<div className="news-cards">


{
games.map((game,index)=>(


<div 
className="news-card"
key={index}
onClick={()=>
alert(game.title+" is an Indoor Game.")
}
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


<h4 className="comp">
Indoor Game
</h4>


<h4 className="news-date">
{game.players}
</h4>


</div>


</div>


</div>


))

}


</div>


</section>


</>

)


}


export default IndoorGames;