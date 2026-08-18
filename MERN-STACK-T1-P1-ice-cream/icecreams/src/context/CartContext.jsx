/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage('scoopco_cart', []);
  const { showToast } = useToast();

  const addToCart = (product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { ...product, qty }];
    });
    showToast(`${product.name} added to cart`, 'success');
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    showToast('Item removed from cart', 'info');
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const deliveryCharge = 0; // In-Mall counter pickup is always free
  const tax = +(subtotal * 0.05).toFixed(2);
  const grandTotal = +(subtotal + tax).toFixed(2);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQty, clearCart, subtotal, deliveryCharge, tax, grandTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
