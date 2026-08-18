import { useState, useMemo } from 'react'
import ProductCard from '../components/ProductCard/ProductCard.jsx'
import SearchBar from '../components/Search/SearchBar.jsx'
import { products } from '../data/products.js'

export default function Chocolates() {
  const [query, setQuery] = useState('')

  // Chocolate-flavoured products from our local catalogue.
  const chocolates = useMemo(
    () => products.filter((p) => p.flavor.toLowerCase().includes('chocolate')),
    []
  )

  const filtered = useMemo(() => {
    if (!query) return chocolates
    const q = query.toLowerCase()
    return chocolates.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
  }, [query, chocolates])

  return (
    <div className="page-shell">
      <div className="container">
        <div className="page-header">
          <span className="section-eyebrow">Ibaco Chocolates</span>
          <h1>Gifting Chocolates</h1>
          <p>{filtered.length} of {chocolates.length} pieces — prices are typical mart estimates.</p>
        </div>

        <div className="listing-search">
          <SearchBar value={query} onChange={setQuery} placeholder="Search chocolates, e.g. almond, ganache…" />
        </div>

        {filtered.length === 0 && (
          <div className="empty-state card"><p>No chocolates match that search. Try a different word.</p></div>
        )}
        {filtered.length > 0 && (
          <div className="grid grid-4 listing-page">
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}
