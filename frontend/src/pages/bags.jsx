import { useState } from "react";
import ProductCard from "../components/ProductCard";
import bags from "../data/bags";
import "../styles/Bags.css";

function Bags({ addToCart }) {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");


  


  const filteredBags = bags.filter((bag) => {

    const matchesSearch = bag.name
      .toLowerCase()
      .includes(search.toLowerCase());


    const matchesCategory =
      category === "All" || bag.category === category;


    return matchesSearch && matchesCategory;

  });


  return (

    <>



      <section className="hero">

        <h1>👜 Premium Bags Collection</h1>

        <p>
          Discover stylish handbags, backpacks, laptop bags, and more.
        </p>

      </section>



      <div className="bags-page">


       



        <h1 className="title">
          Bags Collection
        </h1>


        <p className="description">
          Find the best bags at affordable prices.
        </p>



        <input

          className="search-box"

          type="text"

          placeholder="Search bags..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

        />




        <div className="category-buttons">

          <button onClick={()=>setCategory("All")}>
            All
          </button>

          <button onClick={()=>setCategory("Handbag")}>
            Handbag
          </button>

          <button onClick={()=>setCategory("Backpack")}>
            Backpack
          </button>

          <button onClick={()=>setCategory("Laptop")}>
            Laptop
          </button>

          <button onClick={()=>setCategory("Sling")}>
            Sling
          </button>

        </div>




        <div className="bags-container">


        {
          filteredBags.length > 0 ?

          filteredBags.map((bag)=>(

            <ProductCard

              key={bag.id}

              bag={bag}

              addToCart={addToCart}

            />

          ))

          :

          <h2>No Bags Found</h2>

        }


        </div>



      </div>


    </>

  );

}

export default Bags;