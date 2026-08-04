import { useState, useMemo } from 'react'
import ProductCard from '../components/ProductCard/ProductCard.jsx'
import SearchBar from '../components/Search/SearchBar.jsx'
import { products } from '../data/products.js'

export default function Cakes() {
  const [query, setQuery] = useState('')

  // Local "Ice Cream Cakes" products — the category is 'cakes' in our data.
  const cakes = useMemo(
    () => products.filter((p) => p.category === 'cakes'),
    []
  )

  const filtered = useMemo(() => {
    if (!query) return cakes
    const q = query.toLowerCase()
    return cakes.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
  }, [query, cakes])

  return (
    <div className="page-shell">
      <div className="container">
        <div className="page-header">
          <span className="section-eyebrow">Ibaco Ice Cream Cakes</span>
          <h1>Celebration Cakes</h1>
          <p>{filtered.length} of {cakes.length} cakes — prices are typical mart estimates.</p>
        </div>

        <div className="listing-search">
          <SearchBar value={query} onChange={setQuery} placeholder="Search cakes, e.g. chocolate, mango…" />
        </div>

        {filtered.length === 0 && (
          <div className="empty-state card"><p>No cakes match that search. Try a different word.</p></div>
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
