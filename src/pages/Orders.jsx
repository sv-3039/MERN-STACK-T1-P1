import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // Try backend endpoint first
      const res = await fetch(`/api/orders?email=${user?.email || ''}`).catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      } else {
        // Fallback to offline stored orders
        const local = JSON.parse(localStorage.getItem('mall_user_orders') || '[]');
        setOrders(local);
      }
    } catch {
      const local = JSON.parse(localStorage.getItem('mall_user_orders') || '[]');
      setOrders(local);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return { bg: '#dcfce7', color: '#15803d', label: '✅ Delivered' };
      case 'Confirmed':
        return { bg: '#dbeafe', color: '#1d4ed8', label: '🚚 Confirmed' };
      default:
        return { bg: '#fef3c7', color: '#b45309', label: '⏳ Pending' };
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '0 20px' }}>
      <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.5rem', textAlign: 'center' }}>
        📦 Order History
      </h2>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>Loading orders...</div>
      ) : orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px 20px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem' }}>No Orders Found</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>You haven't placed any orders yet. Start exploring our mall stores!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {orders.map((order, idx) => {
            const badge = getStatusBadge(order.status || 'Pending');
            return (
              <div
                key={order.orderId || idx}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #f1f5f9'
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '14px', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Order ID</span>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', margin: '2px 0 0 0' }}>{order.orderId}</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Date</span>
                    <div style={{ fontSize: '0.9rem', color: '#334155', fontWeight: '600' }}>
                      {new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                  <span
                    style={{
                      backgroundColor: badge.bg,
                      color: badge.color,
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '0.82rem',
                      fontWeight: '800'
                    }}
                  >
                    {badge.label}
                  </span>
                </div>

                {/* Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                  {order.items?.map((item, itemIdx) => (
                    <div key={itemIdx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1e293b' }}>{item.name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                          Store: {item.storeId || 'General'} • Qty: {item.quantity} × ₹{item.price}
                        </div>
                      </div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a' }}>
                        ₹{(item.quantity * item.price).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '12px', fontSize: '0.88rem' }}>
                  <div style={{ color: '#64748b' }}>
                    Shipping to: <strong style={{ color: '#334155' }}>{order.shippingAddress || 'Customer Address'}</strong>
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#2563eb' }}>
                    Total Paid: ₹{order.totalAmount?.toLocaleString()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
