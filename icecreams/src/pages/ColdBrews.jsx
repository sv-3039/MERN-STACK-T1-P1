import { useMemo } from 'react'
import ProductCard from '../components/ProductCard/ProductCard.jsx'
import { products } from '../data/products.js'

export default function ColdBrews() {
  // Closest match in our local catalogue: coffee & milkshake products.
  const coldBrews = useMemo(
    () => products.filter((p) => p.flavor === 'Coffee' || p.category === 'milkshakes'),
    []
  )

  return (
    <div className="page-shell">
      <div className="container">
        <div className="page-header">
          <span className="section-eyebrow">Ibaco Cold Brews</span>
          <h1>Cold Brews</h1>
          <p>{coldBrews.length} chilled brews — prices are typical mart estimates.</p>
        </div>

        {coldBrews.length === 0 && (
          <div className="empty-state card"><p>No cold brews available right now.</p></div>
        )}
        {coldBrews.length > 0 && (
          <div className="grid grid-4 listing-page">
            {coldBrews.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}
