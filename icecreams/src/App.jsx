import { Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import BackToTop from './components/BackToTop/BackToTop';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Loader from './components/Loader/Loader';
import Home from './pages/Home';
import Products from './pages/Products';

// Everything below is visited less often than Home/Products, so it's
// code-split into its own chunk and only downloaded when the route is
// actually hit — keeps the initial page load lean.
const IceCreams = lazy(() => import('./pages/IceCreams'));
const Cakes = lazy(() => import('./pages/Cakes'));
const Chocolates = lazy(() => import('./pages/Chocolates'));
const ColdBrews = lazy(() => import('./pages/ColdBrews'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const OffersPage = lazy(() => import('./pages/OffersPage'));
const CombosPage = lazy(() => import('./pages/CombosPage'));
const BrandsPage = lazy(() => import('./pages/BrandsPage'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Account = lazy(() => import('./pages/Account'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

import SpinWheelModal from './components/SpinWheel/SpinWheelModal';

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
          <Suspense fallback={<Loader />}>
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
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <SpinWheelModal />
      <BackToTop />
    </>
  );
}
