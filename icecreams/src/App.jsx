import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import BackToTop from './components/BackToTop/BackToTop';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Home from './pages/Home';
import Products from './pages/Products';
import IceCreams from './pages/IceCreams';
import Cakes from './pages/Cakes';
import Chocolates from './pages/Chocolates';
import ColdBrews from './pages/ColdBrews';
import ProductDetails from './pages/ProductDetails';
import OffersPage from './pages/OffersPage';
import CombosPage from './pages/CombosPage';
import BrandsPage from './pages/BrandsPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/ice-creams" element={<IceCreams />} />
            <Route path="/cakes" element={<Cakes />} />
            <Route path="/chocolates" element={<Chocolates />} />
            <Route path="/cold-brews" element={<ColdBrews />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/combos" element={<CombosPage />} />
            <Route path="/brands" element={<BrandsPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
