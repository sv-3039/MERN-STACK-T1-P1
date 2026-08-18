import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import About from "./components/About";
import Offers from "./components/Offers";

// API base URL
const API_URL = "http://localhost:5000/api";

function App() {
  // Helper to render a 5-star row based on rating value
  const renderStars = (rating) => {
    const full = Math.round(rating);
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      stars += i <= full ? "\u2605" : "\u2606";
    }
    return stars;
  };

  // ---- Products loaded from MongoDB (with fallback) ----
  const defaultCosmetics = [
    { _id: "c1", name: "Fit Me Foundation", brand: "Maybelline", price: 699, category: "face-makeup", rating: 4.5, reviews: 124, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300" },
    { _id: "c2", name: "Radiance Compact Powder", brand: "Lakme", price: 399, category: "face-makeup", rating: 4.3, reviews: 89, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300" },
    { _id: "c3", name: "Matte Liquid Lipstick", brand: "MAC", price: 1499, category: "lip-products", rating: 4.8, reviews: 210, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300" },
    { _id: "c4", name: "Volume Mascara", brand: "L'Oreal", price: 549, category: "eye-makeup", rating: 4.6, reviews: 95, image: "https://images.unsplash.com/photo-1560700146-1c4354914c8d?w=300" },
    { _id: "c5", name: "Hydrating Serum", brand: "The Ordinary", price: 850, category: "skincare", rating: 4.7, reviews: 320, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300" },
    { _id: "c6", name: "Gel Nail Polish", brand: "OPI", price: 450, category: "nail-care", rating: 4.4, reviews: 60, image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=300" },
    { _id: "c7", name: "Rose Water Spray", brand: "Forest Essentials", price: 975, category: "fragrance", rating: 4.9, reviews: 150, image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=300" }
  ];

  const [products, setProducts] = useState(defaultCosmetics);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      })
      .catch((err) => console.warn("Using offline cosmetics products:", err));
  }, []);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showOffers, setShowOffers] = useState(false);
  const [discount, setDiscount] = useState(0);

  // ---- Controlled order form state ----
  const [customer, setCustomer] = useState({
    customerName: "",
    phone: "",
    address: "",
  });
  const [orderError, setOrderError] = useState("");

  const addToCart = (product) => {
    const existingItem = cart.find(item => item._id === product._id);
    if (existingItem) {
      setCart(cart.map(item => 
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setShowCart(true);
    setShowAbout(false);
    setShowOffers(false);
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => {
      if (item._id === id) {
        return { ...item, quantity: item.quantity + delta };
      }
      return item;
    }).filter(item => item.quantity > 0)); 
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // ---- Place order handler ----
  const handlePlaceOrder = async () => {
    // Validate form
    if (!customer.customerName.trim()) {
      setOrderError("Please enter your name.");
      return;
    }
    if (!customer.phone.trim()) {
      setOrderError("Please enter your phone number.");
      return;
    }
    if (!customer.address.trim()) {
      setOrderError("Please enter your address.");
      return;
    }

    const orderData = {
      customerName: customer.customerName.trim(),
      phone: customer.phone.trim(),
      address: customer.address.trim(),
      items: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: total - discount,
    };

    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        throw new Error("Order could not be placed.");
      }

      alert("Order Placed Successfully!");

      // Clear cart, form, and return home
      setCart([]);
      setDiscount(0);
      setCustomer({ customerName: "", phone: "", address: "" });
      setOrderError("");
      setSelectedProduct(null);
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Please try again.");
    }
  };

  // Handle form input changes
  const handleCustomerChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
    setOrderError("");
  };

  return (
    <>
      <Navbar cart={cart} setShowCart={setShowCart} setShowAbout={setShowAbout} setShowOffers={setShowOffers} />

      <div className="container">
        {!showAbout && !showOffers && <h1 style={{ marginBottom: "40px" }}>Cosmetics Store</h1>}

        {showOffers ? (
          <Offers />
        ) : showAbout ? (
          <About />
        ) : showCart ? (
          <Cart 
            cart={cart} 
            total={total} 
            discount={discount}
            setDiscount={setDiscount}
            setShowCart={setShowCart} 
            setSelectedProduct={setSelectedProduct} 
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        ) : selectedProduct ? (
          <div className="order-box">
            <h2>Order Product</h2>

            {/* Order Summary Mini Receipt */}
            <div className="order-summary-box">
              <div className="order-summary-row">
                <span><strong>Items:</strong></span>
                <span className="order-summary-items">{cart.map(item => `${item.name} (x${item.quantity})`).join(', ')}</span>
              </div>
              <div className="order-summary-row">
                <span>Subtotal:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="order-summary-row order-discount-row">
                  <span>Discount:</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="order-summary-row order-final-row">
                <span>Final Total:</span>
                <span>₹{(total - discount).toFixed(2)}</span>
              </div>
            </div>

            <input
              type="text"
              className="order-input"
              placeholder="Enter Name"
              name="customerName"
              value={customer.customerName}
              onChange={handleCustomerChange}
            />
            <input
              type="text"
              className="order-input"
              placeholder="Enter Phone Number"
              name="phone"
              value={customer.phone}
              onChange={handleCustomerChange}
            />
            <textarea
              className="order-textarea"
              placeholder="Enter Address"
              name="address"
              value={customer.address}
              onChange={handleCustomerChange}
            ></textarea>

            {orderError && (
              <p style={{ color: '#e91e63', fontSize: '14px', marginTop: '8px' }}>{orderError}</p>
            )}
            
            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>
            
            <button className="back-order-btn" onClick={() => setSelectedProduct(null)}>
              Back
            </button>
          </div>
        ) : (
          <div className="all-products-wrapper">
            
            {/* 1. FACE MAKEUP SECTION */}
            <div className="category-section" id="face-makeup" style={{ marginBottom: '50px', paddingTop: '20px' }}>
              <h2 style={{ color: '#e91e63', marginBottom: '20px', borderBottom: '2px solid #fce4ec', paddingBottom: '10px' }}>Face Makeup</h2>
              <div className="product-grid">
                {products.filter(p => p.category === "face-makeup").map((product) => (
                  <div className="card" key={product._id}>
                    <img src={product.image} alt={product.name} />
                    <h2>{product.name}</h2>
                    <p>Brand : {product.brand}</p>
                    <div className="product-rating">
                      <span className="stars">{renderStars(product.rating)}</span>
                      <span className="rating-number">{product.rating.toFixed(1)}</span>
                      <span className="review-count">({product.reviews})</span>
                    </div>
                    <h3>₹{product.price}</h3>
                    <button onClick={() => addToCart(product)}>Add To Cart</button>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. EYE MAKEUP SECTION */}
            <div className="category-section" id="eye-makeup" style={{ marginBottom: '50px', paddingTop: '20px' }}>
              <h2 style={{ color: '#e91e63', marginBottom: '20px', borderBottom: '2px solid #fce4ec', paddingBottom: '10px' }}>Eye Makeup</h2>
              <div className="product-grid">
                {products.filter(p => p.category === "eye-makeup").map((product) => (
                  <div className="card" key={product._id}>
                    <img src={product.image} alt={product.name} />
                    <h2>{product.name}</h2>
                    <p>Brand : {product.brand}</p>
                    <div className="product-rating">
                      <span className="stars">{renderStars(product.rating)}</span>
                      <span className="rating-number">{product.rating.toFixed(1)}</span>
                      <span className="review-count">({product.reviews})</span>
                    </div>
                    <h3>₹{product.price}</h3>
                    <button onClick={() => addToCart(product)}>Add To Cart</button>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. LIP PRODUCTS SECTION */}
            <div className="category-section" id="lip-products" style={{ marginBottom: '50px', paddingTop: '20px' }}>
              <h2 style={{ color: '#e91e63', marginBottom: '20px', borderBottom: '2px solid #fce4ec', paddingBottom: '10px' }}>Lip Products</h2>
              <div className="product-grid">
                {products.filter(p => p.category === "lip-products").map((product) => (
                  <div className="card" key={product._id}>
                    <img src={product.image} alt={product.name} />
                    <h2>{product.name}</h2>
                    <p>Brand : {product.brand}</p>
                    <div className="product-rating">
                      <span className="stars">{renderStars(product.rating)}</span>
                      <span className="rating-number">{product.rating.toFixed(1)}</span>
                      <span className="review-count">({product.reviews})</span>
                    </div>
                    <h3>₹{product.price}</h3>
                    <button onClick={() => addToCart(product)}>Add To Cart</button>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. SKINCARE SECTION */}
            <div className="category-section" id="skincare" style={{ marginBottom: '50px', paddingTop: '20px' }}>
              <h2 style={{ color: '#e91e63', marginBottom: '20px', borderBottom: '2px solid #fce4ec', paddingBottom: '10px' }}>Skincare</h2>
              <div className="product-grid">
                {products.filter(p => p.category === "skincare").map((product) => (
                  <div className="card" key={product._id}>
                    <img src={product.image} alt={product.name} />
                    <h2>{product.name}</h2>
                    <p>Brand : {product.brand}</p>
                    <h3>₹{product.price}</h3>
                    <button onClick={() => addToCart(product)}>Add To Cart</button>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. NAIL CARE SECTION */}
            <div className="category-section" id="nail-care" style={{ marginBottom: '50px', paddingTop: '20px' }}>
              <h2 style={{ color: '#e91e63', marginBottom: '20px', borderBottom: '2px solid #fce4ec', paddingBottom: '10px' }}>Nail Care</h2>
              <div className="product-grid">
                {products.filter(p => p.category === "nail-care").map((product) => (
                  <div className="card" key={product._id}>
                    <img src={product.image} alt={product.name} />
                    <h2>{product.name}</h2>
                    <p>Brand : {product.brand}</p>
                    <h3>₹{product.price}</h3>
                    <button onClick={() => addToCart(product)}>Add To Cart</button>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. FRAGRANCE SECTION */}
            <div className="category-section" id="fragrance" style={{ marginBottom: '50px', paddingTop: '20px' }}>
              <h2 style={{ color: '#e91e63', marginBottom: '20px', borderBottom: '2px solid #fce4ec', paddingBottom: '10px' }}>Fragrances</h2>
              <div className="product-grid">
                {products.filter(p => p.category === "fragrance").map((product) => (
                  <div className="card" key={product._id}>
                    <img src={product.image} alt={product.name} />
                    <h2>{product.name}</h2>
                    <p>Brand : {product.brand}</p>
                    <h3>₹{product.price}</h3>
                    <button onClick={() => addToCart(product)}>Add To Cart</button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
      
      <Footer />
    </>
  );
}

export default App;
