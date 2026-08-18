import { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Checkout from './pages/Checkout/Checkout';
import OrderConfirmation from './pages/OrderConfirmation/OrderConfirmation';
import './App.css';

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [brandFilter, setBrandFilter] = useState(null);

  const handleCartToggle = useCallback(() => {
    setCartOpen(prev => !prev);
  }, []);

const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
    if (category !== 'brands') {
      setBrandFilter(null);
    }
    // Scroll to products section after a beat so the grid updates
    setTimeout(() => {
      document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }, []);

  const handleBrandSelect = useCallback((brand) => {
    setBrandFilter(brand);
    setActiveCategory('brands');
  }, []);

  return (
    <ThemeProvider>
      <CartProvider>
        <div className="app">
          <Navbar
            onCartToggle={handleCartToggle}
            onCategoryChange={handleCategoryChange}
            activeCategory={activeCategory}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  activeCategory={activeCategory}
                  onCategoryChange={handleCategoryChange}
                  brandFilter={brandFilter}
                  onBrandSelect={handleBrandSelect}
                />
              }
            />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
          </Routes>
          <Footer />
          <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
