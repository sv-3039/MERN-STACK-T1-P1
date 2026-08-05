import { useState, useEffect } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import "../styles/Bags.css";

function Bags({ addToCart }) {
  const [bags, setBags] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");
      setBags(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filteredBags = bags.filter((bag) => {
    const matchesSearch = bag.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || bag.category.trim() === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* ================= HERO SECTION ================= */}

      <section className="hero">
        <div className="hero-overlay">
          <h1>👜 PREMIUM BAG COLLECTION</h1>

          <p>
            Discover luxury handbags, backpacks, laptop bags and sling bags at
            the best prices.
          </p>

          <div className="hero-buttons">
            <button className="shop-btn">Shop Now</button>

            <button className="explore-btn">
              Explore Collection
            </button>
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}

      <div className="bags-page">

        <h1 className="title">
          Our Premium Collection
        </h1>

        <p className="description">
          Find the perfect bag for every occasion.
        </p>

        <input
          className="search-box"
          type="text"
          placeholder="🔍 Search Bags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="category-buttons">

          <button
            onClick={() => setCategory("All")}
          >
            All
          </button>

          <button
            onClick={() => setCategory("Handbag")}
          >
            Handbag
          </button>

          <button
            onClick={() => setCategory("Backpack")}
          >
            Backpack
          </button>

          <button
            onClick={() => setCategory("Laptop")}
          >
            Laptop
          </button>

          <button
            onClick={() => setCategory("Sling")}
          >
            Sling
          </button>

        </div>

        <div className="bags-container">

          {filteredBags.length > 0 ? (

            filteredBags.map((bag) => (

              <ProductCard
                key={bag._id}
                bag={bag}
                addToCart={addToCart}
              />

            ))

          ) : (

            <h2>No Bags Found</h2>

          )}

        </div>

      </div>
    </>
  );
}

export default Bags;