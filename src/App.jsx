import React, { useState, useEffect, Suspense } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';

// LAZY LOAD SUB-STORES & CORE PAGES
const BookStall = React.lazy(() => import('../MERN-STACK-T1-P1-Bookstall/src/App.jsx'));
const Bags = React.lazy(() => import('../MERN-STACK-T1-P1-Bags/frontend/src/App.jsx'));
const Cosmetics = React.lazy(() => import('../MERN-STACK-T1-P1-cosmetics/src/App.jsx'));
const Costumes = React.lazy(() => import('../MERN-STACK-T1-P1-costumes/src/App.jsx'));
const IceCream = React.lazy(() => import('../MERN-STACK-T1-P1-ice-cream/icecreams/src/App.jsx'));
const Shoes = React.lazy(() => import('../MERN-STACK-T1-P1-Shoes/src/App.jsx'));
const Sports = React.lazy(() => import('../MERN-STACK-T1-P1-sports/src/App.jsx'));
const Watches = React.lazy(() => import('../MERN-STACK-T1-P1-Watches/src/App.jsx'));
const TicketBooking = React.lazy(() => import('../MERN-STACK-T1-P1-ticket-booking/src/App.jsx'));
const FragranceWorld = React.lazy(() => import('../MERN-STACK-T1-P1-Fragrance/src/App.jsx'));

const CheckoutPage = React.lazy(() => import('./pages/Checkout.jsx'));
const OrdersPage = React.lazy(() => import('./pages/Orders.jsx'));
const AdminPage = React.lazy(() => import('./pages/Admin.jsx'));

