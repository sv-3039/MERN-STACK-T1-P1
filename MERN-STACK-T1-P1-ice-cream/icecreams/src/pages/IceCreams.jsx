import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard/ProductCard.jsx'
import SearchBar from '../components/Search/SearchBar.jsx'
import { products } from '../data/products.js'

export default function IceCreams() {
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')

  // All ice cream products from our local catalogue.
  const iceCreams = useMemo(() => products, [])

  const filtered = useMemo(() => {
    if (!query) return iceCreams
    const q = query.toLowerCase()
    return iceCreams.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
  }, [query, iceCreams])

  return (
    <div className="page-shell">
      <div className="container">
        <div className="page-header">
          <span className="section-eyebrow">Ibaco Ice Creams</span>
          <h1>Signature Flavours</h1>
          <p>{filtered.length} of {iceCreams.length} flavours — prices are typical mart estimates.</p>
        </div>

        <div className="listing-search">
          <SearchBar value={query} onChange={setQuery} placeholder="Search flavours, e.g. mango, chocolate…" />
        </div>

        {filtered.length === 0 && (
          <div className="empty-state card"><p>No flavours match that search. Try a different word.</p></div>
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
