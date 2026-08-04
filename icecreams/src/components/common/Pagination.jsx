import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './pagination.css';

/**
 * Numbered pagination with ellipsis compression for long ranges.
 * Purely presentational — the parent owns page state (see usePagination).
 */
export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = getPageRange(page, totalPages);

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        className="page-btn nav-btn"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <FiChevronLeft />
      </button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`dots-${i}`} className="page-dots">…</span>
        ) : (
          <button
            key={p}
            className={`page-btn ${p === page ? 'active' : ''}`}
            onClick={() => onChange(p)}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </button>
        )
      )}

      <button
        className="page-btn nav-btn"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        <FiChevronRight />
      </button>
    </nav>
  );
}

function getPageRange(current, total) {
  const delta = 1;
  const range = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      range.push(i);
    } else if (range[range.length - 1] !== '...') {
      range.push('...');
    }
  }
  return range;
}
