import { Link } from "react-router-dom";
import React from "react";
import "./../App.css";


function Navbar(){

return(
<nav>

<a href="/" className="logo">
<i className="fa-solid fa-table-tennis-paddle-ball"></i>
 Sports
</a>


<ul className="nav_link">

<li><a href="/">Home</a></li>

<Link to="/indoor-games">
    <button className="indoor-btn">
        Indoor Games
    </button>
</Link>

<li><a href="/outdoor">Outdoor Games</a></li>

</ul>


<div className="button">

<a href="#">SignUp</a>

<a href="#">Login</a>

</div>


</nav>
)

}

export default Navbar;