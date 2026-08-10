/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage('scoopco_cart', []);
  const { showToast } = useToast();

  const [appliedCoupon, setAppliedCoupon] = useLocalStorage('scoopco_coupon', null);

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

  const clearCart = () => {
    setItems([]);
  };

  const applyCoupon = (code, discountPct = 15, discountAmount = 0, label = '') => {
    setAppliedCoupon({ code, discountPct, discountAmount, label });
    showToast(`Coupon "${code}" applied! 🎉`, 'success');
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const deliveryCharge = 0; // In-Mall counter pickup is always free

  let discountVal = 0;
  if (appliedCoupon && subtotal > 0) {
    if (appliedCoupon.discountPct > 0) {
      discountVal = +((subtotal * appliedCoupon.discountPct) / 100).toFixed(2);
    } else if (appliedCoupon.discountAmount > 0) {
      discountVal = Math.min(subtotal, appliedCoupon.discountAmount);
    }
  }

  const taxableAmount = Math.max(0, subtotal - discountVal);
  const tax = +(taxableAmount * 0.05).toFixed(2);
  const grandTotal = +(taxableAmount + tax).toFixed(2);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        subtotal,
        deliveryCharge,
        discountVal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        tax,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
