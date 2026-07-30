import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-32 text-center">
      <span className="font-display text-6xl font-semibold text-royal">404</span>
      <p className="mt-3 text-sm text-ink/60 dark:text-white/55">The page you're looking for has wandered off the rack.</p>
      <Link to="/" className="mt-6 rounded-full bg-royal px-6 py-3 text-sm font-semibold text-white">Back to Home</Link>
    </div>
  );
}
