import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import CollectionPage from "./CollectionPage";
import { ALL_PRODUCTS } from "../data/products";

export default function SearchPage() {
  const [params] = useSearchParams();
  const q = (params.get("q") || "").toLowerCase().trim();

  const results = useMemo(() => {
    if (!q) return [];
    return ALL_PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.section.toLowerCase().includes(q)
    );
  }, [q]);

  return (
    <CollectionPage
      title={`Search results for "${params.get("q") || ""}"`}
      subtitle={`${results.length} product${results.length !== 1 ? "s" : ""} found`}
      products={results}
    />
  );
}
