import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Checkout.css';

export default function Checkout() {
  const { cartItems, totalPrice, totalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', address: '', city: '', zip: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const err = {};
    if (!formData.fullName.trim()) err.fullName = 'Full name is required';
    if (!formData.email.trim()) err.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) err.email = 'Invalid email format';
    if (!formData.phone.trim()) err.phone = 'Phone is required';
    else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) err.phone = 'Enter valid phone';
    if (!formData.address.trim()) err.address = 'Address is required';
    if (!formData.city.trim()) err.city = 'City is required';
    if (!formData.zip.trim()) err.zip = 'ZIP code is required';
    if (!paymentMethod) err.payment = 'Please select a payment method';
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      navigate('/order-confirmation', {
        state: {
          orderId: 'LW' + Date.now().toString(36).toUpperCase(),
          items: [...cartItems],
          total: totalPrice,
          paymentMethod,
          customerName: formData.fullName
        }
      });
    }, 2000);
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="checkout-empty">
        <span className="checkout-empty-icon">🛒</span>
        <h2>Your cart is empty</h2>
        <p>Add some luxury timepieces before checking out.</p>
        <button className="checkout-back-btn" onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="checkout-processing">
        <div className="processing-spinner"></div>
        <h2>Processing Your Order</h2>
        <p>Please wait while we process your payment...</p>
        {paymentMethod === 'phonepe' && (
          <div className="phonepe-redirect">
            <span className="phonepe-icon">📱</span>
            <p>Redirecting to PhonePe...</p>
          </div>
        )}
        {paymentMethod === 'cod' && <p className="cod-message">Your order will be confirmed shortly.</p>}
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <p>{totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>
        </div>
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="checkout-grid">
            <div className="checkout-left">
              <div className="form-section">
                <h2 className="form-section-title">Shipping Information</h2>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" className={errors.fullName ? 'error' : ''} />
                  {errors.fullName && <span className="form-error">{errors.fullName}</span>}
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className={errors.email ? 'error' : ''} />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 234 567 890" className={errors.phone ? 'error' : ''} />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <textarea id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Street address, apartment, suite" rows={3} className={errors.address ? 'error' : ''} />
                  {errors.address && <span className="form-error">{errors.address}</span>}
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} placeholder="New York" className={errors.city ? 'error' : ''} />
                    {errors.city && <span className="form-error">{errors.city}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="zip">ZIP Code</label>
                    <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleChange} placeholder="10001" className={errors.zip ? 'error' : ''} />
                    {errors.zip && <span className="form-error">{errors.zip}</span>}
                  </div>
                </div>
              </div>
              <div className="form-section">
                <h2 className="form-section-title">Payment Method</h2>
                {errors.payment && <span className="form-error" style={{ marginBottom: 12, display: 'block' }}>{errors.payment}</span>}
                <div className="payment-options">
                  <label className={'payment-option' + (paymentMethod === 'phonepe' ? ' selected' : '')}>
                    <input type="radio" name="payment" value="phonepe" checked={paymentMethod === 'phonepe'} onChange={(e) => setPaymentMethod(e.target.value)} />
                    <div className="payment-option-content">
                      <span className="payment-icon">📱</span>
                      <div>
                        <strong>PhonePe</strong>
                        <p>Pay with UPI, cards, or wallet</p>
                      </div>
                    </div>
                    <span className="payment-check">✓</span>
                  </label>
                  <label className={'payment-option' + (paymentMethod === 'cod' ? ' selected' : '')}>
                    <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} />
                    <div className="payment-option-content">
                      <span className="payment-icon">💵</span>
                      <div>
                        <strong>Cash on Delivery</strong>
                        <p>Pay when you receive your order</p>
                      </div>
                    </div>
                    <span className="payment-check">✓</span>
                  </label>
                </div>
              </div>
              <button type="submit" className="place-order-btn">
                Place Order — ${totalPrice.toLocaleString()}
              </button>
            </div>
            <div className="checkout-right">
              <div className="order-summary-card">
                <h3>Order Summary</h3>
                <div className="order-summary-items">
                  {cartItems.map(item => (
                    <div key={item.id} className="order-summary-item">
                      <img src={item.image} alt={item.name} />
                      <div className="order-summary-item-info">
                        <h4>{item.name}</h4>
                        <p className="order-summary-item-brand">{item.brand}</p>
                        <div className="order-summary-item-meta">
                          <span>Qty: {item.quantity}</span>
                          <span>${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order-summary-totals">
                  <div className="order-summary-row">
                    <span>Subtotal</span>
                    <span>${totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="order-summary-row">
                    <span>Shipping</span>
                    <span className="free-shipping">Free</span>
                  </div>
                  <div className="order-summary-row order-summary-total">
                    <span>Total</span>
                    <span>${totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
