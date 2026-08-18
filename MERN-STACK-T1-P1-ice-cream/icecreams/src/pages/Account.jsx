import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPackage, FiLogOut, FiSave } from 'react-icons/fi';
import PageHeader from '../components/common/PageHeader';
import { useAuth } from '../context/AuthContext';
import './account.css';

export default function Account() {
  const { user, logout, updateProfile, myOrders } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '' });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (user) setForm({ name: user.name, phone: user.phone || '' });
  }, [user]);

  if (!user) return <Navigate to="/login" state={{ from: '/account' }} replace />;

  const initials = user.name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(form);
  };

  return (
    <>
      <PageHeader eyebrow="Your Space" title="My Account" sub="Manage your details and track your orders." />
      <section className="section">
        <div className="container account-layout">
          <motion.div className="account-card" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="account-avatar">{initials}</div>
            <h3>{user.name}</h3>
            <p className="account-email">{user.email}</p>

            <form className="account-edit-form" onSubmit={handleSubmit}>
              <label>
                Full Name
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </label>
              <label>
                Phone Number
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="98765 43210"
                />
              </label>
              <button type="submit" className="btn btn-primary btn-ripple">
                Save Changes <FiSave />
              </button>
            </form>

            <button className="btn btn-outline account-logout" onClick={logout}>
              Logout <FiLogOut />
            </button>
          </motion.div>

          <motion.div className="account-orders-block" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h3><FiPackage /> Order History</h3>

            {myOrders.length === 0 ? (
              <div className="empty-state" style={{ padding: '20px 0' }}>
                <p>You haven't placed any orders yet.</p>
                <Link to="/products" className="btn btn-primary btn-ripple" style={{ marginTop: 12 }}>
                  Start Shopping
                </Link>
              </div>
            ) : (
              myOrders.map((order) => (
                <div className="order-card" key={order.id}>
                  <div className="order-card-top">
                    <strong>{order.id}</strong>
                    <span>{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span className="order-status">Confirmed</span>
                  </div>
                  <p className="order-items-line">
                    {order.items.map((i) => `${i.name} x${i.qty}`).join(', ')}
                  </p>
                  <p className="order-card-total">Total: ₹{order.total.toFixed(2)}</p>
                </div>
              ))
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
