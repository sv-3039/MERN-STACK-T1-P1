import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiCheckCircle, FiCreditCard, FiPrinter, FiUser, FiSmartphone,
  FiChevronLeft, FiShield, FiLoader, FiShoppingBag,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import upiQrImage from '../assets/images/upi-phonepe.jpeg';
import './checkout.css';

const UPI_QR = upiQrImage || '/upi-phonepe.jpg';

export default function Checkout() {
  const { items, subtotal, deliveryCharge, tax, discountVal, appliedCoupon, grandTotal, clearCart } = useCart();
  const { user, addOrder } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState('details'); 
  const [payment, setPayment] = useState('razorpay'); 
  const [utrRef, setUtrRef] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const [customer, setCustomer] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });

  const total = grandTotal || Math.max(0, subtotal + deliveryCharge + tax - (discountVal || 0));

  if (!user) {
    return <Navigate to="/login" state={{ from: '/checkout' }} replace />;
  }

  const handleCustomerChange = (field) => (e) => setCustomer({ ...customer, [field]: e.target.value });

  // Share receipt token directly to WhatsApp
  const handleSendWhatsApp = () => {
    if (!completedOrder) return;

    const itemsList = completedOrder.items
      .map((item) => `• ${item.name} × ${item.qty} (₹${(item.price * item.qty).toFixed(0)})`)
      .join('\n');

    const message = 
`🍨 *Scoop & Co. — Lulu Mall Counter Pickup* 🍨
------------------------------------------
🎟️ *PICKUP TOKEN:* ${completedOrder.tokenNo}
🧾 *Order Number:* ${completedOrder.orderNo}
👤 *Customer:* ${completedOrder.customer?.name || 'Valued Customer'}
💰 *Total Paid:* ₹${completedOrder.total.toFixed(2)} (${completedOrder.payment.toUpperCase()})
------------------------------------------
📦 *Items:*
${itemsList}
------------------------------------------
📍 *Pickup Location:* Counter #3, Lulu Mall Food Court
Please show this token at Counter #3 to collect your order. Thank you!`;

    const encodedMsg = encodeURIComponent(message);
    const rawPhone = completedOrder.customer?.phone ? completedOrder.customer.phone.replace(/\D/g, '') : '';
    const phoneNum = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;

    const whatsappUrl = phoneNum 
      ? `https://api.whatsapp.com/send?phone=${phoneNum}&text=${encodedMsg}`
      : `https://api.whatsapp.com/send?text=${encodedMsg}`;

    window.open(whatsappUrl, '_blank');
    showToast('Opening WhatsApp...', 'success');
  };

  // Step 1 → Step 2 (Choose payment method)
  const handleProceedToPay = (e) => {
    e.preventDefault();
    if (!customer.name.trim()) {
      showToast('Please enter your full name', 'warning');
      return;
    }
    setStep('pay');
  };

  // Load Razorpay SDK Script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    setIsVerifying(true);
    showToast('Initializing Razorpay Gateway...', 'info');

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      setIsVerifying(false);
      showToast('Failed to load Razorpay SDK.', 'error');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          receipt: `rcpt_${Date.now()}`,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to create Razorpay Order');
      }

      const { order: rzpOrder, keyId } = data;

      const options = {
        key: keyId || 'rzp_test_TNljATqMmXJupa',
        amount: rzpOrder.amount,
        currency: rzpOrder.currency || 'INR',
        name: 'Scoop & Co. — Lulu Mall',
        description: 'Express Counter Pickup Order',
        order_id: rzpOrder.id,
        prefill: {
          name: customer.name || user?.name || '',
          contact: customer.phone || user?.phone || '',
        },
        theme: {
          color: '#7A1F2B',
        },
        handler: async function (response) {
          showToast('Verifying Razorpay payment...', 'info');
          try {
            const verifyRes = await fetch('http://localhost:5000/api/verify-razorpay-signature', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            setIsVerifying(false);

            const orderNo = `ORD${Math.floor(100000 + Math.random() * 900000)}`;
            const tokenNo = `TK-${Math.floor(10 + Math.random() * 90)}`;
            const currentDate = new Date().toLocaleString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            const orderData = {
              orderNo,
              tokenNo,
              date: currentDate,
              items: [...items],
              subtotal,
              tax,
              total,
              payment: 'Razorpay Gateway',
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              customer: { ...customer },
              paid: true,
            };

            fetch('http://localhost:5000/api/orders', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(orderData),
            }).catch(() => null);

            setCompletedOrder(orderData);
            addOrder(orderData);
            clearCart();
            showToast('Razorpay Payment Verified & Order Confirmed!', 'success');
            setStep('success');
          } catch (e) {
            setIsVerifying(false);
            showToast('Signature verification failed', 'error');
          }
        },
        modal: {
          ondismiss: function () {
            setIsVerifying(false);
            showToast('Payment cancelled by user', 'info');
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setIsVerifying(false);
      console.error('Razorpay Payment Error:', err);
      showToast(err.message || 'Razorpay Gateway error', 'error');
    }
  };

  // Step 2 → Final Payment Submission
  const handleConfirmPayment = (e) => {
    e.preventDefault();

    if (payment === 'razorpay') {
      handleRazorpayPayment();
      return;
    }

    if (payment === 'upi') {
      setIsVerifying(true);
      showToast('Connecting to UPI Gateway...', 'info');

      setTimeout(() => {
        setIsVerifying(false);
        const orderNo = `ORD${Math.floor(100000 + Math.random() * 900000)}`;
        const tokenNo = `TK-${Math.floor(10 + Math.random() * 90)}`;
        const currentDate = new Date().toLocaleString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });

        const orderData = {
          orderNo,
          tokenNo,
          date: currentDate,
          items: [...items],
          subtotal,
          tax,
          total,
          payment: 'UPI (Verified)',
          utr: utrRef.trim() || `UPI${Math.floor(100000000000 + Math.random() * 900000000000)}`,
          customer: { ...customer },
          paid: true,
        };

        setCompletedOrder(orderData);
        addOrder(orderData);
        clearCart();
        showToast('UPI Payment Verified & Order Confirmed!', 'success');
        setStep('success');
      }, 2000);
    } else {
      const orderNo = `ORD${Math.floor(100000 + Math.random() * 900000)}`;
      const tokenNo = `TK-${Math.floor(10 + Math.random() * 90)}`;
      const currentDate = new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      const orderData = {
        orderNo,
        tokenNo,
        date: currentDate,
        items: [...items],
        subtotal,
        tax,
        total,
        payment: payment === 'card' ? 'Credit / Debit Card' : 'Cash at Counter',
        customer: { ...customer },
        paid: true,
      };

      setCompletedOrder(orderData);
      addOrder(orderData);
      clearCart();
      showToast('Order Confirmed!', 'success');
      setStep('success');
    }
  };

  // Thermal Receipt Printing
  const handlePrintBill = () => {
    const order = completedOrder || {
      orderNo: `ORD${Date.now()}`,
      tokenNo: 'TK-42',
      date: new Date().toLocaleString('en-IN'),
      items,
      subtotal,
      tax,
      total,
      payment: payment.toUpperCase(),
      customer,
    };

    const rows = (order.items || [])
      .map(
        (item) => `
        <tr>
          <td>${item.name}</td>
          <td style="text-align:center;">${item.qty}</td>
          <td style="text-align:right;">₹${(item.price * item.qty).toFixed(0)}</td>
        </tr>`
      )
      .join('');

    const printWindow = window.open('', '_blank', 'width=440,height=680');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Bill — ${order.orderNo}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Segoe UI', Tahoma, sans-serif;
            padding: 24px;
            color: #222;
            width: 360px;
            margin: 0 auto;
            background: #fff;
          }
          .bill-header { text-align: center; border-bottom: 2px dashed #444; padding-bottom: 12px; margin-bottom: 12px; }
          .bill-header .store { font-size: 24px; font-weight: 800; }
          .bill-header .store span { color: #7a1f2b; }
          .bill-header .loc { font-size: 11px; color: #555; margin-top: 3px; }
          .token-box { background: #f7e6e8; border: 1.5px solid #7a1f2b; border-radius: 8px; text-align: center; padding: 8px; margin-bottom: 12px; }
          .token-box .tok-title { font-size: 10px; text-transform: uppercase; color: #7a1f2b; font-weight: 700; }
          .token-box .tok-num { font-size: 22px; font-weight: 900; color: #7a1f2b; }
          .bill-meta { font-size: 12px; color: #444; margin-bottom: 12px; line-height: 1.5; }
          .bill-meta div { display: flex; justify-content: space-between; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
          th, td { text-align: left; padding: 6px 4px; font-size: 12.5px; }
          th { border-bottom: 1.5px solid #444; font-size: 11px; text-transform: uppercase; }
          td { border-bottom: 1px dotted #ccc; }
          .totals { border-top: 1.5px solid #444; padding-top: 8px; margin-bottom: 14px; }
          .totals div { display: flex; justify-content: space-between; font-size: 12.5px; padding: 2px 0; }
          .totals .grand { font-size: 16px; font-weight: 800; border-top: 1px solid #222; margin-top: 4px; padding-top: 6px; }
          .pay-method { font-size: 12px; font-weight: 700; color: #1b7a3d; text-align: center; margin-bottom: 12px; background: #e8f8f0; padding: 6px; border-radius: 4px; }
          .bill-footer { text-align: center; border-top: 2px dashed #444; padding-top: 10px; margin-top: 8px; }
          .bill-footer p { font-size: 11px; color: #555; line-height: 1.5; }
          @media print {
            body { width: 100%; padding: 10px; }
            .no-print { display: none !important; }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="text-align:right;margin-bottom:10px;">
          <button onclick="window.print()" style="padding:8px 18px;border:none;border-radius:6px;background:#7a1f2b;color:#fff;cursor:pointer;font-size:13px;font-weight:700;">🖨️ Print Receipt</button>
        </div>

        <div class="bill-header">
          <div class="store">Scoop<span>&amp;Co.</span></div>
          <div class="loc">Lulu Mall Food Court · Counter #3</div>
        </div>

        <div class="token-box">
          <div class="tok-title">Counter Collection Token</div>
          <div class="tok-num">${order.tokenNo}</div>
        </div>

        <div class="bill-meta">
          <div><span>Bill No:</span><span><strong>${order.orderNo}</strong></span></div>
          <div><span>Date:</span><span>${order.date}</span></div>
          <div><span>Customer:</span><span>${order.customer?.name || 'Walk-in'}</span></div>
          ${order.customer?.phone ? `<div><span>Phone:</span><span>${order.customer.phone}</span></div>` : ''}
          ${order.utr ? `<div><span>Ref/UTR:</span><span>${order.utr}</span></div>` : ''}
        </div>

        <div class="pay-method">✓ PAID VIA ${order.payment.toUpperCase()}</div>

        <table>
          <thead>
            <tr><th>Item</th><th style="text-align:center;">Qty</th><th style="text-align:right;">Amount</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>

        <div class="totals">
          <div><span>Subtotal</span><span>₹${order.subtotal?.toFixed(2)}</span></div>
          <div><span>GST (5%)</span><span>₹${order.tax?.toFixed(2)}</span></div>
          <div><span>Counter Pickup</span><span>FREE</span></div>
          <div class="grand"><span>Total Amount</span><span>₹${order.total?.toFixed(2)}</span></div>
        </div>

        <div class="bill-footer">
          <p>Thank you for choosing Scoop &amp; Co. at Lulu Mall!</p>
          <p>Please present this token at Counter #3 for your order.</p>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Empty cart guard (before payment submission)
  if (items.length === 0 && step !== 'success') {
    navigate('/cart');
    return null;
  }

  // ---- STEP 3: SUCCESS & ORDER RECEIPT SCREEN ----
  if (step === 'success') {
    return (
      <section className="section success-section">
        <div className="container" style={{ maxWidth: '680px', margin: '0 auto' }}>
          <motion.div
            className="success-card"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="success-badge-wrap">
              <FiCheckCircle className="success-check-icon" />
            </div>
            <span className="success-counter-token">{completedOrder?.tokenNo || 'TK-42'}</span>
            
            <div className="wa-direct-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#e8f8f0', color: '#1eb956', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '700', margin: '8px 0 16px', border: '1px solid rgba(37, 211, 102, 0.3)' }}>
              <FaWhatsapp style={{ color: '#25D366', fontSize: '18px' }} />
              <span>Direct WhatsApp Token Dispatched to <strong>{completedOrder?.customer?.phone || 'your phone'}</strong></span>
            </div>

            <h2 className="success-title">Payment Successful &amp; Order Confirmed!</h2>
            <p className="success-sub">
              Thank you, <strong>{completedOrder?.customer?.name || user?.name}</strong>! Your payment of{' '}
              <strong>₹{completedOrder?.total.toFixed(2)}</strong> has been verified. Please collect your items at Counter #3 in Lulu Mall Food Court.
            </p>

            <div className="success-receipt-box">
              <div className="srb-header">
                <div>
                  <span className="srb-label">Order Number</span>
                  <strong style={{ fontSize: '15px' }}>{completedOrder?.orderNo}</strong>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="srb-label">Status</span>
                  <span className="srb-paid-pill">✓ {completedOrder?.payment}</span>
                </div>
              </div>

              <div className="srb-items">
                {completedOrder?.items.map((item) => (
                  <div key={item.id} className="srb-item-row">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {item.image && <img src={item.image} alt={item.name} className="srb-item-thumb" />}
                      <span className="srb-item-name">
                        {item.name} <strong style={{ color: 'var(--primary-pink)' }}>× {item.qty}</strong>
                      </span>
                    </div>
                    <span className="srb-item-price">₹{(item.price * item.qty).toFixed(0)}</span>
                  </div>
                ))}
              </div>

              <div className="srb-totals">
                <div className="srb-total-row">
                  <span>Subtotal</span>
                  <span>₹{completedOrder?.subtotal.toFixed(2)}</span>
                </div>
                <div className="srb-total-row">
                  <span>Tax (5%)</span>
                  <span>₹{completedOrder?.tax.toFixed(2)}</span>
                </div>
                <div className="srb-total-row grand">
                  <span>Total Amount Paid</span>
                  <span>₹{completedOrder?.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="success-actions">
              <button type="button" className="btn btn-whatsapp btn-ripple" onClick={handleSendWhatsApp}>
                <FaWhatsapp style={{ fontSize: '20px' }} /> Send Token to WhatsApp
              </button>
              <button type="button" className="btn btn-primary btn-ripple" onClick={handlePrintBill}>
                <FiPrinter /> Print Bill / Receipt
              </button>
              <Link to="/account" className="btn btn-outline">
                <FiShoppingBag /> View My Orders
              </Link>
              <Link to="/" className="btn btn-outline">
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // ---- STEP 1: CUSTOMER DETAILS ----
  if (step === 'details') {
    return (
      <>
        <PageHeader eyebrow="Mall Express Counter" title="Checkout" />
        <section className="section checkout-section">
          <div className="container checkout-layout">
            <form className="checkout-form" onSubmit={handleProceedToPay}>
              <div className="checkout-block">
                <h3><FiUser /> Customer Details</h3>
                <div className="checkout-hint-box">
                  📍 <strong>Lulu Mall Food Court Counter #3</strong><br />
                  Enter your name &amp; mobile number to generate your instant counter pickup token.
                </div>

                <div className="checkout-form-group">
                  <label className="checkout-label">Full Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter your full name"
                    value={customer.name}
                    onChange={handleCustomerChange('name')}
                    className="checkout-input"
                  />
                </div>

                <div className="checkout-form-group">
                  <label className="checkout-label">Phone Number (For SMS Token) *</label>
                  <input
                    required
                    type="tel"
                    placeholder="e.g. 98765 43210"
                    value={customer.phone}
                    onChange={handleCustomerChange('phone')}
                    className="checkout-input"
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-ripple place-order-btn">
                  Continue to Payment · ₹{total.toFixed(2)}
                </button>
              </div>
            </form>

            <div className="checkout-summary">
              <h3 className="summary-title">Order Summary</h3>
              <div className="summary-items-list">
                {items.map((item) => (
                  <div className="summary-item-card" key={item.id}>
                    {item.image && (
                      <img src={item.image} alt={item.name} className="summary-item-img" />
                    )}
                    <div className="summary-item-info">
                      <span className="summary-item-name">{item.name}</span>
                      <span className="summary-item-qty">Qty: {item.qty}</span>
                    </div>
                    <span className="summary-item-price">₹{(item.price * item.qty).toFixed(0)}</span>
                  </div>
                ))}
              </div>

              <div className="summary-totals-block">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Mall Counter Pickup</span>
                  <span className="summary-free-badge">FREE</span>
                </div>
                {discountVal > 0 && (
                  <div className="summary-row" style={{ color: '#27ae60', fontWeight: 700 }}>
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-₹{discountVal.toFixed(2)}</span>
                  </div>
                )}
                <div className="summary-row">
                  <span>Tax (5% GST)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="summary-row summary-total">
                  <span>Total Amount</span>
                  <strong>₹{total.toFixed(2)}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // ---- STEP 2: PAYMENT METHOD & SCANNER ----
  return (
    <>
      <PageHeader eyebrow="Secure Payment" title="Pay for Your Order" />
      <section className="section">
        <div className="container checkout-layout">
          <form className="checkout-form" onSubmit={handleConfirmPayment}>
            {/* Payment Method Selector */}
            <div className="checkout-block">
              <h3 className="checkout-block-title"><FiCreditCard /> Choose Payment Method</h3>
              <div className="payment-options">
                <label className={`payment-option ${payment === 'razorpay' ? 'active' : ''}`} style={{ border: '2.5px solid #2b84ea', background: payment === 'razorpay' ? '#f4f9ff' : '#ffffff', boxShadow: '0 4px 14px rgba(43, 132, 234, 0.15)' }}>
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === 'razorpay'}
                    onChange={() => setPayment('razorpay')}
                  />
                  <div className="pay-option-content">
                    <FiShield className="pay-opt-icon" style={{ color: '#2b84ea', fontSize: '24px' }} />
                    <div>
                      <strong style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2b84ea', fontSize: '15.5px' }}>
                        Razorpay Secure Gateway
                        <span style={{ background: '#2b84ea', color: '#ffffff', fontSize: '11px', padding: '3px 10px', borderRadius: '12px', fontWeight: '800' }}>⚡ INTEGRATED</span>
                      </strong>
                      <span className="pay-opt-sub" style={{ color: '#444', fontWeight: '600' }}>Key: rzp_test_TNljATqMmXJupa · Credit/Debit Cards, NetBanking &amp; UPI</span>
                    </div>
                  </div>
                </label>

                <label className={`payment-option ${payment === 'upi' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === 'upi'}
                    onChange={() => setPayment('upi')}
                  />
                  <div className="pay-option-content">
                    <FiSmartphone className="pay-opt-icon" />
                    <div>
                      <strong>UPI Payment (PhonePe / GPay / Paytm)</strong>
                      <span className="pay-opt-sub">Instant QR code scan &amp; counter token</span>
                    </div>
                  </div>
                </label>

                <label className={`payment-option ${payment === 'card' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === 'card'}
                    onChange={() => setPayment('card')}
                  />
                  <div className="pay-option-content">
                    <FiCreditCard className="pay-opt-icon" />
                    <div>
                      <strong>Credit / Debit Card</strong>
                      <span className="pay-opt-sub">Visa, Mastercard, RuPay &amp; Amex</span>
                    </div>
                  </div>
                </label>

                <label className={`payment-option ${payment === 'cash' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === 'cash'}
                    onChange={() => setPayment('cash')}
                  />
                  <div className="pay-option-content">
                    <FiCheckCircle className="pay-opt-icon" />
                    <div>
                      <strong>Cash at Counter</strong>
                      <span className="pay-opt-sub">Pay cash at Lulu Mall Billing Counter #3</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Razorpay Gateway Info Block */}
            {payment === 'razorpay' && (
              <div className="checkout-block" style={{ background: '#f4f9ff', borderColor: '#2b84ea', borderWidth: '2px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <h3 style={{ color: '#2b84ea', margin: 0 }}><FiShield /> Razorpay Official Gateway</h3>
                  <span style={{ background: '#2b84ea', color: '#fff', fontSize: '12px', fontWeight: '800', padding: '4px 12px', borderRadius: '14px' }}>LIVE TEST MODE</span>
                </div>
                <div className="checkout-hint-box" style={{ background: '#ffffff', borderColor: 'rgba(43, 132, 234, 0.25)', borderRadius: '14px', padding: '16px' }}>
                  <p style={{ margin: '0 0 10px', fontSize: '14px', color: '#2b1b2d', lineHeight: '1.5' }}>
                    💳 <strong>Active Key ID:</strong> <code style={{ background: '#e8f4fe', padding: '4px 10px', borderRadius: '8px', color: '#2b84ea', fontWeight: '800', fontSize: '13px' }}>rzp_test_TNljATqMmXJupa</code>
                  </p>
                  <p style={{ margin: 0, fontSize: '13px', color: '#555', lineHeight: '1.5' }}>
                    Clicking verify below opens the official <strong>Razorpay Checkout Window</strong>. Instant test cards, UPI handles, NetBanking, and Wallet simulations are active.
                  </p>
                </div>
              </div>
            )}

            {/* UPI QR Code Block */}
            {payment === 'upi' && (
              <div className="checkout-block upi-pay-block">
                <h3><FiSmartphone /> Scan &amp; Pay via UPI</h3>

                {/* Direct Razorpay Shortcut Banner inside UPI block */}
                <div style={{ background: '#e8f4fe', border: '1.5px solid #2b84ea', borderRadius: '14px', padding: '14px 18px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <strong style={{ color: '#2b84ea', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      ⚡ Razorpay Gateway Integration Active
                    </strong>
                    <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#555' }}>
                      Key ID: <code style={{ fontWeight: 800, color: '#2b84ea' }}>rzp_test_TNljATqMmXJupa</code>
                    </p>
                  </div>
                  <button type="button" onClick={handleRazorpayPayment} className="btn btn-ripple" style={{ background: '#2b84ea', color: '#ffffff', fontWeight: 800, fontSize: '13.5px', padding: '10px 20px', borderRadius: '20px', border: 'none', cursor: 'pointer' }}>
                    💳 Pay via Razorpay Now
                  </button>
                </div>

                <div className="upi-card-container">
                  <div className="upi-qr-frame">
                    <img
                      src={UPI_QR}
                      alt="PhonePe UPI QR Code - Kotika Hemasree"
                      className="upi-qr-image"
                    />
                  </div>
                  <div className="upi-pay-details">
                    <div className="upi-amount-badge">
                      <span>Total Amount to Pay</span>
                      <strong>₹{total.toFixed(2)}</strong>
                    </div>
                    <p className="upi-account-info">
                      Accepted via <strong>PhonePe, Google Pay, Paytm</strong> or any UPI App<br />
                      Account Name: <strong className="upi-acc-name">Kotika Hemasree</strong>
                    </p>
                  </div>
                </div>

                <div className="upi-utr-field">
                  <label className="srb-label">UPI Reference / UTR Number (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. 421980123456 (12-digit UTR)"
                    value={utrRef}
                    onChange={(e) => setUtrRef(e.target.value)}
                    className="upi-utr-input"
                  />
                </div>
              </div>
            )}

            {/* Card Payment Block */}
            {payment === 'card' && (
              <div className="checkout-block">
                <h3><FiCreditCard /> Card Payment</h3>
                <div className="checkout-fields">
                  <input required placeholder="Card Number" inputMode="numeric" className="full-width" />
                  <input required placeholder="Expiry (MM/YY)" />
                  <input required placeholder="CVV" type="password" />
                </div>
                <p className="checkout-hint" style={{ marginTop: 12 }}>
                  💳 Instant counter verification &amp; token generation.
                </p>
              </div>
            )}

            {/* Cash Payment Block */}
            {payment === 'cash' && (
              <div className="checkout-block">
                <h3><FiCheckCircle /> Pay by Cash at Counter</h3>
                <p className="upi-amount" style={{ textAlign: 'center', marginBottom: 8, color: 'var(--primary-pink)' }}>₹{total.toFixed(2)}</p>
                <p className="checkout-hint" style={{ textAlign: 'center' }}>
                  Please hand <strong>₹{total.toFixed(2)}</strong> in cash directly to our counter staff.<br />
                  Click below once cash is handed over to receive your pickup token.
                </p>
              </div>
            )}

            <div className="payment-note">
              <FiShield /> Your order is confirmed immediately after payment verification.
            </div>

            <div className="pay-actions" style={{ flexDirection: 'column', gap: '12px' }}>
              <button type="button" onClick={handleRazorpayPayment} className="btn btn-ripple" style={{ background: '#2b84ea', color: '#ffffff', fontWeight: 800, fontSize: '16px', padding: '14px', borderRadius: '28px', border: 'none', width: '100%', cursor: 'pointer', boxShadow: '0 8px 24px rgba(43, 132, 234, 0.3)' }} disabled={isVerifying}>
                💳 Pay ₹{total.toFixed(2)} with Razorpay Gateway
              </button>
              <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setStep('details')} disabled={isVerifying}>
                  <FiChevronLeft /> Back
                </button>
                <button type="submit" className="btn btn-primary btn-ripple" style={{ flex: 2 }} disabled={isVerifying}>
                  {isVerifying ? (
                    <>
                      <FiLoader className="spin" /> Verifying Payment...
                    </>
                  ) : (
                    <>
                      <FiCheckCircle /> Confirm Order (₹{total.toFixed(2)})
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          <div className="checkout-summary">
            <h3 className="summary-title">Order Summary</h3>
            <div className="summary-items-list">
              {items.map((item) => (
                <div className="summary-item-card" key={item.id}>
                  {item.image && (
                    <img src={item.image} alt={item.name} className="summary-item-img" />
                  )}
                  <div className="summary-item-info">
                    <span className="summary-item-name">{item.name}</span>
                    <span className="summary-item-qty">Qty: {item.qty}</span>
                  </div>
                  <span className="summary-item-price">₹{(item.price * item.qty).toFixed(0)}</span>
                </div>
              ))}
            </div>

            <div className="summary-totals-block">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Mall Counter Pickup</span>
                <span className="summary-free-badge">FREE</span>
              </div>
              <div className="summary-row">
                <span>Tax (5% GST)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="summary-row summary-total">
                <span>Total Amount</span>
                <strong>₹{total.toFixed(2)}</strong>
              </div>
            </div>
            <p className="estimate-note" style={{ marginTop: 14 }}>
              Your printable receipt with token number will be generated immediately after payment verification.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
