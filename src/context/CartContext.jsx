import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user, token } = useAuth();

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('mall_global_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mall_global_cart', JSON.stringify(cart));
    } catch (err) {
      console.error('Failed to save cart to localStorage:', err);
    }
  }, [cart]);

  // Sync with backend when user is authenticated
  useEffect(() => {
    if (token && user) {
      syncCartWithBackend(cart);
    }
  }, [token, user]);

  const syncCartWithBackend = async (currentCart) => {
    try {
      await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId: user.id || user.email, cart: currentCart })
      }).catch(() => null);
    } catch (err) {
      console.warn('Backend cart sync unavailable, using local cart state:', err);
    }
  };

  const addToCart = (product, quantity = 1, storeId = 'general') => {
    setCart((prevCart) => {
      const pId = product._id || product.id || `${storeId}-${product.name}`;
      const existingIndex = prevCart.findIndex(
        (item) => String(item.id) === String(pId) && item.storeId === storeId
      );

      let updatedCart;
      if (existingIndex > -1) {
        updatedCart = [...prevCart];
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: updatedCart[existingIndex].quantity + quantity
        };
      } else {
        const newItem = {
          id: pId,
          storeId: storeId,
          name: product.name || product.title || 'Product',
          price: Number(product.price || 0),
          image: product.image || product.img || product.cover || '/images/bag1.jpg',
          brand: product.brand || product.author || '',
          quantity: quantity
        };
        updatedCart = [newItem, ...prevCart];
      }

      if (token && user) {
        syncCartWithBackend(updatedCart);
      }
      return updatedCart;
    });
  };

  const removeFromCart = (id, storeId) => {
    setCart((prevCart) => {
      const updated = prevCart.filter((item) => {
        if (storeId) {
          return !(String(item.id) === String(id) && item.storeId === storeId);
        }
        return String(item.id) !== String(id);
      });
      if (token && user) {
        syncCartWithBackend(updated);
      }
      return updated;
    });
  };

  const updateQuantity = (id, quantity, storeId) => {
    if (quantity <= 0) {
      removeFromCart(id, storeId);
      return;
    }
    setCart((prevCart) => {
      const updated = prevCart.map((item) => {
        if (String(item.id) === String(id) && (!storeId || item.storeId === storeId)) {
          return { ...item, quantity };
        }
        return item;
      });
      if (token && user) {
        syncCartWithBackend(updated);
      }
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    if (token && user) {
      syncCartWithBackend([]);
    }
  };

  const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  const cartTotal = cart.reduce((total, item) => total + (Number(item.price || 0) * (item.quantity || 1)), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export { CartContext };
