import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Checkout({ onNavigateToOrders }) {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card'
  });

  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const shippingFee = cartTotal > 0 ? (cartTotal > 1000 ? 0 : 99) : 0;
  const tax = Math.round(cartTotal * 0.05);
  const finalTotal = cartTotal + shippingFee + tax;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setSubmitting(true);

    const orderData = {
      orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      userEmail: formData.email || 'guest@mall.com',
      userName: formData.fullName || 'Guest Customer',
      shippingAddress: `${formData.address}, ${formData.city} - ${formData.zipCode}`,
      paymentMethod: formData.paymentMethod,
      items: cart,
      subtotal: cartTotal,
      shippingFee,
      tax,
      totalAmount: finalTotal,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    try {
      // POST /api/orders call
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      }).catch(() => null);

      // Save order to localStorage for offline persistence
      const existingOrders = JSON.parse(localStorage.getItem('mall_user_orders') || '[]');
      localStorage.setItem('mall_user_orders', JSON.stringify([orderData, ...existingOrders]));

      clearCart();
      setOrderSuccess(orderData);
    } catch (err) {
      console.error('Order creation error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div style={{ maxWidth: '650px', margin: '40px auto', padding: '30px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
        <div style={{ fontSize: '4rem', color: '#16a34a', marginBottom: '1rem' }}>🎉</div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>Order Placed Successfully!</h2>
        <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          Thank you for shopping with Mall Express. Your order ID is <strong>{orderSuccess.orderId}</strong>.
        </p>

        <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '12px', textAlign: 'left', marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '12px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>Order Summary</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '6px' }}>
            <span>Total Items:</span>
            <strong>{orderSuccess.items.length} items</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '6px' }}>
            <span>Shipping To:</span>
            <strong>{orderSuccess.shippingAddress}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: '800', color: '#2563eb', marginTop: '10px' }}>
            <span>Total Paid:</span>
            <span>₹{orderSuccess.totalAmount.toLocaleString()}</span>
          </div>
        </div>

        <button
          onClick={() => onNavigateToOrders ? onNavigateToOrders() : window.location.hash = '#orders'}
          style={{
            backgroundColor: '#2563eb',
            color: '#fff',
            border: 'none',
            padding: '12px 28px',
            borderRadius: '25px',
            fontWeight: '700',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          View Order History
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '30px auto', padding: '0 20px' }}>
      <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.5rem', textAlign: 'center' }}>
        🛍️ Multi-Store Checkout
      </h2>

      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px 20px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <p style={{ fontSize: '1.1rem', color: '#64748b' }}>Your cart is empty. Add items from any of our stores to proceed!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '30px' }}>
          {/* Billing Form */}
          <div style={{ backgroundColor: '#fff', padding: '28px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.2rem', color: '#1e293b' }}>
              Shipping & Payment Details
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px', color: '#475569' }}>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px', color: '#475569' }}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px', color: '#475569' }}>Street Address</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Main Street, Apt 4B"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px', color: '#475569' }}>City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Mumbai"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px', color: '#475569' }}>Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    required
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="400001"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px', color: '#475569' }}>Payment Method</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', backgroundColor: '#fff' }}
                >
                  <option value="card">Credit / Debit Card</option>
                  <option value="upi">UPI / NetBanking</option>
                  <option value="cod">Cash on Delivery (COD)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  marginTop: '10px',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                }}
              >
                {submitting ? 'Placing Order...' : `Pay & Place Order • ₹${finalTotal.toLocaleString()}`}
              </button>
            </form>
          </div>

          {/* Cart Breakdown */}
          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: 'fit-content' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
              Order Breakdown ({cart.length} items)
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '280px', overflowY: 'auto', marginBottom: '1.2rem', paddingRight: '4px' }}>
              {cart.map((item, idx) => (
                <div key={`${item.id}-${idx}`} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <img src={item.image} alt={item.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px' }} />
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      Qty: {item.quantity} × ₹{item.price}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0f172a' }}>
                    ₹{(item.quantity * item.price).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>Shipping</span>
                <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>Estimated Tax (5%)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: '800', color: '#2563eb', borderTop: '2px dashed #e2e8f0', paddingTop: '10px', marginTop: '4px' }}>
                <span>Total</span>
                <span>₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
