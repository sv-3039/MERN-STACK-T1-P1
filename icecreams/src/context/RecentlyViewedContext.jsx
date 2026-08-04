/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';

const RecentlyViewedContext = createContext();
const STORAGE_KEY = 'scoopco_recently_viewed';
const MAX_ITEMS = 12;

export function RecentlyViewedProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [ids]);

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
