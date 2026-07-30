import React from "react";

import aramco from "../assets/images/aramco.webp";
import Emirates from "../assets/images/Emirates.webp";
import MRF from "../assets/images/MRF-TYPES.webp";
import Booking from "../assets/images/Booking.webp";
import byjus from "../assets/images/byjus.webp";


function Partners(){

const images=[
aramco,
Emirates,
MRF,
Booking,
byjus
];


return(

<div className="partners">


<div className="partners-1">

{
images.map((img,index)=>(

<img 
key={index}
src={img}
alt="partner"
/>

))
}

</div>



<div className="partners-2">

{
[...images,...images].map((img,index)=>(

<img
key={index}
src={img}
alt="partner"
/>

))

}

</div>


</div>

)

}

export default Partners;