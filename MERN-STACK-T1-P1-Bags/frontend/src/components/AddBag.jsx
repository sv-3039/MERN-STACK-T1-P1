import { useState } from "react";
import API from "../api/axios";

function AddBag(){

    const [bag,setBag] = useState({
        name:"",
        brand:"",
        price:"",
        category:"",
        image:"",
        rating:"",
        discount:""
    });


    const handleChange = (e)=>{
        setBag({
            ...bag,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async(e)=>{
        e.preventDefault();

        try{
            await API.post("/products", bag);
            alert("Bag Added Successfully");
        }
        catch(error){
            console.log(error);
        }
    };


    return(
        <form onSubmit={handleSubmit}>

            <input name="name" placeholder="Bag Name" onChange={handleChange}/>
            <input name="brand" placeholder="Brand" onChange={handleChange}/>
            <input name="price" placeholder="Price" onChange={handleChange}/>
            <input name="category" placeholder="Category" onChange={handleChange}/>
            <input name="image" placeholder="Image URL" onChange={handleChange}/>
            <input name="rating" placeholder="Rating" onChange={handleChange}/>
            <input name="discount" placeholder="Discount" onChange={handleChange}/>

            <button>Add Bag</button>

        </form>
    );
}

export default AddBag;