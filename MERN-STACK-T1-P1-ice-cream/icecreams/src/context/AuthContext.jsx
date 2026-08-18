/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const AuthContext = createContext();

// NOTE: This is a client-only demo auth system — accounts, orders and
// passwords all live in the browser's localStorage with no hashing or
// server verification. That's fine for prototyping, but before this is
// used with real customers, move signup/login to a real backend with
// hashed passwords (e.g. bcrypt) and server-issued sessions/JWTs.
const USERS_KEY = 'scoopco_users';
const SESSION_KEY = 'scoopco_session';
const ORDERS_KEY = 'scoopco_orders';

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage(USERS_KEY, []);
  const [sessionEmail, setSessionEmail] = useLocalStorage(SESSION_KEY, null);
  const [orders, setOrders] = useLocalStorage(ORDERS_KEY, {});
  const { showToast } = useToast();

  const [user, setUser] = useState(() => {
    if (!sessionEmail) return null;
    const found = users.find((u) => u.email === sessionEmail);
    return found ? { name: found.name, email: found.email, phone: found.phone || '' } : null;
  });

  useEffect(() => {
    setSessionEmail(user ? user.email : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
