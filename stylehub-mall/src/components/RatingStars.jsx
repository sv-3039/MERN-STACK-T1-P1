import { Star } from "lucide-react";

export default function RatingStars({ rating, size = 13, showValue = true, count }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={size}
            className={i < Math.round(rating) ? "fill-royal text-royal" : "fill-transparent text-line dark:text-neutral-700"}
            strokeWidth={1.5}
          />
        ))}
      </div>
      {showValue && <span className="text-xs text-ink/60 dark:text-white/60">{rating}{count ? ` (${count})` : ""}</span>}
    </div>
  );
}
