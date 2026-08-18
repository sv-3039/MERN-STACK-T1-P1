import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff, FiTag, FiUserPlus } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './auth.css';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setFormError('');
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Full name is required.';
    if (!form.email.trim()) next.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (form.phone && !/^\d{10}$/.test(form.phone.trim())) next.phone = 'Enter a valid 10-digit number.';
    if (!form.password) next.password = 'Password is required.';
    else if (form.password.length < 6) next.password = 'Use at least 6 characters.';
    if (form.confirm !== form.password) next.confirm = 'Passwords do not match.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const result = signup(form);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    navigate(from, { replace: true });
  };

  return (
    <section className="auth-section">
      <div className="container">
        <motion.div
          className="auth-shell"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-visual">
            <img
              src="https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?auto=format&fit=crop&w=900&q=80"
              alt="Gelato counter"
            />
            <div className="auth-visual-overlay" />
            <div className="auth-visual-content">
              <span className="eyebrow"><FiTag /> Join Scoop &amp; Co.</span>
              <h2>Create your account in seconds</h2>
              <p>Unlock faster checkout, order tracking, exclusive offers and a wishlist that's always in sync.</p>
            </div>
          </div>

          <div className="auth-form-side">
            <h1>Create Your Account</h1>
            <p className="auth-sub">It only takes a minute to get started.</p>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              {formError && <div className="auth-form-error">{formError}</div>}

              <label className={`auth-field ${errors.name ? 'has-error' : ''}`}>
                Full Name
                <span className="auth-input-wrap">
                  <FiUser />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </span>
                {errors.name && <span className="auth-error-text">{errors.name}</span>}
              </label>

              <label className={`auth-field ${errors.email ? 'has-error' : ''}`}>
                Email
                <span className="auth-input-wrap">
                  <FiMail />
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </span>
                {errors.email && <span className="auth-error-text">{errors.email}</span>}
              </label>

              <label className={`auth-field ${errors.phone ? 'has-error' : ''}`}>
                Phone Number <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>(optional)</span>
                <span className="auth-input-wrap">
                  <FiPhone />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="98765 43210"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </span>
                {errors.phone && <span className="auth-error-text">{errors.phone}</span>}
              </label>

              <label className={`auth-field ${errors.password ? 'has-error' : ''}`}>
                Password
                <span className="auth-input-wrap">
                  <FiLock />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="At least 6 characters"
                    value={form.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="auth-toggle-visibility"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </span>
                {errors.password && <span className="auth-error-text">{errors.password}</span>}
              </label>

              <label className={`auth-field ${errors.confirm ? 'has-error' : ''}`}>
                Confirm Password
                <span className="auth-input-wrap">
                  <FiLock />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirm"
                    placeholder="Re-enter password"
                    value={form.confirm}
                    onChange={handleChange}
                  />
                </span>
                {errors.confirm && <span className="auth-error-text">{errors.confirm}</span>}
              </label>

              <button type="submit" className="btn btn-primary btn-ripple auth-submit">
                Create Account <FiUserPlus />
              </button>
            </form>

            <p className="auth-switch">
              Already have an account? <Link to="/login" state={{ from }}>Login</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
