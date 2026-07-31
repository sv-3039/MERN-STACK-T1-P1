import React, { useState } from "react";
import "./Shoes.css";
import {
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

function Shoes() {
  const [shoes] = useState([
    {
  id: 1,
  name: "Nike Air Max 270",
  brand: "Nike",
  price: 2499,
  oldPrice: 2999,
  rating: 4.8,
  offer: "17% OFF",
  image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
},
{
  id: 2,
  name: "Adidas Ultraboost",
  brand: "Adidas",
  price: 2399,
  oldPrice: 2899,
  rating: 4.7,
  offer: "17% OFF",
  image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500",
},
{
  id: 3,
  name: "Puma RS-X",
  brand: "Puma",
  price: 2199,
  oldPrice: 2699,
  rating: 4.6,
  offer: "19% OFF",
  image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500",
},
{
  id: 4,
  name: "New Balance 574",
  brand: "New Balance",
  price: 2299,
  oldPrice: 2799,
  rating: 4.5,
  offer: "18% OFF",
  image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500",
},
{
  id: 5,
  name: "Reebok Classic",
  brand: "Reebok",
  price: 1799,
  oldPrice: 2299,
  rating: 4.4,
  offer: "22% OFF",
  image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500",
},
{
  id: 6,
  name: "Converse Chuck Taylor",
  brand: "Converse",
  price: 1999,
  oldPrice: 2499,
  rating: 4.6,
  offer: "20% OFF",
  image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500",
},
{
  id: 7,
  name: "Nike Revolution 6",
  brand: "Nike",
  price: 2299,
  oldPrice: 2799,
  rating: 4.7,
  offer: "18% OFF",
  image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=500",
},
{
  id: 8,
  name: "Skechers Go Walk",
  brand: "Skechers",
  price: 1899,
  oldPrice: 2399,
  rating: 4.5,
  offer: "21% OFF",
  image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500",
},
{
  id: 9,
  name: "Nike Air Force 1",
  brand: "Nike",
  price: 2499,
  oldPrice: 2999,
  rating: 4.9,
  offer: "17% OFF",
  image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
},
{
  id: 10,
  name: "Adidas Superstar",
  brand: "Adidas",
  price: 2299,
  oldPrice: 2799,
  rating: 4.7,
  offer: "18% OFF",
  image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500",
},
{
  id: 11,
  name: "Crocs Classic Clog",
  brand: "Crocs",
  price: 1999,
  oldPrice: 2499,
  rating: 4.8,
  offer: "20% OFF",
  image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500",
},
{
  id: 13,
  name: "Birkenstock Arizona Sandals",
  brand: "Birkenstock",
  price: 2499,
  oldPrice: 2999,
  rating: 4.9,
  offer: "17% OFF",
  image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500",
},
{
  id: 14,
  name: "Havaianas Top Flip Flops",
  brand: "Havaianas",
  price: 1499,
  oldPrice: 1999,
  rating: 4.7,
  offer: "25% OFF",
  image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=500",
},
{
  id: 15,
  name: "Nike Air Zoom Pegasus (Men)",
  brand: "Nike",
  category: "Men",
  price: 2499,
  oldPrice: 2999,
  rating: 4.9,
  offer: "17% OFF",
  image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
},
{
  id: 16,
  name: "Adidas Grand Court (Women)",
  brand: "Adidas",
  category: "Women",
  price: 2299,
  oldPrice: 2799,
  rating: 4.8,
  offer: "18% OFF",
  image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500",
},
{
  id:16,
  name:"Bata(mens)",
  brand:"Bata",
  Category:"mens",
  price:499,
  OldPrice:"699",
  rating:4.5,
  offer:"22%",
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMoOGpN4ec24w0wkgaC5s5an2BhD1VQNPaKICyDdASMg&s=10",
},

  ]);

  return (
    <div className="page">

      {/* Navbar */}

      <nav className="navbar">

        <h2 className="logo">Choose Your Brand</h2>

        <div className="searchBox">
          <input type="text" placeholder="Search shoes..." />
          <button>
            <FaSearch />
          </button>
        </div>

        <div className="menu">
          <a href="#">Home</a>
          <a href="#">Men</a>
          <a href="#">Women</a>
          <a href="#">Shoes</a>
          <a href="#">Orders</a>

          <FaHeart className="icon" />
          <FaShoppingCart className="icon" />
          <FaUserCircle className="icon" />
        </div>

      </nav>

      {/* Hero */}

    


      <div className="heading">

        

        <p>{shoes.length} Products Available</p>

      </div>

      {/* Products */}

      <div className="products">

        {shoes.map((shoe) => (

          <div className="card" key={shoe.id}>

            <span className="offer">{shoe.offer}</span>

            <FaHeart className="wishlist" />

            <img src={shoe.image} alt={shoe.name} />

            <div className="details">

              <h3>{shoe.name}</h3>

              <p>{shoe.brand}</p>

              <div className="rating">

                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />

                <span>{shoe.rating}</span>

              </div>

              <div className="price">

                <h2>₹{shoe.price}</h2>

                <del>₹{shoe.oldPrice}</del>

              </div>

              <button>Add To Cart</button>

            </div>

          </div>

        ))}

      </div>

      {/* Footer */}

      <footer>

        <h2>ShopEase</h2>

        <p>
          Premium Shopping Experience for Shoes, Fashion &
          Lifestyle.
        </p>

        <p>© 2026 ShopEase. All Rights Reserved.</p>

      </footer>

    </div>
  );
}

export default Shoes;