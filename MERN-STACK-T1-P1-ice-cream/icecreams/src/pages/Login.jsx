import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiTag, FiLogIn } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './auth.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const [form, setForm] = useState({ email: '', password: '' });
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
    if (!form.email.trim()) next.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (!form.password) next.password = 'Password is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const result = login(form);
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
              src="https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=900&q=80"
              alt="Assorted ice cream scoops"
            />
            <div className="auth-visual-overlay" />
            <div className="auth-visual-content">
              <span className="eyebrow"><FiTag /> Welcome Back</span>
              <h2>Pick up right where you left off</h2>
              <p>Sign in to track orders, save your favourite flavours and breeze through checkout.</p>
            </div>
          </div>

          <div className="auth-form-side">
            <h1>Login to Scoop &amp; Co.</h1>
            <p className="auth-sub">Enter your details to access your account.</p>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              {formError && <div className="auth-form-error">{formError}</div>}

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

              <label className={`auth-field ${errors.password ? 'has-error' : ''}`}>
                Password
                <span className="auth-input-wrap">
                  <FiLock />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Your password"
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

              <button type="submit" className="btn btn-primary btn-ripple auth-submit">
                Login <FiLogIn />
              </button>
            </form>

            <p className="auth-switch">
              New to Scoop &amp; Co.? <Link to="/signup" state={{ from }}>Create an account</Link>
            </p>

            <p className="auth-demo-hint">
              Tip: sign up once to create your account, then log back in with the same email &amp; password any time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
