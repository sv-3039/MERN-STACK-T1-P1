import { useState } from "react";
import { fallbackFor } from "../data/images";

export default function ProductImage({ src, seed, alt, className, ...rest }) {
  const [error, setError] = useState(false);
  return (
    <img
      src={error ? fallbackFor(seed || alt) : src}
      alt={alt}
      loading="lazy"
      onError={() => setError(true)}
      className={className}
      {...rest}
    />
  );
}
