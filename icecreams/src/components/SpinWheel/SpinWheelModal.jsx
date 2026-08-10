import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiGift, FiCheck, FiZap, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './spinWheel.css';

const PRIZES = [
  { id: 1, label: '15% OFF', code: 'SCOOP15', pct: 15, amt: 0, color: '#7A1F2B', bg: '#7A1F2B' },
  { id: 2, label: '₹100 OFF', code: 'FAMILY100', pct: 0, amt: 100, color: '#C74163', bg: '#C74163' },
  { id: 3, label: '20% OFF', code: 'SUNDAE20', pct: 20, amt: 0, color: '#6A4C93', bg: '#6A4C93' },
  { id: 4, label: '₹50 OFF', code: 'LUXURY50', pct: 0, amt: 50, color: '#B78103', bg: '#B78103' },
  { id: 5, label: '10% OFF', code: 'SCOOP10', pct: 10, amt: 0, color: '#27AE60', bg: '#27AE60' },
  { id: 6, label: '₹75 OFF', code: 'COMBO75', pct: 0, amt: 75, color: '#2980B9', bg: '#2980B9' },
];

export default function SpinWheelModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState(null);

  const { applyCoupon, appliedCoupon } = useCart();
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-spin-wheel', handleOpen);
    return () => window.removeEventListener('open-spin-wheel', handleOpen);
  }, []);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWonPrize(null);

    // Pick random prize index 0-5
    const prizeIndex = Math.floor(Math.random() * PRIZES.length);
    const prize = PRIZES[prizeIndex];

    // Calculate rotation degree (360 / 6 = 60 deg per slice)
    const sliceDeg = 360 / PRIZES.length;
    // Extra 5 full rotations (1800 deg) + offset to align top pointer
    const targetDeg = 1800 + (PRIZES.length - prizeIndex) * sliceDeg - sliceDeg / 2;

    setRotation(targetDeg);

    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(prize);
      applyCoupon(prize.code, prize.pct, prize.amt, prize.label);
    }, 4200);
  };

  return (
    <>
      {/* Floating Gift Trigger Button */}
      <motion.button
        className="spin-trigger-btn"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(true)}
        title="Spin the Wheel to win instant discount!"
      >
        <FiGift className="spin-gift-icon" />
        <span className="spin-trigger-text">Spin &amp; Win!</span>
        {appliedCoupon && <span className="spin-active-dot"></span>}
      </motion.button>

      {/* Wheel Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="spin-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isSpinning && setIsOpen(false)}
          >
            <motion.div
              className="spin-modal-card"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="spin-close-btn"
                onClick={() => !isSpinning && setIsOpen(false)}
                disabled={isSpinning}
              >
                <FiX />
              </button>

              <div className="spin-card-header">
                <span className="eyebrow" style={{ color: 'var(--primary-pink)' }}>Lucky Wheel</span>
                <h2>Spin &amp; Win Instant Discount!</h2>
                <p>Spin the Lulu Mall wheel to unlock exclusive coupon codes for your ice cream order.</p>
              </div>

              {/* Spin Wheel Graphic Container */}
              <div className="spin-wheel-container">
                <div className="spin-pointer">▼</div>

                <div
                  className="spin-wheel"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: isSpinning ? 'transform 4s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none',
                  }}
                >
                  {PRIZES.map((p, idx) => {
                    const sliceAngle = 360 / PRIZES.length;
                    const rotateAngle = idx * sliceAngle;
                    return (
                      <div
                        key={p.id}
                        className="wheel-slice"
                        style={{
                          transform: `rotate(${rotateAngle}deg)`,
                          backgroundColor: p.bg,
                        }}
                      >
                        <span className="wheel-slice-text">{p.label}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="spin-wheel-center">🍨</div>
              </div>

              {/* Action Buttons & Winner Announcement */}
              {wonPrize ? (
                <div className="spin-win-box">
                  <div className="spin-win-badge">🎉 CONGRATULATIONS!</div>
                  <h3>You Won <strong>{wonPrize.label}</strong>!</h3>
                  <p>Coupon Code <strong>{wonPrize.code}</strong> has been auto-applied to your cart.</p>
                  <div className="spin-win-actions">
                    <button
                      className="btn btn-primary btn-ripple"
                      style={{ width: '100%' }}
                      onClick={() => {
                        setIsOpen(false);
                        navigate('/checkout');
                      }}
                    >
                      <FiZap /> Go to Checkout &amp; Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="spin-actions">
                  <button
                    className="btn btn-primary btn-ripple spin-play-btn"
                    disabled={isSpinning}
                    onClick={handleSpin}
                  >
                    {isSpinning ? 'Spinning Wheel... 🎡' : '🎰 Spin the Wheel Now!'}
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
