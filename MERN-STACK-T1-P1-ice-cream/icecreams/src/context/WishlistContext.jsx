/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [items, setItems] = useLocalStorage('scoopco_wishlist', []);
  const { showToast } = useToast();

  const isWishlisted = (id) => items.some((i) => i.id === id);

  const toggleWishlist = (product) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === product.id)) {
        showToast(`${product.name} removed from wishlist`, 'info');
        return prev.filter((i) => i.id !== product.id);
      }
      showToast(`${product.name} added to wishlist`, 'success');
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <WishlistContext.Provider value={{ items, isWishlisted, toggleWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
