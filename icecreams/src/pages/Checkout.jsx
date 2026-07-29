import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiCreditCard, FiMapPin } from 'react-icons/fi';
import PageHeader from '../components/common/PageHeader';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './checkout.css';

export default function Checkout() {
  const { items, subtotal, deliveryCharge, tax, clearCart } = useCart();
  const { user, addOrder } = useAuth();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const [payment, setPayment] = useState('upi');
  const [address, setAddress] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    pincode: '',
  });
  const grandTotal = subtotal + deliveryCharge + tax;

  if (!user) {
    return <Navigate to="/login" state={{ from: '/checkout' }} replace />;
  }

  const handleAddressChange = (field) => (e) => setAddress({ ...address, [field]: e.target.value });

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    addOrder({ items, subtotal, deliveryCharge, tax, total: grandTotal, payment, address });
    setPlaced(true);
    clearCart();
  };

  if (items.length === 0 && !placed) {
    navigate('/cart');
    return null;
  }

  if (placed) {
    return (
      <div className="empty-state">
        <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring' }}>
          <FiCheckCircle className="empty-icon" style={{ color: '#2ecc71' }} />
        </motion.div>
        <h3>Order Placed Successfully!</h3>
        <p>Your ice cream is on its way. Order confirmation has been sent to your email.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary btn-ripple">Back to Home</Link>
          <Link to="/account" className="btn btn-outline">View My Orders</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Almost There" title="Checkout" />
      <section className="section">
        <div className="container checkout-layout">
          <form className="checkout-form" onSubmit={handlePlaceOrder}>
            <div className="checkout-block">
              <h3><FiMapPin /> Delivery Address</h3>
              <div className="checkout-fields">
                <input required placeholder="Full Name" value={address.name} onChange={handleAddressChange('name')} />
                <input required placeholder="Phone Number" type="tel" value={address.phone} onChange={handleAddressChange('phone')} />
                <input required placeholder="Address Line" className="full-width" value={address.address} onChange={handleAddressChange('address')} />
                <input required placeholder="City" value={address.city} onChange={handleAddressChange('city')} />
                <input required placeholder="Pincode" value={address.pincode} onChange={handleAddressChange('pincode')} />
              </div>
            </div>

            <div className="checkout-block">
              <h3><FiCreditCard /> Payment Method</h3>
              <div className="payment-options">
                {['upi', 'card', 'cod'].map((p) => (
                  <label key={p} className={`payment-option ${payment === p ? 'active' : ''}`}>
                    <input type="radio" name="payment" checked={payment === p} onChange={() => setPayment(p)} />
                    {p === 'upi' && 'UPI'}
                    {p === 'card' && 'Credit / Debit Card'}
                    {p === 'cod' && 'Cash on Delivery'}
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-ripple place-order-btn">
              Place Order · ₹{grandTotal.toFixed(2)}
            </button>
          </form>

          <div className="checkout-summary">
            <h3>Order Summary</h3>
            {items.map((item) => (
              <div className="checkout-line" key={item.id}>
                <span>{item.name} × {item.qty}</span>
                <span>₹{(item.price * item.qty).toFixed(0)}</span>
              </div>
            ))}
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>{deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`}</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
