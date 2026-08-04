import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { FiCheckCircle, FiSmartphone, FiDollarSign } from 'react-icons/fi'
import { useCart } from '../context/CartContext.jsx'
import { api } from '../api.js'

// Merchant UPI details for the billing QR code.
const UPI_ID = '7816096147@naviaxis'
const PAYEE_NAME = 'JITHENDRA KUMAR'

const localUpiImages = import.meta.glob(
  '/src/assets/images/upi-*.{jpg,jpeg,png,webp,avif,svg,gif}',
  { eager: true, import: 'default' },
)
const localUpiImage = Object.values(localUpiImages)[0] || null

function buildUpiLink(amount) {
  const params = [
    `pa=${encodeURIComponent(UPI_ID)}`,
    `pn=${encodeURIComponent(PAYEE_NAME)}`,
    `am=${amount}`,
    'cu=INR',
    `tn=${encodeURIComponent('Lulu Mart Bangalore Bill')}`,
  ].join('&')
  return `upi://pay?${params}`
}

export default function Bill() {
  const { items, subtotal, grandTotal, clearCart } = useCart()
  const [method, setMethod] = useState(null) // null | 'upi' | 'cash'
  const [paid, setPaid] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [orderStatus, setOrderStatus] = useState('idle') // idle | creating | ready | error
  const [payError, setPayError] = useState('')

  // Create a pending order in MongoDB as soon as the bill screen loads,
  // so the order (and its items/total) is recorded even before payment.
  useEffect(() => {
    if (items.length === 0) return
    setOrderStatus('creating')
    api.createOrder({
      items: items.map((i) => ({ product: i._id, name: i.name, price: i.price, qty: i.qty, image: i.image })),
      subtotal,
      grandTotal,
    })
      .then((order) => { setOrderId(order._id); setOrderStatus('ready') })
      .catch(() => setOrderStatus('error'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const confirmPaid = async (paymentMethod) => {
    setPayError('')
    try {
      if (orderId) {
        await api.payOrder(orderId, paymentMethod)
      }
      setPaid(true)
      clearCart()
    } catch (err) {
      setPayError(err.message || 'Could not confirm payment. Please try again.')
    }
  }

  if (paid) {
    return (
      <div className="page-shell">
        <div className="container">
          <div className="order-success">
            <div className="success-icon"><FiCheckCircle /></div>
            <h1>Bill Paid Successfully!</h1>
            <p>Thank you for shopping at Lulu Mart Bangalore. Please collect your items at the counter.</p>
            {orderId && <p className="estimate-note">Order ID: {orderId}</p>}
            <Link to="/ice-creams" className="btn btn-primary">Continue Browsing</Link>
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="page-shell">
        <div className="container">
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add items to your cart before paying the bill.</p>
            <Link to="/ice-creams" className="btn btn-primary">Browse Ice Creams</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-shell">
      <div className="container">
        <div className="page-header">
          <span className="section-eyebrow">Billing Counter</span>
          <h1>Pay Bill</h1>
          <p>Choose a payment method to pay ₹{grandTotal}.</p>
        </div>

        {orderStatus === 'error' && (
          <div className="empty-state card" style={{ marginBottom: 20 }}>
            <p>Couldn't reach the server to record this order. Make sure the API is running — you can still confirm payment below, but it won't be saved to the database.</p>
          </div>
        )}

        <div className="checkout-layout">
          <div className="qr-pay-card">
            {/* Step 1: choose payment method */}
            {!method && (
              <div className="method-select">
                <h3>Choose Payment Method</h3>
                <div className="method-options">
                  <button className="method-option" onClick={() => setMethod('upi')}>
                    <FiSmartphone />
                    <span>UPI</span>
                    <small>Scan a QR code to pay</small>
                  </button>
                  <button className="method-option" onClick={() => setMethod('cash')}>
                    <FiDollarSign />
                    <span>Cash</span>
                    <small>Pay in cash at the counter</small>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2a: UPI - show QR */}
            {method === 'upi' && (
              <>
                <h3>Scan &amp; Pay</h3>
                <div className="qr-code-wrap">
                  <QRCodeSVG value={buildUpiLink(grandTotal)} size={220} bgColor="#FFFCF5" fgColor="#34241A" />
                </div>
                {localUpiImage && (
                  <div className="upi-image-wrap">
                    <img src={localUpiImage} alt="PhonePe UPI QR" />
                  </div>
                )}
                <p className="qr-amount">₹{grandTotal}</p>
                <p className="qr-payee">{PAYEE_NAME} · {UPI_ID}</p>
                <p className="qr-hint">Scan with Google Pay, PhonePe, Paytm, Navi or any UPI app</p>

                <div className="qr-status qr-status-waiting">Waiting for payment…</div>

                <button className="btn btn-primary confirm-manual-btn" onClick={() => confirmPaid('upi')}>
                  I've completed the payment
                </button>
                <button className="link-btn" onClick={() => setMethod(null)}>Change payment method</button>
                {payError && <p className="estimate-note" style={{ color: 'var(--burgundy)' }}>{payError}</p>}
                <p className="estimate-note">
                  Demo note: this app has no payment gateway connected, so
                  payment isn't verified automatically — tap the button above
                  once you've actually paid. A real store would connect this
                  QR to a UPI payment gateway (e.g. Razorpay, Cashfree) to
                  confirm payment automatically via a webhook.
                </p>
              </>
            )}

            {/* Step 2b: Cash - confirm at counter */}
            {method === 'cash' && (
              <>
                <h3>Pay in Cash</h3>
                <p className="qr-amount">₹{grandTotal}</p>
                <p className="qr-hint">Hand ₹{grandTotal} in cash to the counter staff.</p>
                <button className="btn btn-primary confirm-manual-btn" onClick={() => confirmPaid('cash')}>
                  Confirm Cash Received
                </button>
                <button className="link-btn" onClick={() => setMethod(null)}>Change payment method</button>
                {payError && <p className="estimate-note" style={{ color: 'var(--burgundy)' }}>{payError}</p>}
                <p className="estimate-note">
                  Demo note: this button represents the counter staff marking
                  the bill as paid once cash is physically received.
                </p>
              </>
            )}
          </div>

          <div className="cart-summary">
            <h3>Bill Summary</h3>
            {items.map((item) => (
              <div className="summary-row" key={item._id}>
                <span>{item.name} × {item.qty}</span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
            <div className="summary-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
            <div className="summary-row total"><span>Total Payable</span><span>₹{grandTotal}</span></div>
            <p className="estimate-note">*Prices are typical mart estimates, not confirmed shelf prices.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
