import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import FoodCard from "../../components/FoodCard/FoodCard";
import menuData from "../../data/menuData";
import "./Menu.css";

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Burger",
    "Pizza",
    "Popcorn",
    "Leg Piece",
    "Lollipop",
    "Wings",
    "Wrap",
    "Fries",
    "Nuggets",
    "Drinks",
  ];

  const filteredItems =
    selectedCategory === "All"
      ? menuData
      : menuData.filter(
          (item) => item.category === selectedCategory
        );

  return (
    <>
      <Navbar />

      <div className="menu-page">

        <h1 className="menu-title">
          🍗 Explore Our Menu
        </h1>

        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={
                selectedCategory === category
                  ? "active"
                  : ""
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="menu-container">
          {filteredItems.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
            />
          ))}
        </div>

      </div>
    </>
  );
}

export default Menu;