// Central image hub for Scoop & Co.
//
// The app ships with Unsplash internet URLs as a built-in fallback so the
// store always looks complete. To use YOUR OWN images (recommended), just drop
// a file into the matching folder under src/assets/images/ with the same name
// as the image key (e.g. products/vanilla.jpg, categories/cups.jpg,
// sections/gelato.jpg). The image below is used automatically and the
// Unsplash fallback is ignored.
//
// If you add a totally new image file you don't need to touch any code — it is
// picked up automatically by the glob below.

// All local images in src/assets/images/** (any extension).
const localImages = typeof import.meta.glob === 'function'
  ? import.meta.glob(
      '/src/assets/images/**/*.{jpg,jpeg,png,webp,avif,svg,gif}',
      { eager: true, import: 'default' },
    )
  : {};

// Normalise every local path to lowercase for case-insensitive matching.
function keyFor(path) {
  const p = decodeURIComponent(path.toLowerCase());
  return p.replace(/^\/src\/assets\/images\//, '').replace(/\.[a-z0-9]+$/, '');
}

const localByKey = {};
for (const [path, url] of Object.entries(localImages)) {
  localByKey[keyFor(path)] = url;
}

// Unsplash fallback helper (kept as the default when no local file exists).
const AMBIENT = 'https://images.unsplash.com/';

export const unsplash = (id, w = 600) =>
  `${AMBIENT}${id}?auto=format&fit=crop&w=${w}&q=80`;

// resolve('products/vanilla') -> local /src/assets/images/products/vanilla.jpg
// if present, else the provided fallback URL.
export function resolve(key, fallback) {
  const hit = localByKey[key] || localByKey[key.toLowerCase()];
  return hit || fallback || 'https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=600&q=80';
}

// Convenience: resolve a key against the Unsplash gallery (keeps stable ids).
export function localOr(key, id) {
  return resolve(key, unsplash(id));
}

// Resolve any raw asset key (e.g. 'upi-phonepe') to its local file, or null.
export function getLocal(key) {
  return localByKey[key] || localByKey[key.toLowerCase()] || null;
}
