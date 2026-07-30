export default function LoadingSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[3/4] rounded-2xl bg-cloud dark:bg-neutral-800" />
          <div className="mt-3 h-2.5 w-1/2 rounded bg-cloud dark:bg-neutral-800" />
          <div className="mt-2 h-3 w-3/4 rounded bg-cloud dark:bg-neutral-800" />
          <div className="mt-2 h-3 w-1/3 rounded bg-cloud dark:bg-neutral-800" />
        </div>
      ))}
    </div>
  );
}
