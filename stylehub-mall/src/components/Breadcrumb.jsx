import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-ink/50 dark:text-white/45">
      <Link to="/" className="flex items-center hover:text-royal"><Home size={13} /></Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight size={12} />
          {item.to ? <Link to={item.to} className="hover:text-royal">{item.label}</Link> : <span className="text-ink/75 dark:text-white/75">{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}
