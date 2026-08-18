/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const RecentlyViewedContext = createContext();
const STORAGE_KEY = 'scoopco_recently_viewed';
const MAX_ITEMS = 12;

export function RecentlyViewedProvider({ children }) {
  const [ids, setIds] = useLocalStorage(STORAGE_KEY, []);

  const trackView = (id) => {
    setIds((prev) => [id, ...prev.filter((i) => i !== id)].slice(0, MAX_ITEMS));
  };

  const clearRecentlyViewed = () => setIds([]);

  return (
    <RecentlyViewedContext.Provider value={{ ids, trackView, clearRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export const useRecentlyViewed = () => useContext(RecentlyViewedContext);
