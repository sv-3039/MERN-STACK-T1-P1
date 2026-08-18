import "./index.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toasts from "./components/Toasts";
import CartDrawer from "./components/CartDrawer";
import QuickViewModal from "./components/QuickViewModal";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import MenPage from "./pages/MenPage";
import WomenPage from "./pages/WomenPage";
import AccessoriesPage from "./pages/AccessoriesPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import WishlistPage from "./pages/WishlistPage";
import SearchPage from "./pages/SearchPage";
import BlogPage from "./pages/BlogPage";
import CartPage from "./pages/CartPage";
import FaqPage from "./pages/FaqPage";
import NotFoundPage from "./pages/NotFoundPage";
import { StoreProvider } from "./context/StoreContext.jsx";

function CostumesContent() {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink dark:bg-[#0b0b0c] dark:text-white">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<MenPage />} />
          <Route path="/women" element={<WomenPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <Toasts />
      <CartDrawer />
      <QuickViewModal />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <CostumesContent />
    </StoreProvider>
  );
}
