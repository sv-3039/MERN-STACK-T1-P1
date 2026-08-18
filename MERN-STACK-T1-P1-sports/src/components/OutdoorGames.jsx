import React, { useState } from "react";
import "../style.css";
import "../App.css";

const banner = "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=1200";

const cricket = "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600";
const football = "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600";
const cycling = "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=600";
const tennis = "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600";

import basketball from "../assets/images/basketball.jpg";
import volleyball from "../assets/images/volleyball.jpg";
import hockey from "../assets/images/hockey.jpg";
import athletics from "../assets/images/athletics.jpg";


function OutdoorGames() {


const [cart,setCart] = useState([]);

const [selectedGame,setSelectedGame] = useState(null);



const games=[

{
image:cricket,
title:"Cricket",
desc:"A team sport played with bat and ball, hugely popular worldwide.",
players:"11 Players per team",
price:2999,
details:"Cricket improves teamwork, batting skills, bowling skills and physical fitness."
},


{
image:football,
title:"Football",
desc:"The world's most popular sport, played on a field with goals.",
players:"11 Players per team",
price:1999,
details:"Football improves stamina, speed and team coordination."
},


{
image:basketball,
title:"Basketball",
desc:"Fast-paced game played on a court with hoops.",
players:"5 Players per team",
price:2499,
details:"Basketball improves jumping ability, speed and teamwork."
},


{
image:volleyball,
title:"Volleyball",
desc:"Played with a ball over a net requiring teamwork.",
players:"6 Players per team",
price:1499,
details:"Volleyball improves communication and agility."
},


{
image:hockey,
title:"Hockey",
desc:"Field hockey is played with sticks and a ball.",
players:"11 Players per team",
price:3499,
details:"Hockey improves coordination and endurance."
},


{
image:athletics,
title:"Athletics",
desc:"Track and field events like running and jumping.",
players:"Individual/Team",
price:4999,
details:"Athletics improves strength, speed and fitness."
},


{
image:cycling,
title:"Cycling",
desc:"Outdoor endurance sport using bicycles.",
players:"Individual/Team",
price:12999,
details:"Cycling improves stamina and cardiovascular fitness."
},


{
image:tennis,
title:"Tennis",
desc:"Outdoor racket sport played on a court.",
players:"Singles/Doubles",
price:3999,
details:"Tennis improves reflexes and concentration."
}

];




// Add cart

const addCart=(game)=>{

const exist=cart.find(
item=>item.title===game.title
);


if(!exist){

setCart([
...cart,
game
]);

}

else{

alert("Already added to cart");

}

};




// Remove cart

const removeCart=(title)=>{

setCart(
cart.filter(
item=>item.title!==title
)
);

};




return(

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

backgroundImage:

`linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url(${banner})`

}}

>


<h4 className="main-news-head">

Outdoor Sports

</h4>


<h1>

Experience thrilling outdoor games that build stamina,
teamwork and competitive spirit.

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


<h4 className="comp">

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







{/* Details Popup */}


{

selectedGame &&

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

}







{/* Cart Section */}



<section className="cart-section">


<h2>

🛒 Your Cart

</h2>




{

cart.length===0 ?


<p>

Cart is empty

</p>


:

cart.map((item,index)=>(


<div key={index}>


<h3>


{item.title} - ₹{item.price}


<button

onClick={()=>removeCart(item.title)}

>

❌

</button>


</h3>


</div>


))


}





<h3>

Total :

₹

{

cart.reduce(

(total,item)=>total+item.price,

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

From cricket bats to football kits —
our mall store has every outdoor sports item.

</p>


</div>


</section>





</>

);


}


export default OutdoorGames;