import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const products = [
    // --- FACE MAKEUP ---
    { id: 1, name: "Fit Me Foundation", brand: "Maybelline", price: 699, category: "face-makeup", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJZZ5L5V6oQ5TkSwzJW-bw6yuRMM_kYJ8dMzs4X_FNgQ&s=10" },
    { id: 2, name: "Radiance Compact Powder", brand: "Lakme", price: 399, category: "face-makeup", image: "https://m.media-amazon.com/images/I/71TAQkyfenL._AC_UF350,350_QL80_.jpg" },
    { id: 3, name: "Flawless Face Primer", brand: "Colorbar", price: 499, category: "face-makeup", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQRGcXfi90rfXzm_fC8THQEtVp1yYxp2aFPQ8gSSXjEQEzneV9e9Z1828&s=10" },
    { id: 4, name: "Liquid Concealer", brand: "Swiss Beauty", price: 199, category: "face-makeup", image: "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/15580284/2023/7/21/7917a3c5-8074-4176-af60-a827028a4ee11689938100465-SWISS-BEAUTY-Liquid-Concealer---Light-Moyen-03-5571689938099-1.jpg" },
    { id: 5, name: "Contour De Force Blush", brand: "Sugar Cosmetics", price: 349, category: "face-makeup", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTufzoIXBLsguaQ0fmAzqpw-LCL6ZH9I_QSNgAm-j0Xxa0TodS_uTelz6d&s=10" },
    { id: 6, name: "Strobe Cream Highlighter", brand: "MAC", price: 1500, category: "face-makeup", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8DigAncY_h7YTpVZJGChDsXx8ASLxN55xDkcZZxjufw&s=10" },

    // --- LIP PRODUCTS ---
    { id: 7, name: "9 to 5 Matte Lipstick", brand: "Lakme", price: 299, category: "lip-products", image: "https://m.media-amazon.com/images/I/51RhjbZ0JtL._AC_UF1000,1000_QL80_.jpg" },
    { id: 8, name: "Super Stay Liquid Lipstick", brand: "Maybelline", price: 650, category: "lip-products", image: "https://m.media-amazon.com/images/I/61JnN0yZYKL.jpg" },
    { id: 9, name: "Cherry Lip Balm", brand: "Nivea", price: 150, category: "lip-products", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUrgjex6t1XUpyVU2YkMY_BHceq7cE0QrmzlyCORBgyw&s=10" },
    { id: 10, name: "Plumping Lip Gloss", brand: "Renee", price: 399, category: "lip-products", image: "https://m.media-amazon.com/images/I/51-ICEGj8EL._AC_UF1000,1000_QL80_.jpg" },
    { id: 11, name: "Bold Lip Liner", brand: "Swiss Beauty", price: 99, category: "lip-products", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwOIqLunDmDjtBxBU-21l65_6QL6KCUJs6KPqHLUzFLv-spnQKchDd974&s=10" },
    { id: 12, name: "Water Lip Tint", brand: "Etude House", price: 450, category: "lip-products", image: "https://assets.myntassets.com/w_412,q_50,,dpr_3,fl_progressive,f_webp/assets/images/2026/APRIL/24/WesodRcX_23b2991dba224c978fe6759be8fdf2c9.jpg" },

    // --- SKINCARE ---
    { id: 13, name: "Purifying Neem Face Wash", brand: "Himalaya", price: 199, category: "skincare", image: "https://www.bbassets.com/media/uploads/p/l/100134697_5-himalaya-purifying-neem-face-wash.jpg" },
    { id: 14, name: "Super Light Gel Moisturizer", brand: "Ponds", price: 250, category: "skincare", image: "https://m.media-amazon.com/images/I/51yZ9Fa9SuL._AC_UF1000,1000_QL80_.jpg" },
    { id: 15, name: "Radiance+ Dewy Sunscreen", brand: "Aqualogica", price: 399, category: "skincare", image: "https://m.media-amazon.com/images/I/511LqtDOLSL.jpg" },
    { id: 16, name: "15% Vitamin C Serum", brand: "Plum", price: 550, category: "skincare", image: "https://discoverpilgrim.com/cdn/shop/files/1.2_13f34e78-2e87-4f0e-9f34-b1c8f3c0818e.jpg?v=1762944223" },
    { id: 17, name: "Ubtan Face Mask", brand: "Mamaearth", price: 299, category: "skincare", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeH8rkmtcZut3liIhXKj08OUc7AOMIe-gPD92BRYfzy_2YbD91ay0t9VU&s=10" },
    { id: 18, name: "Cucumber Pore Tightening Toner", brand: "Biotique", price: 175, category: "skincare", image: "https://www.biotique.com/cdn/shop/files/8904352003981_1-min.jpg?v=1705397468" },

    // --- NAIL CARE ---
    { id: 19, name: "Matte Nail Polish", brand: "Blue Heaven", price: 149, category: "nail-care", image: "https://cdn.grofers.com/da/cms-assets/cms/product_videos_thumbnails/b7c310f8-a637-443e-aa24-149eebb17e6a.jpg" },
    { id: 20, name: "Splash Nail Enamel", brand: "Faces Canada", price: 249, category: "nail-care", image: "https://images-static.nykaa.com/media/catalog/product/0/2/02d1b398903380003000_1.jpg" },
    { id: 21, name: "Acetone-Free Nail Polish Remover", brand: "Colorbar", price: 120, category: "nail-care", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvOQlTXWU6vtkSohN38EwY1ulDCT26GChyURf65vzrsDDil0QEiFWqaQQ&s=10" },
    { id: 22, name: "Shine On Top Coat", brand: "Nykaa", price: 199, category: "nail-care", image: "https://images-static.nykaa.com/media/catalog/product/3/f/3fb8cecDSHIAB00000561_1.jpg?tr=w-500" },
    { id: 23, name: "Natural Nail Base Coat", brand: "OPI", price: 850, category: "nail-care", image: "https://reflexions.in/cdn/shop/files/natural-nail-base-coat-ntt10-top---base-coats-22001008000_74702942-fc93-4f02-9443-72634f7f76a7_400x.webp?v=1755855627" },
    { id: 24, name: "Pop Gel Nail Paint", brand: "Sugar", price: 299, category: "nail-care", image: "https://www.amazon.in/Elle-18-Nail-Finish-10ml/dp/B0F7RJCR6L" }, // Note: This URL provided is a webpage link, not a direct image file

    // --- FRAGRANCE ---
    { id: 25, name: "Dynamic Perfume Body Spray", brand: "Fogg", price: 599, category: "fragrance", image: "https://rukminim2.flixcart.com/image/480/480/xif0q/deodorant/u/u/g/400-for-him-dynamic-green-pack-of-2-2-perfume-body-spray-al-original-imagghs27huhfgka.jpeg?q=90" },
    { id: 26, name: "Vanilla Vibes Body Mist", brand: "Plum", price: 350, category: "fragrance", image: "https://m.media-amazon.com/images/I/41C7tkt6HIL._AC_UF1000,1000_QL80_.jpg" },
    { id: 27, name: "Raw Eau De Parfum", brand: "Skinn by Titan", price: 1295, category: "fragrance", image: "https://assets.myntassets.com/assets/images/2026/FEBRUARY/9/4XQkftva_94a8d4b8d6144a07a180fb72b8a04cd7.jpg" },
    { id: 28, name: "Pearl Whitening Deodorant", brand: "Nivea", price: 199, category: "fragrance", image: "https://m.media-amazon.com/images/I/81YK5GzmO-L._AC_UF1000,1000_QL80_.jpg" },
    { id: 29, name: "Pocket Perfume Floral", brand: "Engage", price: 65, category: "fragrance", image: "https://images-static.nykaa.com/media/catalog/product/8/d/8db0865NYKAC00002909_11.jpg?tr=w-500" }, // Kept original (no extra URL provided)
    { id: 30, name: "Underarm Roll-On", brand: "Rexona", price: 150, category: "fragrance", image: "https://innovist.com/cdn/shop/files/Underarm_Roll_On_-_Aqua_40_ml.jpg?v=1769076054&width=900" },

    // --- EYE MAKEUP ---
    { id: 31, name: "Eyeconic Kajal", brand: "Lakme", price: 180, category: "eye-makeup", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8fwnfYwO--ofuo0X83AXDRaRDf6sg_sWCiTRifLf5oKNetLntqOCbKJVh&s=10" },
    { id: 32, name: "Colossal Liquid Eyeliner", brand: "Maybelline", price: 250, category: "eye-makeup", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3rESdZi9szjiFnpToriwyVi4rxJmnX2BquV3tYcTWGpMSszbF29lKv1gW&s=10" },
    { id: 33, name: "Lash Paradise Mascara", brand: "L'Oreal", price: 599, category: "eye-makeup", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgGbqFRzkkCVd7KzSYLYQgRQwR3fPQw2J9PYKt7t0TQSYekkqakbtU2C8&s=10" },
    { id: 34, name: "Nude Eyeshadow Palette", brand: "Huda Beauty", price: 2500, category: "eye-makeup", image: "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:540/1116526/gkBjN-bPVu-1116526_1.jpg" },
    { id: 35, name: "Ultimate Brow Retractable", brand: "Wet n Wild", price: 299, category: "eye-makeup", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7hBv9WPRgenml2tzdUGXcXi0uewDczxGQAS_vVselbw&s=10" },
    { id: 36, name: "Premium False Eyelashes", brand: "PAC", price: 350, category: "eye-makeup", image: "https://m.media-amazon.com/images/I/71P8kbHi-vL._AC_UF350,350_QL80_.jpg" }
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setShowCart(true);
    setShowAbout(false);
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + delta };
      }
      return item;
    }).filter(item => item.quantity > 0)); 
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      <Navbar cart={cart} setShowCart={setShowCart} setShowAbout={setShowAbout} />

      <div className="container">
        {!showAbout && <h1 style={{ marginBottom: "40px" }}>Cosmetics Store</h1>}

        {showAbout ? (
          <About />
        ) : showCart ? (
          <Cart 
            cart={cart} 
            total={total} 
            setShowCart={setShowCart} 
            setSelectedProduct={setSelectedProduct} 
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        ) : selectedProduct ? (
          <div className="order-box">
            <h2>Order Product</h2>
            <p><strong>Items:</strong> {cart.map(item => `${item.name} (x${item.quantity})`).join(', ')}</p>
            <p><strong>Total Amount:</strong> ₹{total}</p>
            <input type="text" placeholder="Enter Name" />
            <input type="text" placeholder="Enter Phone Number" />
            <textarea placeholder="Enter Address"></textarea>
            
            <button onClick={() => {
              alert('Order Placed Successfully!');
              setCart([]);              
              setSelectedProduct(null); 
            }}>
              Place Order
            </button>
            
            <button style={{ marginTop: '10px' }} onClick={() => setSelectedProduct(null)}>
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
                  <div className="card" key={product.id}>
                    <img src={product.image} alt={product.name} />
                    <h2>{product.name}</h2>
                    <p>Brand : {product.brand}</p>
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
                  <div className="card" key={product.id}>
                    <img src={product.image} alt={product.name} />
                    <h2>{product.name}</h2>
                    <p>Brand : {product.brand}</p>
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
                  <div className="card" key={product.id}>
                    <img src={product.image} alt={product.name} />
                    <h2>{product.name}</h2>
                    <p>Brand : {product.brand}</p>
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
                  <div className="card" key={product.id}>
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
                  <div className="card" key={product.id}>
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
                  <div className="card" key={product.id}>
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