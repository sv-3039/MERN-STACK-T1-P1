import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  return (
    <div className="mt-12 flex items-center justify-center gap-1.5">
      <button disabled={page === 1} onClick={() => onChange(page - 1)} className="flex h-9 w-9 items-center justify-center rounded-full border hairline disabled:opacity-30">
        <ChevronLeft size={15} />
      </button>
      {pages.map((p, i) => (
        <span key={p} className="flex items-center">
          {i > 0 && pages[i - 1] !== p - 1 && <span className="px-1 text-ink/30">…</span>}
          <button onClick={() => onChange(p)} className={`flex h-9 w-9 items-center justify-center rounded-full text-sm ${p === page ? "bg-royal text-white" : "hover:bg-cloud dark:hover:bg-neutral-800"}`}>
            {p}
          </button>
        </span>
      ))}
      <button disabled={page === totalPages} onClick={() => onChange(page + 1)} className="flex h-9 w-9 items-center justify-center rounded-full border hairline disabled:opacity-30">
        <ChevronRight size={15} />
      </button>
    </div>
  );
}
