import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiTag, FiX } from 'react-icons/fi';
import PageHeader from '../components/common/PageHeader';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import './cart.css';

const VALID_COUPONS = { SCOOP20: 0.2, WELCOME10: 0.1 };

export default function Cart() {
  const { items, removeFromCart, updateQty, clearCart, subtotal, deliveryCharge, tax } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const discount = appliedCoupon ? subtotal * VALID_COUPONS[appliedCoupon] : 0;
  const grandTotal = subtotal - discount + deliveryCharge + tax;

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (VALID_COUPONS[code]) {
      setAppliedCoupon(code);
      showToast(`Coupon ${code} applied!`, 'success');
    } else {
      showToast('Invalid coupon code', 'error');
    }
  };

  if (items.length === 0) {
    return (
      <>
        <PageHeader eyebrow="Your Cart" title="Shopping Cart" />
        <div className="empty-state">
          <FiShoppingBag className="empty-icon" />
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added any ice creams yet.</p>
          <Link to="/products" className="btn btn-primary btn-ripple">Start Shopping</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Your Cart" title="Shopping Cart" sub={`${items.length} item${items.length > 1 ? 's' : ''} in your cart`} />
      <section className="section">
        <div className="container cart-layout">
          <div className="cart-items">
            <div className="cart-items-head">
              <button
                className="cart-clear-btn"
                onClick={() => {
                  clearCart();
                  showToast('Cart cleared', 'info');
                }}
              >
                <FiX /> Clear Cart
              </button>
            </div>
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                className="cart-item"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <p className="pc-brand">{item.brand}</p>
                  <h4>{item.name}</h4>
                  <span className="pc-price">₹{item.price}</span>
                </div>
                <div className="cart-qty">
                  <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Decrease"><FiMinus /></button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Increase"><FiPlus /></button>
                </div>
                <div className="cart-item-subtotal">₹{(item.price * item.qty).toFixed(0)}</div>
                <button className="cart-remove" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                  <FiTrash2 />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>

            <div className="coupon-row">
              <FiTag />
              <input
                placeholder="Coupon code (try SCOOP20)"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button onClick={applyCoupon} className="btn btn-outline coupon-btn">Apply</button>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            {appliedCoupon && (
              <div className="summary-row discount-row">
                <span>Discount ({appliedCoupon})</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}
            <div className="summary-row">
              <span>Delivery Charge</span>
              <span>{deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`}</span>
            </div>
            <div className="summary-row">
              <span>Tax (5%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="summary-row summary-total">
              <span>Grand Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>

            <button className="btn btn-primary btn-ripple checkout-btn" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
            <Link to="/products" className="continue-shopping">Continue Shopping</Link>
          </div>
        </div>
      </section>
    </>
  );
}
