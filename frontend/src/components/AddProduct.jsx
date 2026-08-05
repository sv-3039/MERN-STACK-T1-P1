import { useState } from "react";
import API from "../api/axios";

function AddProduct(){

    const [product,setProduct] = useState({
        name:"",
        brand:"",
        price:"",
        category:"",
        image:"",
        rating:"",
        discount:""
    });


    const handleChange = (e)=>{
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async(e)=>{
        e.preventDefault();

        try{

            const response = await API.post("/products", product);

            console.log(response.data);

            alert("Bag Added Successfully");

            setProduct({
                name:"",
                brand:"",
                price:"",
                category:"",
                image:"",
                rating:"",
                discount:""
            });

        }
        catch(error){
            console.log(error);
        }
    };


    return(
        <div>

            <h2>Add Bag</h2>

            <form onSubmit={handleSubmit}>

                <input
                name="name"
                placeholder="Bag Name"
                value={product.name}
                onChange={handleChange}
                />


                <input
                name="brand"
                placeholder="Brand"
                value={product.brand}
                onChange={handleChange}
                />


                <input
                type="number"
                name="price"
                placeholder="Price"
                value={product.price}
                onChange={handleChange}
                />


                <input
                name="category"
                placeholder="Category"
                value={product.category}
                onChange={handleChange}
                />


                <input
                name="image"
                placeholder="Image URL"
                value={product.image}
                onChange={handleChange}
                />


                <input
                type="number"
                name="rating"
                placeholder="Rating"
                value={product.rating}
                onChange={handleChange}
                />


                <input
                type="number"
                name="discount"
                placeholder="Discount %"
                value={product.discount}
                onChange={handleChange}
                />


                <button type="submit">
                    Add Bag
                </button>

            </form>

        </div>
    );
}

export default AddProduct;