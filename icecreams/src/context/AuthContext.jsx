/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext();

const USERS_KEY = 'scoopco_users';
const SESSION_KEY = 'scoopco_session';
const ORDERS_KEY = 'scoopco_orders';

const readJSON = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => readJSON(USERS_KEY, []));
  const [user, setUser] = useState(() => {
    const email = localStorage.getItem(SESSION_KEY);
    if (!email) return null;
    const found = readJSON(USERS_KEY, []).find((u) => u.email === email);
    return found ? { name: found.name, email: found.email, phone: found.phone || '' } : null;
  });
  const [orders, setOrders] = useState(() => readJSON(ORDERS_KEY, {}));
  const { showToast } = useToast();

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (user) localStorage.setItem(SESSION_KEY, user.email);
    else localStorage.removeItem(SESSION_KEY);
  }, [user]);

  const normalizeEmail = (email) => email.trim().toLowerCase();

  const signup = ({ name, email, password, phone }) => {
    const cleanEmail = normalizeEmail(email);
    if (users.some((u) => u.email === cleanEmail)) {
      return { ok: false, error: 'An account with this email already exists.' };
    }
    const newUser = { name: name.trim(), email: cleanEmail, password, phone: phone || '' };
    setUsers((prev) => [...prev, newUser]);
    setUser({ name: newUser.name, email: newUser.email, phone: newUser.phone });
    showToast(`Welcome to Scoop & Co., ${newUser.name.split(' ')[0]}!`, 'success');
    return { ok: true };
  };

  const login = ({ email, password }) => {
    const cleanEmail = normalizeEmail(email);
    const found = users.find((u) => u.email === cleanEmail);
    if (!found || found.password !== password) {
      return { ok: false, error: 'Incorrect email or password.' };
    }
    setUser({ name: found.name, email: found.email, phone: found.phone || '' });
    showToast(`Welcome back, ${found.name.split(' ')[0]}!`, 'success');
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    showToast('You have been logged out.', 'info');
  };

  const updateProfile = ({ name, phone }) => {
    if (!user) return;
    setUsers((prev) => prev.map((u) => (u.email === user.email ? { ...u, name, phone } : u)));
    setUser((prev) => ({ ...prev, name, phone }));
    showToast('Profile updated.', 'success');
  };

  const addOrder = (order) => {
    if (!user) return;
    setOrders((prev) => ({
      ...prev,
      [user.email]: [{ ...order, id: `ORD${Date.now()}`, date: new Date().toISOString() }, ...(prev[user.email] || [])],
    }));
  };

  const myOrders = user ? orders[user.email] || [] : [];

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, updateProfile, addOrder, myOrders }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
