import { useMemo, useState, useEffect } from "react";

const SORTS = ["Latest", "Most Popular", "Price: Low to High", "Price: High to Low", "Best Rated"];

export function useProductFilters(products, initial = {}) {
  const [category, setCategory] = useState(initial.category || "All");
  const [brand, setBrand] = useState("All");
  const [size, setSize] = useState("All");
  const [color, setColor] = useState("All");
  const [priceRange, setPriceRange] = useState(6000);
  const [minDiscount, setMinDiscount] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState(initial.tag ? "Latest" : "Latest");
  const [tagFilter, setTagFilter] = useState(initial.tag || null);
  const [page, setPage] = useState(1);
  const pageSize = 12;

  useEffect(() => setPage(1), [category, brand, size, color, priceRange, minDiscount, minRating, sort, tagFilter]);

  const categories = useMemo(() => ["All", ...new Set(products.map((p) => p.category))], [products]);
  const brands = useMemo(() => ["All", ...new Set(products.map((p) => p.brand))], [products]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (brand !== "All" && p.brand !== brand) return false;
      if (size !== "All" && !p.sizes.includes(size)) return false;
      if (color !== "All" && !p.colors.some((c) => c.name === color)) return false;
      if (p.finalPrice > priceRange) return false;
      if (p.discount < minDiscount) return false;
      if (p.rating < minRating) return false;
      if (tagFilter && !p.tags.includes(tagFilter)) return false;
      return true;
    });

    switch (sort) {
      case "Price: Low to High": list = [...list].sort((a, b) => a.finalPrice - b.finalPrice); break;
      case "Price: High to Low": list = [...list].sort((a, b) => b.finalPrice - a.finalPrice); break;
      case "Best Rated": list = [...list].sort((a, b) => b.rating - a.rating); break;
      case "Most Popular": list = [...list].sort((a, b) => b.reviews - a.reviews); break;
      default: list = [...list].sort((a, b) => b.id.localeCompare(a.id));
    }
    return list;
  }, [products, category, brand, size, color, priceRange, minDiscount, minRating, sort, tagFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const resetFilters = () => {
    setCategory("All"); setBrand("All"); setSize("All"); setColor("All");
    setPriceRange(6000); setMinDiscount(0); setMinRating(0); setTagFilter(null);
  };

  return {
    category, setCategory, brand, setBrand, size, setSize, color, setColor,
    priceRange, setPriceRange, minDiscount, setMinDiscount, minRating, setMinRating,
    sort, setSort, sorts: SORTS, tagFilter, setTagFilter,
    categories, brands,
    page, setPage, totalPages, paged, filteredCount: filtered.length,
    resetFilters,
  };
}
