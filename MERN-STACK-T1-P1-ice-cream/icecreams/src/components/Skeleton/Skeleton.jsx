import './skeleton.css';

/** Generic shimmering block. Compose these for custom skeleton layouts. */
export function SkeletonBlock({ width = '100%', height = 16, radius = 8, style }) {
  return (
    <span
      className="skeleton-block"
      style={{ width, height, borderRadius: radius, ...style }}
    />
  );
}

/** Matches the layout of ProductCard so grids don't jump on load. */
export function ProductCardSkeleton() {
  return (
    <div className="product-card skeleton-card" aria-hidden="true">
      <div className="skeleton-img" />
      <div className="pc-body">
        <SkeletonBlock width="40%" height={12} />
        <SkeletonBlock width="80%" height={18} style={{ margin: '10px 0' }} />
        <SkeletonBlock width="55%" height={12} />
        <SkeletonBlock width="50%" height={22} style={{ margin: '12px 0' }} />
        <SkeletonBlock width="100%" height={40} radius={12} />
      </div>
    </div>
  );
}

/** Grid of N product-card skeletons, for use while data/images are loading. */
export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="products-grid" aria-busy="true" aria-label="Loading products">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Skeleton for the product details page. */
export function ProductDetailsSkeleton() {
  return (
    <div className="container pd-skeleton" aria-busy="true" aria-label="Loading product">
      <div className="pd-skeleton-gallery">
        <SkeletonBlock height={420} radius={20} />
      </div>
      <div className="pd-skeleton-info">
        <SkeletonBlock width="30%" height={14} />
        <SkeletonBlock width="70%" height={32} style={{ margin: '14px 0' }} />
        <SkeletonBlock width="40%" height={16} />
        <SkeletonBlock width="50%" height={30} style={{ margin: '18px 0' }} />
        <SkeletonBlock width="100%" height={80} radius={12} />
        <SkeletonBlock width="100%" height={48} radius={12} style={{ marginTop: 20 }} />
      </div>
    </div>
  );
}
