import { useEffect, useMemo, useState } from 'react';

/**
 * Shared pagination logic for product-style grids.
 * Supports classic "page number" pagination and "load more / infinite
 * scroll" style consumption of the same filtered list.
 *
 * @param {Array} list - the full filtered/sorted list
 * @param {number} pageSize - items per page / per load
 */
export default function usePagination(list, pageSize = 12) {
  const [page, setPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const totalPages = Math.max(1, Math.ceil(list.length / pageSize));

  // Reset whenever the underlying list identity changes (new filters/sort)
  useEffect(() => {
    setPage(1);
    setVisibleCount(pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  const pageItems = useMemo(
    () => list.slice((page - 1) * pageSize, page * pageSize),
    [list, page, pageSize]
  );

  const infiniteItems = useMemo(() => list.slice(0, visibleCount), [list, visibleCount]);
  const hasMore = visibleCount < list.length;
  const loadMore = () => setVisibleCount((c) => Math.min(c + pageSize, list.length));

  const goToPage = (p) => {
    setPage(Math.min(Math.max(1, p), totalPages));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    page,
    totalPages,
    goToPage,
    pageItems,
    infiniteItems,
    hasMore,
    loadMore,
  };
}