function MallHome({ onSelectStore, isDarkMode }) {
  const storeCategories = [
    {
      title: "Book Stall",
      subtitle: "Bestsellers, technical guides & fiction",
      storeId: "bookstall",
      accent: "#2563eb",
      items: [
        { name: "Fiction & Novels", tag: "Min. 30% Off", img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300" },
        { name: "Educational & Tech", tag: "Under ₹499", img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300" },
        { name: "Comics & Manga", tag: "Buy 2 Get 1", img: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300" },
        { name: "Self Improvement", tag: "Top Sellers", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300" },
      ]
    },
    {
      title: "Bags & Travel",
      subtitle: "Backpacks, luxury leather & travel gear",
      storeId: "bags",
      accent: "#0284c7",
      items: [
        { name: "Travel Backpacks", tag: "Min. 50% Off", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300" },
        { name: "Designer Handbags", tag: "Special Deal", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300" },
        { name: "Laptop Sleeves", tag: "Under ₹799", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=300" },
        { name: "Duffle & Gym Bags", tag: "Flat 40% Off", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300" },
      ]
    },
    {
      title: "Cosmetics & Beauty",
      subtitle: "Skincare, organic makeup & essential oils",
      storeId: "cosmetics",
      accent: "#db2777",
      items: [
        { name: "Lipsticks & Gloss", tag: "Min. 20% Off", img: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300" },
        { name: "Skincare Essentials", tag: "Top Rated", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300" },
        { name: "Eye Makeup Sets", tag: "Special Offer", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300" },
        { name: "Hair Care Kits", tag: "Starting ₹199", img: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=300" },
      ]
    },
    {
      title: "StyleHub Apparel",
      subtitle: "Everyday wear, party outfits & winter wear",
      storeId: "costumes",
      accent: "#7c3aed",
      items: [
        { name: "Casual Wear", tag: "Min. 40% Off", img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300" },
        { name: "Party Outfits", tag: "Trending Now", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300" },
        { name: "Ethnic Collections", tag: "New Arrival", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300" },
        { name: "Winter Jackets", tag: "Up to 50% Off", img: "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=300" },
      ]
    },
    {
      title: "Ice Cream Parlor",
      subtitle: "Gourmet sundaes, gelato & artisan scoops",
      storeId: "icecream",
      accent: "#ea580c",
      items: [
        { name: "Sundae Bowls", tag: "Buy 1 Get 1", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300" },
        { name: "Gelato Scoops", tag: "Fresh Flavors", img: "https://images.unsplash.com/photo-1560008581-09826d1de69e?w=300" },
        { name: "Ice Cream Cones", tag: "Starting ₹99", img: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=300" },
        { name: "Milkshakes", tag: "Popular", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300" },
      ]
    },
    {
      title: "Shoe Hub",
      subtitle: "Sneakers, formals, cleats & loafers",
      storeId: "shoes",
      accent: "#059669",
      items: [
        { name: "Running Sneakers", tag: "Min. 35% Off", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300" },
        { name: "Formal Shoes", tag: "Flat 30% Off", img: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=300" },
        { name: "Casual Loafers", tag: "Best Deals", img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=300" },
        { name: "Sports Cleats", tag: "Top Quality", img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300" },
      ]
    },
    {
      title: "Sports & Fitness",
      subtitle: "Gym equipment, activewear & accessories",
      storeId: "sports",
      accent: "#16a34a",
      items: [
        { name: "Gym Equipment", tag: "Up to 50% Off", img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300" },
        { name: "Football & Gear", tag: "Min. 20% Off", img: "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=300" },
        { name: "Cricket Kits", tag: "Special Price", img: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=300" },
        { name: "Yoga & Fitness Mats", tag: "Starting ₹399", img: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300" },
      ]
    },
    {
      title: "Luxe Watches",
      subtitle: "Luxury timepieces, chronographs & classic watches",
      storeId: "watches",
      accent: "#c9a96e",
      items: [
        { name: "Luxury Chronograph", tag: "Min. 25% Off", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300" },
        { name: "Classic Gold Watch", tag: "Top Tier", img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=300" },
        { name: "Sports Automatic", tag: "Special Edition", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300" },
        { name: "Minimal Leather Strap", tag: "Best Value", img: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=300" },
      ]
    },
    {
      title: "Fragrance World",
      subtitle: "Perfumes, scented candles & room sprays",
      storeId: "fragrance",
      accent: "#9333ea",
      items: [
        { name: "Luxury Perfumes", tag: "Min. 40% Off", img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=300" },
        { name: "Room Sprays", tag: "Under ₹399", img: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=300" },
        { name: "Scented Candles", tag: "Up to 50% Off", img: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=300" },
        { name: "Essential Oils", tag: "Starting ₹299", img: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300" },
      ]
    },
    {
      title: "Ticket Booking",
      subtitle: "Cinema, live concerts & theme parks",
      storeId: "tickets",
      accent: "#2563eb",
      items: [
        { name: "Movie Tickets", tag: "Instant Book", img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300" },
        { name: "Concerts & Shows", tag: "Live Events", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300" },
        { name: "Amusement Parks", tag: "Family Discount", img: "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=300" },
        { name: "Sports Stadium Passes", tag: "VIP Access", img: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=300" },
      ]
    }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 1.25rem' }}>
      
      {/* HERO SECTION */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem', paddingTop: '1rem' }}>
        <span style={{ 
          backgroundColor: isDarkMode ? '#1e293b' : '#eff6ff', 
          color: isDarkMode ? '#60a5fa' : '#2563eb', 
          border: isDarkMode ? '1px solid #334155' : '1px solid #bfdbfe',
          padding: '6px 16px', 
          borderRadius: '20px', 
          fontSize: '0.85rem', 
          fontWeight: '600',
          letterSpacing: '0.3px',
          display: 'inline-block',
          marginBottom: '1rem'
        }}>
          ✨ Discover All 10 Shopping Outlets
        </span>
        <h1 style={{ 
          fontSize: '2.75rem', 
          fontWeight: '800', 
          color: isDarkMode ? '#f8fafc' : '#0f172a', 
          letterSpacing: '-0.8px', 
          marginBottom: '0.75rem',
          lineHeight: '1.2'
        }}>
          Everything you need, in one place.
        </h1>
        <p style={{ color: isDarkMode ? '#94a3b8' : '#64748b', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Browse curated stores, exclusive offers, and instant delivery options across all departments.
        </p>
      </div>

      {/* STORE SECTIONS GRID */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {storeCategories.map((cat, idx) => (
          <section 
            key={idx} 
            style={{ 
              backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', 
              borderRadius: '16px', 
              padding: '1.75rem',
              border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
              boxShadow: isDarkMode ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(15, 23, 42, 0.03)'
            }}
          >
            {/* STORE HEADER */}
            <div 
              onClick={() => onSelectStore(cat.storeId)}
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '1.25rem',
                cursor: 'pointer',
                paddingBottom: '1rem',
                borderBottom: isDarkMode ? '1px solid #334155' : '1px solid #f1f5f9'
              }}
            >
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a', margin: 0 }}>
                  {cat.title}
                </h2>
                <p style={{ fontSize: '0.88rem', color: isDarkMode ? '#94a3b8' : '#64748b', margin: '3px 0 0 0' }}>
                  {cat.subtitle}
                </p>
              </div>

              <div style={{ 
                color: isDarkMode ? '#60a5fa' : cat.accent, 
                backgroundColor: isDarkMode ? '#0f172a' : `${cat.accent}10`,
                borderRadius: '8px', 
                padding: '8px 16px',
                fontSize: '0.88rem',
                fontWeight: '600',
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px',
                border: isDarkMode ? '1px solid #334155' : 'none',
                transition: 'all 0.2s'
              }}>
                Visit Store →
              </div>
            </div>

            {/* PRODUCT CARDS */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
              gap: '1.25rem' 
            }}>
              {cat.items.map((item, itemIdx) => (
                <div 
                  key={itemIdx}
                  onClick={() => onSelectStore(cat.storeId)}
                  style={{
                    backgroundColor: isDarkMode ? '#0f172a' : '#fafafa',
                    borderRadius: '12px',
                    padding: '0.85rem',
                    border: isDarkMode ? '1px solid #334155' : '1px solid #f1f5f9',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.borderColor = isDarkMode ? '#64748b' : '#cbd5e1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = isDarkMode ? '#334155' : '#f1f5f9';
                  }}
                >
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    style={{ 
                      width: '100%', 
                      height: '140px', 
                      objectFit: 'cover', 
                      borderRadius: '8px', 
                      marginBottom: '0.75rem' 
                    }} 
                  />
                  <div style={{ fontSize: '0.95rem', fontWeight: '600', color: isDarkMode ? '#f1f5f9' : '#1e293b' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: '700', color: isDarkMode ? '#38bdf8' : cat.accent, marginTop: '0.25rem' }}>
                    {item.tag}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function AuthModal({ isOpen, onClose }) {
  const { login, register, loading, error } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErr, setFormErr] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErr('');
    if (!email || !password || (isRegister && !name)) {
      setFormErr('Please fill in all required fields.');
      return;
    }
    let res;
    if (isRegister) {
      res = await register(name, email, password);
    } else {
      res = await login(email, password);
    }
    if (res && res.success) {
      onClose();
    } else if (res && res.error) {
      setFormErr(res.error);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999999,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '420px',
        padding: '2rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        position: 'relative',
        color: '#0f172a'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            border: 'none',
            background: '#f1f5f9',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          ✕
        </button>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem', textAlign: 'center' }}>
          {isRegister ? 'Create Your Account' : 'Welcome Back'}
        </h2>
        <p style={{ fontSize: '0.88rem', color: '#64748b', textAlign: 'center', marginBottom: '1.5rem' }}>
          {isRegister ? 'Register to manage orders & cross-store cart' : 'Sign in to access your saved cart & profile'}
        </p>

        {(formErr || error) && (
          <div style={{
            backgroundColor: '#fef2f2',
            color: '#dc2626',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '0.85rem',
            marginBottom: '1rem'
          }}>
            {formErr || error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {isRegister && (
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '4px' }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '4px' }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.9rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '4px' }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.9rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '0.95rem',
              cursor: 'pointer',
              marginTop: '8px',
              transition: 'backgroundColor 0.2s ease'
            }}
          >
            {loading ? 'Processing...' : isRegister ? 'Register Account' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => { setIsRegister(!isRegister); setFormErr(''); }}
            style={{
              background: 'none',
              border: 'none',
              color: '#2563eb',
              fontWeight: '700',
              cursor: 'pointer',
              padding: 0
            }}
          >
            {isRegister ? 'Sign In' : 'Register Now'}
          </button>
        </div>

        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed #e2e8f0', textAlign: 'center' }}>
          <button
            type="button"
            onClick={async () => {
              setEmail('admin@mall.com');
              setPassword('admin123');
              await login('admin@mall.com', 'admin123');
              onClose();
            }}
            style={{
              backgroundColor: '#f8fafc',
              color: '#475569',
              border: '1px solid #cbd5e1',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            🔑 Quick Login as Superuser / Admin
          </button>
        </div>
      </div>
    </div>
  );
}

function CartDrawer({ isOpen, onClose }) {
  const { cart, cartCount, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9999999,
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        width: '100%',
        maxWidth: '420px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-10px 0 25px rgba(0, 0, 0, 0.2)',
        color: '#0f172a'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0 }}>Shopping Cart</h3>
            <span style={{ fontSize: '0.82rem', color: '#64748b' }}>{cartCount} items selected</span>
          </div>
          <button
            onClick={onClose}
            style={{
              border: 'none',
              background: '#f1f5f9',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            ✕
          </button>
        </div>

        {/* Cart Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
              <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Your shopping cart is empty</p>
              <p style={{ fontSize: '0.85rem' }}>Explore our stores to add products!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cart.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1px solid #f1f5f9',
                    backgroundColor: '#fafafa',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: '700', margin: '0 0 4px 0' }}>{item.name}</h4>
                    {item.brand && <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{item.brand} • </span>}
                    <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#2563eb' }}>
                      ₹{item.price}
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.storeId)}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '4px',
                          border: '1px solid #cbd5e1',
                          background: '#fff',
                          cursor: 'pointer',
                          fontWeight: 'bold'
                        }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.storeId)}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '4px',
                          border: '1px solid #cbd5e1',
                          background: '#fff',
                          cursor: 'pointer',
                          fontWeight: 'bold'
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id, item.storeId)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ef4444',
                      cursor: 'pointer',
                      fontSize: '1.1rem',
                      padding: '4px'
                    }}
                    title="Remove item"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{
            padding: '1.5rem',
            borderTop: '1px solid #e2e8f0',
            backgroundColor: '#ffffff'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1rem', fontWeight: '600' }}>Total Amount</span>
              <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#2563eb' }}>
                ₹{cartTotal.toLocaleString()}
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                window.dispatchEvent(new CustomEvent('mall-navigate', { detail: 'checkout' }));
              }}
              style={{
                width: '100%',
                backgroundColor: '#16a34a',
                color: '#ffffff',
                border: 'none',
                padding: '14px',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '1rem',
                cursor: 'pointer',
                marginBottom: '8px'
              }}
            >
              Proceed to Checkout
            </button>

            <button
              onClick={clearCart}
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                color: '#64748b',
                border: 'none',
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function MallContent() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  useEffect(() => {
    const handleNav = (e) => {
      if (e.detail) setActiveTab(e.detail);
    };
    window.addEventListener('mall-navigate', handleNav);
    return () => window.removeEventListener('mall-navigate', handleNav);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'bookstall': return <div className="bookstall-store-app"><BookStall /></div>;
      case 'bags': return <div className="bags-store-app"><Bags /></div>;
      case 'cosmetics': return <div className="cosmetics-store-app"><Cosmetics /></div>;
      case 'costumes': return <div className="costumes-store-app"><Costumes /></div>;
      case 'icecream': return <div className="icecream-store-app"><IceCream /></div>;
      case 'shoes': return <div className="shoes-store-app"><Shoes /></div>;
      case 'sports': return <div className="sports-store-app"><Sports /></div>;
      case 'watches':
      case 'food': return <div className="watches-store-app"><Watches /></div>;
      case 'fragrance': return <div className="fragrance-store-app"><FragranceWorld /></div>;
      case 'tickets': return <div className="tickets-store-app"><TicketBooking /></div>;
      case 'checkout': return <CheckoutPage onNavigateToOrders={() => setActiveTab('orders')} />;
      case 'orders': return <OrdersPage />;
      case 'admin':
        if (!isAuthenticated || user?.role !== 'admin') {
          return (
            <div style={{ maxWidth: '500px', margin: '80px auto', padding: '40px 30px', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🔒</div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>
                Superuser Access Required
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                The Admin Dashboard is restricted to platform administrators and superusers only. Please log in with admin privileges.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  onClick={() => setIsAuthOpen(true)}
                  style={{
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '25px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    fontSize: '0.95rem'
                  }}
                >
                  Sign In to Access Admin
                </button>
                <button
                  onClick={() => setActiveTab('mall')}
                  style={{
                    backgroundColor: '#f1f5f9',
                    color: '#475569',
                    border: 'none',
                    padding: '10px 24px',
                    borderRadius: '25px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Return to Mall Home
                </button>
              </div>
            </div>
          );
        }
        return <AdminPage />;
      default: return <MallHome onSelectStore={(storeId) => setActiveTab(storeId)} isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        backgroundColor: isDarkMode ? '#0f172a' : '#fafafa', 
        color: isDarkMode ? '#f8fafc' : '#0f172a',
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        transition: 'background-color 0.3s ease, color 0.3s ease'
      }}
    >
      {/* GLOBAL AUTH & CART MODALS */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* NAVBAR */}
      <header 
        id="mall-main-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
          borderBottom: isDarkMode ? '1px solid #1e293b' : '1px solid #e2e8f0',
          padding: '0 16px',
          height: '65px',
          width: '100%',
          position: 'sticky',
          top: 0,
          left: 0,
          zIndex: 999999,
          boxSizing: 'border-box',
          gap: '12px'
        }}
      >
        {/* LEFT: LOGO */}
        <div 
          className="mall-brand" 
          onClick={() => setActiveTab('home')}
          style={{
            fontSize: '1.15rem',
            fontWeight: 800,
            color: isDarkMode ? '#f8fafc' : '#0f172a',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            userSelect: 'none',
            flexShrink: 0
          }}
        >
          <span style={{ 
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)', 
            color: '#fff', 
            padding: '5px 10px', 
            borderRadius: '10px', 
            fontSize: '1rem',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
          }}>🛍️</span>
          <span style={{ letterSpacing: '-0.02em' }}>Shopping Mall</span>
        </div>

        {/* CENTER: CATEGORY TABS WITH SCROLLABLE FLEX */}
        <nav 
          className="mall-nav-links"
          style={{
            display: 'flex',
            gap: '4px',
            alignItems: 'center',
            flex: 1,
            minWidth: 0,
            overflowX: 'auto',
            padding: '4px 0',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {[
            { id: 'bookstall', label: 'Book Stall' },
            { id: 'bags', label: 'Bags' },
            { id: 'cosmetics', label: 'Cosmetics' },
            { id: 'costumes', label: 'Costumes' },
            { id: 'icecream', label: 'Ice Cream' },
            { id: 'shoes', label: 'Shoes' },
            { id: 'sports', label: 'Sports' },
            { id: 'watches', label: 'Watches' },
            { id: 'fragrance', label: 'Fragrance' },
            { id: 'tickets', label: 'Tickets' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="nav-tab-btn"
                style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '0.82rem',
                  color: isActive 
                    ? (isDarkMode ? '#60a5fa' : '#2563eb') 
                    : (isDarkMode ? '#cbd5e1' : '#475569'),
                  backgroundColor: isActive 
                    ? (isDarkMode ? 'rgba(37, 99, 235, 0.2)' : '#eff6ff') 
                    : 'transparent',
                  fontWeight: isActive ? '700' : '500',
                  border: isActive 
                    ? (isDarkMode ? '1px solid rgba(96, 165, 250, 0.4)' : '1px solid #bfdbfe') 
                    : '1px solid transparent',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  outline: 'none',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 0.08)' : '#f1f5f9';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.color = isDarkMode ? '#ffffff' : '#0f172a';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.color = isDarkMode ? '#cbd5e1' : '#475569';
                  }
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* RIGHT: CART BEFORE PROFILE (PREVENT CRUSH ON SMALL WIDTH) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          
          {/* CART BUTTON */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              position: 'relative',
              padding: '7px 13px',
              borderRadius: '20px',
              border: isDarkMode ? '1px solid #3b82f6' : '1px solid #2563eb',
              backgroundColor: isDarkMode ? '#1e3a8a' : '#2563eb',
              color: '#ffffff',
              cursor: 'pointer',
              fontSize: '0.82rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <span>🛒 Cart</span>
            {cartCount > 0 && (
              <span style={{
                backgroundColor: '#ef4444',
                color: '#ffffff',
                borderRadius: '50%',
                padding: '1px 6px',
                fontSize: '0.72rem',
                fontWeight: '800'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* PROFILE BUTTON WITH HOVER & CLICK DROPDOWN */}
          <div 
            style={{ position: 'relative', flexShrink: 0 }}
            onMouseEnter={() => setShowUserMenu(true)}
            onMouseLeave={() => setShowUserMenu(false)}
          >
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              style={{
                padding: '7px 13px',
                borderRadius: '20px',
                border: isDarkMode ? '1px solid #334155' : '1px solid #cbd5e1',
                backgroundColor: isDarkMode ? '#1e293b' : '#f8fafc',
                color: isDarkMode ? '#f8fafc' : '#0f172a',
                cursor: 'pointer',
                fontSize: '0.82rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
            >
              <span>👤 {isAuthenticated ? (user?.name || 'Account') : 'Profile'}</span>
              <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>▼</span>
            </button>

            {showUserMenu && (
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  paddingTop: '8px',
                  zIndex: 999999
                }}
              >
                <div style={{
                  backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                  border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
                  borderRadius: '16px',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)',
                  padding: '12px',
                  minWidth: '220px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  {/* USER INFO HEADER */}
                  <div style={{ 
                    padding: '8px 12px', 
                    borderRadius: '8px',
                    backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
                    fontSize: '0.82rem', 
                    color: isDarkMode ? '#94a3b8' : '#64748b' 
                  }}>
                    {isAuthenticated ? (
                      <>
                        <div style={{ fontWeight: '700', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>{user?.name}</div>
                        <div style={{ fontSize: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email}</div>
                      </>
                    ) : (
                      <div style={{ fontStyle: 'italic' }}>Welcome Guest User</div>
                    )}
                  </div>

                  <hr style={{ border: 'none', borderTop: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', margin: '4px 0' }} />

                  {/* 1. ORDERS */}
                  <button
                    onClick={() => { setActiveTab('orders'); setShowUserMenu(false); }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 14px',
                      background: 'none',
                      border: 'none',
                      color: isDarkMode ? '#f8fafc' : '#0f172a',
                      fontSize: '0.88rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#334155' : '#f1f5f9'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <span>📦</span> Orders
                  </button>

                  {/* 2. SETTINGS */}
                  <button
                    onClick={() => { setActiveTab('admin'); setShowUserMenu(false); }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 14px',
                      background: 'none',
                      border: 'none',
                      color: isDarkMode ? '#f8fafc' : '#0f172a',
                      fontSize: '0.88rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#334155' : '#f1f5f9'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <span>⚙️</span> Settings & Admin
                  </button>

                  {/* 3. DARK MODE TOGGLE */}
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 14px',
                      background: 'none',
                      border: 'none',
                      color: isDarkMode ? '#fef08a' : '#0f172a',
                      fontSize: '0.88rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#334155' : '#f1f5f9'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span>{isDarkMode ? '🌙' : '☀️'}</span> Dark Mode
                    </span>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '700',
                      padding: '2px 8px', 
                      borderRadius: '12px',
                      backgroundColor: isDarkMode ? '#3b82f6' : '#cbd5e1',
                      color: isDarkMode ? '#fff' : '#0f172a' 
                    }}>
                      {isDarkMode ? 'ON' : 'OFF'}
                    </span>
                  </button>

                  <hr style={{ border: 'none', borderTop: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', margin: '4px 0' }} />

                  {/* LOGOUT / SIGN IN */}
                  {isAuthenticated ? (
                    <button
                      onClick={() => { logout(); setShowUserMenu(false); }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '10px 14px',
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        fontSize: '0.88rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <span>🚪</span> Logout
                    </button>
                  ) : (
                    <button
                      onClick={() => { setIsAuthOpen(true); setShowUserMenu(false); }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '10px 14px',
                        background: '#2563eb',
                        border: 'none',
                        color: '#ffffff',
                        fontSize: '0.88rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                    >
                      <span>🔑</span> Sign In
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* STORE MAIN CONTENT AREA */}
      <main 
        key={activeTab} 
        id="subapp-container"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          flex: 1,
          isolation: 'isolate'
        }}
      >
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '4rem', color: '#64748b', fontSize: '1rem' }}>Loading store content...</div>}>
          {renderContent()}
        </Suspense>
      </main>

      {/* CLEAN FOOTER */}
      <footer style={{
        backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
        borderTop: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
        color: isDarkMode ? '#94a3b8' : '#64748b',
        padding: '3rem 1.5rem 2rem 1.5rem',
        marginTop: '4rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginBottom: '2.5rem'
          }}>
            <div>
              <h3 style={{ color: isDarkMode ? '#f8fafc' : '#0f172a', fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.75rem' }}>
                Shopping Mall Portal
              </h3>
              <p style={{ fontSize: '0.88rem', lineHeight: '1.6' }}>
                A multi-store platform bringing you top brands, daily offers, and smooth shopping experience across 10 distinct departments.
              </p>
            </div>

            <div>
              <h4 style={{ color: isDarkMode ? '#f8fafc' : '#0f172a', fontSize: '0.92rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                Departments
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.85rem' }}>
                <span onClick={() => setActiveTab('bookstall')} style={{ cursor: 'pointer' }}>Books</span>
                <span onClick={() => setActiveTab('bags')} style={{ cursor: 'pointer' }}>Bags & Luggage</span>
                <span onClick={() => setActiveTab('cosmetics')} style={{ cursor: 'pointer' }}>Cosmetics</span>
                <span onClick={() => setActiveTab('costumes')} style={{ cursor: 'pointer' }}>Apparel</span>
                <span onClick={() => setActiveTab('icecream')} style={{ cursor: 'pointer' }}>Ice Cream</span>
                <span onClick={() => setActiveTab('shoes')} style={{ cursor: 'pointer' }}>Shoes</span>
                <span onClick={() => setActiveTab('sports')} style={{ cursor: 'pointer' }}>Sports</span>
                <span onClick={() => setActiveTab('food')} style={{ cursor: 'pointer' }}>Fast Food</span>
                <span onClick={() => setActiveTab('fragrance')} style={{ cursor: 'pointer' }}>Fragrance</span>
                <span onClick={() => setActiveTab('tickets')} style={{ cursor: 'pointer' }}>Tickets</span>
              </div>
            </div>

            <div>
              <h4 style={{ color: isDarkMode ? '#f8fafc' : '#0f172a', fontSize: '0.92rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                Contact & Support
              </h4>
              <p style={{ fontSize: '0.85rem', margin: '4px 0' }}>📍 Central Mall, City Center</p>
              <p style={{ fontSize: '0.85rem', margin: '4px 0' }}>📞 Support: +1 (800) 123-MALL</p>
              <p style={{ fontSize: '0.85rem', margin: '4px 0' }}>✉️ help@shoppingmall.com</p>
            </div>

            <div>
              <h4 style={{ color: isDarkMode ? '#f8fafc' : '#0f172a', fontSize: '0.92rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                Newsletter
              </h4>
              <p style={{ fontSize: '0.85rem', marginBottom: '0.75rem' }}>Get product updates and special deals directly in your inbox.</p>
              <div style={{ display: 'flex', gap: '6px' }}>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: isDarkMode ? '1px solid #475569' : '1px solid #cbd5e1',
                    backgroundColor: isDarkMode ? '#0f172a' : '#fff',
                    color: isDarkMode ? '#fff' : '#000',
                    fontSize: '0.85rem',
                    flex: 1,
                    outline: 'none'
                  }}
                />
                <button style={{
                  backgroundColor: isDarkMode ? '#2563eb' : '#0f172a',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div style={{
            borderTop: isDarkMode ? '1px solid #334155' : '1px solid #f1f5f9',
            paddingTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.82rem'
          }}>
            <span>© 2026 Shopping Mall Portal. All rights reserved.</span>
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Help Center</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MallContent />
      </CartProvider>
    </AuthProvider>
  );
}