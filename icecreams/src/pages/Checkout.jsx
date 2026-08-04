import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiCheckCircle, FiCreditCard, FiPrinter, FiUser, FiSmartphone,
  FiDollarSign, FiCreditCard as FiCard, FiChevronLeft, FiShield,
} from 'react-icons/fi';
import PageHeader from '../components/common/PageHeader';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getLocal } from '../utils/images';
import './checkout.css';

const UPI_QR = getLocal('upi-phonepe') || '';

export default function Checkout() {
  const { items, subtotal, deliveryCharge, tax, clearCart } = useCart();
  const { user, addOrder } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState('details'); // 'details' | 'pay' | 'success'
  const [payment, setPayment] = useState('upi');
  const [customer, setCustomer] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });
  const total = subtotal + deliveryCharge + tax;

  if (!user) {
    return <Navigate to="/login" state={{ from: '/checkout' }} replace />;
  }

  const handleCustomerChange = (field) => (e) => setCustomer({ ...customer, [field]: e.target.value });

  // Step 1 → Step 2 (choose payment method + pay)
  const handleProceedToPay = (e) => {
    e.preventDefault();
    setStep('pay');
  };

  // Step 2 → payment confirmed (order recorded, cart cleared)
  const handleConfirmPayment = (e) => {
    e.preventDefault();
    addOrder({ items, subtotal, deliveryCharge, tax, total, payment, customer, paid: true, orderNo: `ORD${Date.now()}` });
    clearCart();
    setStep('success');
  };

  const handlePrintBill = () => {
    const currentDate = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    const orderNumber = `ORD${Date.now()}`;

    const rows = items
      .map(
        (item) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.qty}</td>
          <td>₹${(item.price * item.qty).toFixed(0)}</td>
        </tr>`
      )
      .join('');

    const printWindow = window.open('', '_blank', 'width=420,height=640');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Bill — Scoop &amp; Co.</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: Arial, Helvetica, sans-serif;
            padding: 28px;
            color: #222;
            width: 380px;
            margin: 0 auto;
          }
          .bill-header { text-align: center; border-bottom: 2px dashed #444; padding-bottom: 14px; margin-bottom: 14px; }
          .bill-header .store { font-size: 26px; font-weight: 800; letter-spacing: 0.5px; }
          .bill-header .store span { color: #e91e63; }
          .bill-header .loc { font-size: 11px; color: #555; margin-top: 4px; }
          .bill-meta { font-size: 12px; color: #555; margin-bottom: 14px; }
          .bill-meta div { display: flex; justify-content: space-between; margin-bottom: 3px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 14px; }
          th, td { text-align: left; padding: 6px 4px; font-size: 13px; }
          th { border-bottom: 1px solid #999; }
          td { border-bottom: 1px dotted #ccc; }
          td:last-child { text-align: right; font-weight: 600; }
          td:nth-child(2) { text-align: center; }
          .totals { margin-bottom: 16px; }
          .totals div { display: flex; justify-content: space-between; font-size: 13px; padding: 3px 0; }
          .totals .grand { font-size: 17px; font-weight: 800; border-top: 2px solid #444; margin-top: 6px; padding-top: 8px; }
          .pay-method { font-size: 12px; color: #555; text-align: center; margin-bottom: 14px; }
          .paid-badge { display: block; text-align: center; font-size: 11px; font-weight: 700; letter-spacing: 0.05em; color: #1b7a3d; border: 1.5px solid #1b7a3d; border-radius: 6px; padding: 5px; margin-bottom: 14px; }
          .bill-footer { text-align: center; border-top: 2px dashed #444; padding-top: 12px; margin-top: 6px; }
          .bill-footer p { font-size: 11px; color: #555; line-height: 1.6; }
          @media print {
            body { width: 100%; }
            .no-print { display: none !important; }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="text-align:right;margin-bottom:10px;">
          <button onclick="window.print()" style="padding:8px 18px;border:none;border-radius:6px;background:#6a4c93;color:#fff;cursor:pointer;font-size:13px;">🖨️ Print</button>
        </div>

        <div class="bill-header">
          <div class="store">Scoop<span>&amp;Co.</span></div>
          <div class="loc">Lulu Mall, Bangalore · Billing Counter</div>
        </div>

        <div class="bill-meta">
          <div><span>Bill No.</span><span>${orderNumber}</span></div>
          <div><span>Date</span><span>${currentDate}</span></div>
          <div><span>Customer</span><span>${customer.name || 'Walk-in'}</span></div>
          ${customer.phone ? `<div><span>Phone</span><span>${customer.phone}</span></div>` : ''}
          ${user?.email ? `<div><span>Email</span><span>${user.email}</span></div>` : ''}
        </div>

        <span class="paid-badge">✓ PAID</span>

        <table>
          <thead>
            <tr><th>Item</th><th>Qty</th><th>Amount</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>

        <div class="totals">
          <div><span>Subtotal</span><span>₹${subtotal.toFixed(2)}</span></div>
          <div><span>Tax</span><span>₹${tax.toFixed(2)}</span></div>
          <div class="grand"><span>Total</span><span>₹${total.toFixed(2)}</span></div>
        </div>

        <p class="pay-method">Payment: ${payment.toUpperCase()} · Confirmed</p>

        <div class="bill-footer">
          <p>Thank you for visiting Scoop &amp; Co. at Lulu Mall!</p>
          <p>Please collect your items at the counter.</p>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Empty cart guard (before payment) — redirect to cart
  if (items.length === 0 && step !== 'success') {
    navigate('/cart');
    return null;
  }

  // ---- SUCCESS SCREEN (only after payment confirmed) ----
  if (step === 'success') {
    return (
      <div className="empty-state">
        <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring' }}>
          <FiCheckCircle className="empty-icon" style={{ color: '#2ecc71' }} />
        </motion.div>
        <h3>Payment Successful!</h3>
        <p>Your payment has been confirmed and the order is recorded. Please collect your items at the counter in Lulu Mall.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-primary btn-ripple" onClick={handlePrintBill}>
            <FiPrinter /> Print Bill
          </button>
          <Link to="/" className="btn btn-outline">Back to Home</Link>
          <Link to="/account" className="btn btn-outline">View My Orders</Link>
        </div>
      </div>
    );
  }

  // ---- STEP 1: CUSTOMER DETAILS ----
  if (step === 'details') {
    return (
      <>
        <PageHeader eyebrow="Almost There" title="Checkout" />
        <section className="section">
          <div className="container checkout-layout">
            <form className="checkout-form" onSubmit={handleProceedToPay}>
              <div className="checkout-block">
                <h3><FiUser /> Customer Details</h3>
                <p className="checkout-hint">Since we're in a shopping mall, there's no delivery — just pick up at our counter.</p>
                <div className="checkout-fields">
                  <input required placeholder="Full Name" value={customer.name} onChange={handleCustomerChange('name')} />
                  <input placeholder="Phone Number" type="tel" value={customer.phone} onChange={handleCustomerChange('phone')} />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-ripple place-order-btn">
                Continue to Payment · ₹{total.toFixed(2)}
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
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // ---- STEP 2: PAYMENT ----
  return (
    <>
      <PageHeader eyebrow="Secure Payment" title="Pay for Your Order" />
      <section className="section">
        <div className="container checkout-layout">
          <form className="checkout-form" onSubmit={handleConfirmPayment}>
            <div className="checkout-block">
              <h3><FiCreditCard /> Choose Payment Method</h3>
              <div className="payment-options">
                <label className={`payment-option ${payment === 'upi' ? 'active' : ''}`}>
                  <input type="radio" name="payment" checked={payment === 'upi'} onChange={() => setPayment('upi')} />
                  <FiSmartphone /> UPI — Scan QR Code
                </label>
                <label className={`payment-option ${payment === 'card' ? 'active' : ''}`}>
                  <input type="radio" name="payment" checked={payment === 'card'} onChange={() => setPayment('card')} />
                  <FiCard /> Credit / Debit Card
                </label>
                <label className={`payment-option ${payment === 'cash' ? 'active' : ''}`}>
                  <input type="radio" name="payment" checked={payment === 'cash'} onChange={() => setPayment('cash')} />
                  <FiDollarSign /> Cash at Counter
                </label>
              </div>
            </div>

            {payment === 'upi' && (
              <div className="checkout-block upi-pay-block">
                <h3><FiSmartphone /> Scan &amp; Pay via UPI</h3>
                {UPI_QR ? (
                  <>
                    <div className="upi-qr-wrap">
                      <img src={UPI_QR} alt="UPI QR Code" className="upi-qr" />
                    </div>
                    <p className="upi-amount">Pay ₹{total.toFixed(2)}</p>
                    <p className="checkout-hint" style={{ textAlign: 'center' }}>
                      Scan the QR above with any UPI app (Google Pay, PhonePe, Paytm).<br />
                      After paying, tap the button below to confirm.
                    </p>
                  </>
                ) : (
                  <p className="checkout-hint">
                    UPI QR image not found. Please add <code>src/assets/images/upi-phonepe.jpeg</code>.
                  </p>
                )}
              </div>
            )}

            {payment === 'card' && (
              <div className="checkout-block">
                <h3><FiCard /> Card Payment</h3>
                <div className="checkout-fields">
                  <input required placeholder="Card Number" inputMode="numeric" className="full-width" />
                  <input required placeholder="Expiry (MM/YY)" />
                  <input required placeholder="CVV" type="password" />
                </div>
                <p className="checkout-hint" style={{ marginTop: 12 }}>
                  💳 Demo only — no real card is charged. In a live store this would connect to a card gateway.
                </p>
              </div>
            )}

            {payment === 'cash' && (
              <div className="checkout-block">
                <h3><FiDollarSign /> Pay by Cash</h3>
                <p className="upi-amount" style={{ textAlign: 'center', marginBottom: 8 }}>₹{total.toFixed(2)}</p>
                <p className="checkout-hint" style={{ textAlign: 'center' }}>
                  Hand ₹{total.toFixed(2)} in cash to the counter staff.<br />
                  Confirm below once cash is received.
                </p>
              </div>
            )}

            <div className="payment-note">
              <FiShield /> Your order is only recorded after payment is confirmed.
            </div>

            <div className="pay-actions">
              <button type="button" className="btn btn-outline" onClick={() => setStep('details')}>
                <FiChevronLeft /> Back
              </button>
              <button type="submit" className="btn btn-primary btn-ripple">
                <FiCheckCircle /> Confirm Payment of ₹{total.toFixed(2)}
              </button>
            </div>
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
              <span>₹{total.toFixed(2)}</span>
            </div>
            <p className="estimate-note" style={{ marginTop: 12 }}>
              The bill can only be printed after payment is confirmed.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

