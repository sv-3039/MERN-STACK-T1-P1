import './Brands.css';

const brands = [
  { name: 'Rolex', logo: 'https://upload.wikimedia.org/wikipedia/en/9/95/Rolex_logo.svg' },
  { name: 'Omega', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Omega_Logo.svg' },
  { name: 'Tag Heuer', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/TAG_Heuer_logo.svg' },
  { name: 'Cartier', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Cartier_logo.svg' },
  { name: 'Seiko', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Seiko_logo.svg' },
  { name: 'Casio', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Casio_Logo.svg' },
  { name: 'Fossil', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Fossil_Group_logo.svg' },
  { name: 'Patek Philippe', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Patek_Philippe_logo.svg' },
];

export default function Brands({ onBrandSelect }) {
  return (
    <section className="brands-section">
      <div className="brands-container">
        <h2 className="brands-title">Luxury <span className="gold">Brands</span></h2>
        <p className="brands-subtitle">Discover timepieces from the world's most prestigious watchmakers</p>
        <div className="brands-strip">
          {brands.map((brand) => (
            <button
              key={brand.name}
              className="brand-item"
              onClick={() => onBrandSelect(brand.name)}
              title={brand.name}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="brand-logo"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="brand-fallback">{brand.name}</span>
              <span className="brand-name-label">{brand.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

