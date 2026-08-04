import React, { useState, useEffect } from "react";
import "./Shoes.css";
import {
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaSearch,
  FaTrash,
  FaTimes,
  FaQrcode,
} from "react-icons/fa";
import { getCart, saveCart, getAddress, saveAddress } from "./authUtils";
import Checkout from "./Checkout";
import Scanner from "./Scanner";

// Guest storage key used for cart/address persistence now that login is removed.
const GUEST_EMAIL = "guest";

function Shoes() {
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("all"); // all | men | women

  const [shoes] = useState([
    // ---------- Men's ----------
    {
      id: 1,
      name: "Nike Air Max 270",
      brand: "Nike",
      gender: "men",
      price: 1799,
      oldPrice: 2199,
      rating: 4.8,
      offer: "18% OFF",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    },
    {
      id: 2,
      name: "Adidas Ultraboost",
      brand: "Adidas",
      gender: "men",
      price: 1699,
      oldPrice: 2099,
      rating: 4.7,
      offer: "19% OFF",
      image:
        "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500",
    },
    {
      id: 3,
      name: "Puma RS-X",
      brand: "Puma",
      gender: "men",
      price: 1499,
      oldPrice: 1899,
      rating: 4.6,
      offer: "21% OFF",
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500",
    },
    {
      id: 4,
      name: "Reebok Classic",
      brand: "Reebok",
      gender: "men",
      price: 1199,
      oldPrice: 1599,
      rating: 4.4,
      offer: "25% OFF",
      image:
        "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500",
    },
    {
      id: 5,
      name: "Nike Air Force 1",
      brand: "Nike",
      gender: "men",
      price: 1799,
      oldPrice: 2199,
      rating: 4.9,
      offer: "18% OFF",
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
    },
    {
      id: 6,
      name: "Nike Air Zoom Pegasus",
      brand: "Nike",
      gender: "men",
      price: 1999,
      oldPrice: 2499,
      rating: 4.7,
      offer: "20% OFF",
      image:
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500",
    },
    {
      id: 7,
      name: "Adidas Duramo SL",
      brand: "Adidas",
      gender: "men",
      price: 999,
      oldPrice: 1399,
      rating: 4.3,
      offer: "29% OFF",
      image:
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500",
    },
    // ---------- Women's ----------
    {
      id: 8,
      name: "Nike Air Max Women",
      brand: "Nike",
      gender: "women",
      price: 1699,
      oldPrice: 2099,
      rating: 4.8,
      offer: "19% OFF",
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500",
    },
    {
      id: 9,
      name: "Adidas Ultraboost Women",
      brand: "Adidas",
      gender: "women",
      price: 1599,
      oldPrice: 1999,
      rating: 4.6,
      offer: "20% OFF",
      image:
        "https://images.unsplash.com/photo-1465453869711-7e174808ace9?w=500",
    },
    {
      id: 10,
      name: "Puma Cali Sport",
      brand: "Puma",
      gender: "women",
      price: 1399,
      oldPrice: 1799,
      rating: 4.5,
      offer: "22% OFF",
      image:
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500",
    },
    {
      id: 11,
      name: "Reebok Classic Women",
      brand: "Reebok",
      gender: "women",
      price: 799,
      oldPrice: 1099,
      rating: 4.4,
      offer: "27% OFF",
      image:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
    },
    {
      id: 12,
      name: "Skechers Go Walk",
      brand: "Skechers",
      gender: "women",
      price: 499,
      oldPrice: 699,
      rating: 4.5,
      offer: "29% OFF",
      image:
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500",
    },
    {
      id: 13,
      name: "New Balance 574 Women",
      brand: "New Balance",
      gender: "women",
      price: 1299,
      oldPrice: 1699,
      rating: 4.6,
      offer: "24% OFF",
      image:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500",
    },
  ]);

  const [cart, setCart] = useState(() => getCart(GUEST_EMAIL));
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [address, setAddress] = useState(() => getAddress(GUEST_EMAIL));
  const [productScannerOpen, setProductScannerOpen] = useState(false);

  // Persist the cart for this user whenever it changes
  useEffect(() => {
    saveCart(GUEST_EMAIL, cart);
  }, [cart]);

  // Persist the delivery address whenever it changes
  useEffect(() => {
    if (address) saveAddress(GUEST_EMAIL, address);
  }, [address]);

  // Show a brief "added to cart" confirmation
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 1800);
    return () => clearTimeout(timer);
  }, [toast]);

  const filteredShoes = shoes.filter((shoe) => {
    const matchesSearch = shoe.name.toLowerCase().includes(search.toLowerCase());
    const matchesGender = genderFilter === "all" || shoe.gender === genderFilter;
    return matchesSearch && matchesGender;
  });

  const addToCart = (shoe) => {
    const existing = cart.find((item) => item.id === shoe.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === shoe.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...shoe, quantity: 1 }]);
    }

    setToast(`${shoe.name} added to cart`);
    setCartOpen(true);
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const buyProducts = () => {
    if (cart.length === 0) {
      alert("Cart is empty.");
      return;
    }

    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleOrderComplete = (method) => {
    setCart([]);
    setToast(
      method === "cod" ? "Order placed · Pay on delivery" : "Payment successful via UPI"
    );
  };

  // Scans a QR/barcode encoding either a numeric product id or a shoe name,
  // and filters the product list down to that match.
  const handleProductScan = (rawData) => {
    setProductScannerOpen(false);

    const byId = shoes.find((s) => String(s.id) === rawData.trim());
    const byName = shoes.find((s) =>
      s.name.toLowerCase().includes(rawData.trim().toLowerCase())
    );
    const match = byId || byName;

    if (match) {
      setGenderFilter("all");
      setSearch(match.name);
      setToast(`Found: ${match.name}`);
    } else {
      setToast("No matching product found for that code");
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="page">
      {/* Navbar */}

      <nav className="navbar">
        <h2 className="logo">Choose Your Brand</h2>

        <div className="searchBox">
          <input
            type="text"
            placeholder="Search shoes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="button" title="Search">
            <FaSearch />
          </button>

          <button
            type="button"
            className="scanSearchBtn"
            title="Scan a product code"
            onClick={() => setProductScannerOpen(true)}
          >
            <FaQrcode />
          </button>
        </div>

        <div className="menu">
          <button
            className={`navFilterBtn ${genderFilter === "all" ? "active" : ""}`}
            onClick={() => setGenderFilter("all")}
          >
            Home
          </button>

          <button
            className={`navFilterBtn ${genderFilter === "men" ? "active" : ""}`}
            onClick={() => setGenderFilter("men")}
          >
            Men
          </button>

          <button
            className={`navFilterBtn ${genderFilter === "women" ? "active" : ""}`}
            onClick={() => setGenderFilter("women")}
          >
            Women
          </button>

          <a href="/">Orders</a>

          <FaHeart className="icon" />

          <div className="icon cartIcon" onClick={() => setCartOpen(true)}>
            <FaShoppingCart />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </div>

        </div>
      </nav>

      {/* Heading */}

      <div className="heading">
        <p>{filteredShoes.length} Products Available</p>
      </div>

      {/* Products */}

      <div className="products">
        {filteredShoes.map((shoe) => {
          const inCart = cart.find((item) => item.id === shoe.id);

          return (
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

                <button onClick={() => addToCart(shoe)}>
                  {inCart ? `In Cart (${inCart.quantity}) · Add More` : "Add To Cart"}
                </button>
              </div>
            </div>
          );
        })}

        {filteredShoes.length === 0 && (
          <p className="noResults">No shoes match your search or filter.</p>
        )}
      </div>

      {/* Cart Drawer */}

      {cartOpen && <div className="cartOverlay" onClick={() => setCartOpen(false)} />}

      <div className={`cart ${cartOpen ? "cartOpen" : ""}`}>
        <div className="cartHeader">
          <h2>Shopping Cart</h2>
          <FaTimes className="closeCart" onClick={() => setCartOpen(false)} />
        </div>

        {cart.length === 0 ? (
          <p className="emptyCart">Your cart is empty.</p>
        ) : (
          <>
            <div className="cartItems">
              {cart.map((item) => (
                <div className="cartItem" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cartItemInfo">
                    <h3>{item.name}</h3>
                    <p>₹{item.price}</p>
                  </div>

                  <div className="qtyControls">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>

                  <button className="removeBtn" onClick={() => removeItem(item.id)}>
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            <div className="cartFooter">
              <h2>Total: ₹{total}</h2>

              <button className="buyBtn" onClick={buyProducts}>
                Buy Now
              </button>
            </div>
          </>
        )}
      </div>

      {/* Checkout */}

      {checkoutOpen && (
        <Checkout
          cart={cart}
          total={total}
          address={address}
          onSelectAddress={setAddress}
          onClose={() => setCheckoutOpen(false)}
          onOrderComplete={handleOrderComplete}
        />
      )}

      {/* Product scanner */}

      {productScannerOpen && (
        <Scanner
          title="Scan Product Code"
          hint="Point your camera at a product QR/barcode"
          onDetected={handleProductScan}
          onClose={() => setProductScannerOpen(false)}
        />
      )}

      {/* Toast */}

      {toast && <div className="toast">{toast}</div>}

      {/* Footer */}

      <footer>
        <h2>ShopEase</h2>

        <p>Premium Shopping Experience for Shoes, Fashion & Lifestyle.</p>

        <p>© 2026 ShopEase. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Shoes;

