import { useLocation, useNavigate } from 'react-router-dom';
import './OrderConfirmation.css';

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state;

  if (!order) {
    return (
      <div className="confirmation-empty">
        <h2>No order found</h2>
        <p>Looks like you haven't placed an order yet.</p>
        <button className="confirmation-btn primary" onClick={() => navigate('/')}>Start Shopping</button>
      </div>
    );
  }

  const paymentLabels = { phonepe: 'PhonePe', cod: 'Cash on Delivery' };

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <div className="confirmation-success">
          <div className="confirmation-icon">✓</div>
          <h1>Order Confirmed!</h1>
          <p className="confirmation-subtitle">Thank you, {order.customerName}! Your order has been placed successfully.</p>
          <div className="confirmation-order-id">
            <span>Order ID:</span>
            <strong>{order.orderId}</strong>
          </div>
        </div>
        <div className="confirmation-details">
          <div className="confirmation-card">
            <h3>Payment Method</h3>
            <p className="confirmation-payment">{paymentLabels[order.paymentMethod] || order.paymentMethod}</p>
            {order.paymentMethod === 'cod' && <p className="confirmation-note">You will pay when your order is delivered.</p>}
            {order.paymentMethod === 'phonepe' && <p className="confirmation-note">Payment processed via PhonePe.</p>}
          </div>
          <div className="confirmation-card">
            <h3>Order Summary</h3>
            <div className="confirmation-items">
              {order.items.map(item => (
                <div key={item.id} className="confirmation-item">
                  <img src={item.image} alt={item.name} />
                  <div className="confirmation-item-info">
                    <h4>{item.name}</h4>
                    <p className="confirmation-item-brand">{item.brand}</p>
                    <div className="confirmation-item-meta">
                      <span>Qty: {item.quantity}</span>
                      <span>${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="confirmation-total">
              <span>Total Paid</span>
              <strong>${order.total.toLocaleString()}</strong>
            </div>
          </div>
        </div>
        <div className="confirmation-actions">
          <button className="confirmation-btn primary" onClick={() => navigate('/')}>Continue Shopping</button>
          <button className="confirmation-btn secondary" onClick={() => window.print()}>Print Receipt</button>
        </div>
      </div>
    </div>
  );
}
