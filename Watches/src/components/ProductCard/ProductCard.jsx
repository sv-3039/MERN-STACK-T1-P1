import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();
  const inCart = cartItems.find(item => item.id === product.id);

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <div className="product-card">
      <div className="product-card-image-wrapper">
        <div className="product-card-badge">{product.brand}</div>
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image"
          loading="lazy"
        />
        <div className="product-card-overlay">
          <button
            className="quick-view-btn"
            onClick={() => addToCart(product)}
          >
            Quick Add
          </button>
        </div>
      </div>
      <div className="product-card-info">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-brand">{product.brand}</p>
        <div className="product-card-footer">
          <span className="product-card-price">
            Rs.{product.price.toLocaleString()}
          </span>
          <button
            className={`product-card-btn ${inCart ? 'in-cart' : ''}`}
            onClick={() => addToCart(product)}
          >
            {inCart ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
        <button className="buy-now-btn" onClick={handleBuyNow}>
          Buy Now
        </button>
      </div>
    </div>
  );
}
