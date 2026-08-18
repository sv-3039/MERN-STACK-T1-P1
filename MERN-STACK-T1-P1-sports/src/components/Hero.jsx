import React from "react";
import "../App.css";

import sports from "../assets/images/sports.jpg";


function Hero(){

function explore(){

alert("Welcome to Sports Hub!");

}


return(

<main style={{
backgroundImage:
`linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.6)),url(${sports})`
}}>


<div className="main-content">

<div className="main-heading">

<h1>
The Future Of 
<span> Sports </span>
Fandom
</h1>


<p>
Experience the world of sports, tournaments,
teams and exciting games all in one place.
</p>


<button onClick={explore}>
Explore More &gt;
</button>


</div>

</div>


</main>

)

}

export default Hero;