import { useState } from "react";
import "./Offers.css";

function Offers() {
  // ---- Mocked countdown timer state (04h : 22m : 15s) ----
  const [hours, setHours] = useState(4);
  const [minutes, setMinutes] = useState(22);
  const [seconds, setSeconds] = useState(15);

  // ---- Active filter chip state ----
  const [activeFilter, setActiveFilter] = useState("All Offers");

  // ---- Track which coupon code has been copied ----
  const [copiedCode, setCopiedCode] = useState(null);

  const filterOptions = [
    "All Offers",
    "Buy 1 Get 1 Free",
    "Under ₹399",
    "Combo Kits",
  ];

  // ---- Coupon data ----
  const coupons = [
    {
      id: 1,
      badge: "FLAT 20% OFF",
      title: "Friends & Family",
      description: "Get a flat 20% off on your entire beauty cart.",
      minSpend: "Valid on orders above ₹999",
      code: "RADHA20",
      category: "All Offers",
    },
    {
      id: 2,
      badge: "BUY 1 GET 1 FREE",
      title: "Lipstick Duo",
      description: "Buy any lipstick and get a second one absolutely free.",
      minSpend: "Valid on orders above ₹499",
      code: "BOGO1",
      category: "Buy 1 Get 1 Free",
    },
    {
      id: 3,
      badge: "FLAT 50% OFF",
      title: "Festive Glam Sale",
      description: "Save up to 50% on selected festive makeup palettes.",
      minSpend: "Valid on orders above ₹1999",
      code: "GLAM50",
      category: "All Offers",
    },
    {
      id: 4,
      badge: "₹100 OFF",
      title: "Budget Beauty",
      description: "Flat ₹100 off on budget-friendly skincare picks.",
      minSpend: "Valid on orders above ₹399",
      code: "UNDER399",
      category: "Under ₹399",
    },
    {
      id: 5,
      badge: "COMBO KIT",
      title: "Starter Beauty Combo",
      description: "Exclusive discounts on curated starter beauty combos.",
      minSpend: "Valid on all combo kits",
      code: "COMBO10",
      category: "Combo Kits",
    },
    {
      id: 6,
      badge: "FREE SHIPPING",
      title: "Glow Combo",
      description: "Get free shipping + a bonus mini serum on combo kits.",
      minSpend: "Valid on combo kits above ₹1499",
      code: "GLOWFREE",
      category: "Combo Kits",
    },
  ];

  // ---- Mocked countdown ticker (decrements every second) ----
  setTimeout(() => {
    if (seconds > 0) {
      setSeconds(seconds - 1);
    } else if (minutes > 0) {
      setMinutes(minutes - 1);
      setSeconds(59);
    } else if (hours > 0) {
      setHours(hours - 1);
      setMinutes(59);
      setSeconds(59);
    }
  }, 1000);

  // ---- Filter logic ----
  const filteredCoupons =
    activeFilter === "All Offers"
      ? coupons
      : coupons.filter((c) => c.category === activeFilter);

  // ---- Copy code handler ----
  const handleCopy = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    });
  };

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="offers-page">
      {/* ============ 1. HERO PROMO BANNER ============ */}
      <section className="offers-hero">
        <div className="offers-hero-content">
          <span className="offers-hero-badge">✦ Limited Time ✦</span>
          <h1 className="offers-hero-title">Festive Glam Sale — Up to 50% Off</h1>
          <p className="offers-hero-subtitle">
            Unwrap dazzling beauty deals on lipsticks, glow kits & more!
          </p>

          {/* Countdown timer */}
          <div className="offers-countdown" aria-label="Offer countdown timer">
            <div className="offers-countdown-box">
              <span className="offers-countdown-value">{pad(hours)}</span>
              <span className="offers-countdown-label">Hours</span>
            </div>
            <span className="offers-countdown-colon">:</span>
            <div className="offers-countdown-box">
              <span className="offers-countdown-value">{pad(minutes)}</span>
              <span className="offers-countdown-label">Minutes</span>
            </div>
            <span className="offers-countdown-colon">:</span>
            <div className="offers-countdown-box">
              <span className="offers-countdown-value">{pad(seconds)}</span>
              <span className="offers-countdown-label">Seconds</span>
            </div>
          </div>

          <p className="offers-hero-end">Ending soon! Grab your glam before it's gone.</p>
        </div>
      </section>

      {/* ============ 2. QUICK FILTER CHIPS ============ */}
      <section className="offers-filters">
        <div className="offers-chips">
          {filterOptions.map((option) => (
            <button
              key={option}
              className={`offers-chip ${activeFilter === option ? "offers-chip-active" : ""}`}
              onClick={() => setActiveFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      {/* ============ 3. COUPON CODE CARDS ============ */}
      <section className="offers-coupons">
        <h2 className="offers-section-title">Exclusive Coupon Codes</h2>
        <div className="offers-grid">
          {filteredCoupons.map((coupon) => (
            <div className="offers-card" key={coupon.id}>
              <span className="offers-badge">{coupon.badge}</span>
              <h3 className="offers-card-title">{coupon.title}</h3>
              <p className="offers-card-desc">{coupon.description}</p>
              <p className="offers-min-spend">{coupon.minSpend}</p>

              {/* Dashed-border promo code box */}
              <div className="offers-code-box">
                <span className="offers-code">{coupon.code}</span>
                <button
                  className="offers-copy-btn"
                  onClick={() => handleCopy(coupon.code)}
                >
                  {copiedCode === coupon.code ? "Copied! ✓" : "Copy Code"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Offers;
