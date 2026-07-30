import Navbar from "../../components/Navbar/Navbar";
import FoodCard from "../../components/FoodCard/FoodCard";
import menuData from "../../data/menuData";
import "./Menu.css";

function Menu() {
  return (
    <>
      <Navbar />

      <div className="menu-page">
        <h1 className="menu-heading">Our Delicious Menu</h1>

        <div className="menu-container">
          {menuData.map((item) => (
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