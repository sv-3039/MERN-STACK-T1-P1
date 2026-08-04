import { useEffect, useState } from 'react';

/**
 * Debounces a fast-changing value (e.g. a search input) so consumers
 * only react once the value has settled for `delay` ms.
 */
export default function useDebounce(value, delay = 350) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
