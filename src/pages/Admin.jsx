import React, { useState } from 'react';

const INITIAL_STORES = [
  'Book Stall', 'Bags', 'Cosmetics', 'Costumes', 'Ice Cream',
  'Shoes', 'Sports', 'Watches', 'Fragrance', 'Tickets'
];

const INITIAL_PRODUCTS = [
  { id: 'b1', name: 'The Alchemist', category: 'Book Stall', price: 299, stock: 45, status: 'Active' },
  { id: 'b2', name: 'Atomic Habits', category: 'Book Stall', price: 450, stock: 32, status: 'Active' },
  { id: 'bg1', name: 'Urban Explorer Backpack', category: 'Bags', price: 1499, stock: 18, status: 'Active' },
  { id: 'c1', name: 'Matte Liquid Lipstick', category: 'Cosmetics', price: 599, stock: 60, status: 'Active' },
  { id: 'cs1', name: 'Superhero Party Costume', category: 'Costumes', price: 1299, stock: 12, status: 'Active' },
  { id: 'i1', name: 'Belgian Chocolate Tub', category: 'Ice Cream', price: 280, stock: 25, status: 'Active' },
  { id: 's1', name: 'Pro Runner Sneakers', category: 'Shoes', price: 2499, stock: 14, status: 'Active' },
  { id: 'sp1', name: 'Premium Badminton Racket', category: 'Sports', price: 1899, stock: 22, status: 'Active' },
  { id: 'w1', name: 'Chronograph Leather Watch', category: 'Watches', price: 3499, stock: 8, status: 'Active' },
  { id: 'f1', name: 'Luxury Rose Perfume', category: 'Fragrance', price: 1999, stock: 30, status: 'Active' },
  { id: 't1', name: 'Movie IMAX VIP Ticket', category: 'Tickets', price: 650, stock: 100, status: 'Active' },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');

  // New Product Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProd, setNewProd] = useState({ name: '', category: 'Book Stall', price: '', stock: '' });

  // Sample or Local Orders
  const [adminOrders, setAdminOrders] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        if (data.products && data.products.length > 0) {
          setProducts(data.products.map(p => ({ ...p, status: 'Active' })));
        }
      }
    } catch (e) {
      console.warn('Using local initial products', e);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders?email=admin@mall.com');
      if (res.ok) {
        const data = await res.json();
        if (data.orders) {
          setAdminOrders(data.orders);
          return;
        }
      }
    } catch (e) {
      console.warn('Using local order history', e);
    }
    const local = JSON.parse(localStorage.getItem('mall_user_orders') || '[]');
    setAdminOrders(local.length > 0 ? local : [
      { orderId: 'ORD-882194', userName: 'Alex Johnson', items: [{ name: 'Urban Explorer Backpack', price: 1499 }], totalAmount: 1499, status: 'Pending', createdAt: new Date().toISOString() },
      { orderId: 'ORD-771203', userName: 'Sarah Miller', items: [{ name: 'Luxury Rose Perfume', price: 1999 }], totalAmount: 1999, status: 'Confirmed', createdAt: new Date().toISOString() },
    ]);
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (e) {
      console.warn('Error patching order', e);
    }

    const updated = adminOrders.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o);
    setAdminOrders(updated);
    localStorage.setItem('mall_user_orders', JSON.stringify(updated));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) return;
    const added = {
      id: `prod_${Date.now()}`,
      name: newProd.name,
      category: newProd.category,
      price: Number(newProd.price),
      stock: Number(newProd.stock || 10),
      status: 'Active'
    };

    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(added)
      });
    } catch (err) {
      console.warn('Error posting product', err);
    }

    setProducts([added, ...products]);
    setShowAddModal(false);
    setNewProd({ name: '', category: 'Book Stall', price: '', stock: '' });
  };

  const handleDeleteProduct = async (id) => {
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Error deleting product', e);
    }
    setProducts(products.filter(p => p.id !== id));
  };

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategoryFilter === 'All' || p.category === selectedCategoryFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const totalRevenue = adminOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return (
    <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
            🛡️ Platform Superuser Dashboard
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '4px 0 0 0' }}>
            Manage products, stock levels, orders, and view platform analytics across all 10 store categories
          </p>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '8px', backgroundColor: '#f1f5f9', padding: '4px', borderRadius: '12px' }}>
          {['overview', 'products', 'orders'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: activeTab === tab ? '#ffffff' : 'transparent',
                color: activeTab === tab ? '#2563eb' : '#64748b',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '0.88rem',
                boxShadow: activeTab === tab ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                textTransform: 'capitalize'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Key Metrics Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>Total Sales Revenue</span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#16a34a', margin: '8px 0 0 0' }}>₹{totalRevenue.toLocaleString()}</h3>
            </div>
            <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>Total Orders</span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#2563eb', margin: '8px 0 0 0' }}>{adminOrders.length}</h3>
            </div>
            <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>Total Products Listed</span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#9333ea', margin: '8px 0 0 0' }}>{products.length}</h3>
            </div>
            <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>Store Categories</span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0891b2', margin: '8px 0 0 0' }}>10 Active</h3>
            </div>
          </div>

          {/* Store Category Breakdown */}
          <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1rem', color: '#0f172a' }}>
              Active Store Hubs
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '14px' }}>
              {INITIAL_STORES.map((store) => {
                const count = products.filter(p => p.category === store).length;
                return (
                  <div key={store} style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#1e293b' }}>{store}</div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '4px' }}>{count} items listed</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* PRODUCTS MANAGEMENT TAB */}
      {activeTab === 'products' && (
        <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.88rem' }}
              />
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.88rem', backgroundColor: '#fff' }}
              >
                <option value="All">All Categories (10)</option>
                {INITIAL_STORES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              style={{
                backgroundColor: '#2563eb',
                color: '#fff',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '8px',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '0.88rem'
              }}
            >
              + Add New Product
            </button>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                  <th style={{ padding: '12px' }}>Product Name</th>
                  <th style={{ padding: '12px' }}>Category</th>
                  <th style={{ padding: '12px' }}>Price</th>
                  <th style={{ padding: '12px' }}>Stock</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px', fontWeight: '700', color: '#0f172a' }}>{p.name}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ backgroundColor: '#e0e7ff', color: '#3730a3', padding: '4px 10px', borderRadius: '12px', fontSize: '0.78rem', fontWeight: '700' }}>
                        {p.category}
                      </span>
                    </td>
                    <td style={{ padding: '12px', fontWeight: '700' }}>₹{p.price}</td>
                    <td style={{ padding: '12px' }}>{p.stock} units</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '700' }}>
                        {p.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        style={{ backgroundColor: '#fef2f2', color: '#dc2626', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: '700', cursor: 'pointer', fontSize: '0.78rem' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ORDERS MANAGEMENT TAB */}
      {activeTab === 'orders' && (
        <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1.2rem', color: '#0f172a' }}>
            Manage Incoming Orders
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {adminOrders.map((ord) => (
              <div key={ord.orderId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderRadius: '12px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <strong style={{ fontSize: '1rem', color: '#0f172a' }}>{ord.orderId}</strong>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Customer: {ord.userName || ord.userEmail}</div>
                  <div style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: '700', marginTop: '2px' }}>Amount: ₹{ord.totalAmount}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: '600' }}>Status:</span>
                  <select
                    value={ord.status}
                    onChange={(e) => handleUpdateOrderStatus(ord.orderId, e.target.value)}
                    style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#fff', fontWeight: '700', fontSize: '0.85rem' }}
                  >
                    <option value="Pending">⏳ Pending</option>
                    <option value="Confirmed">🚚 Confirmed</option>
                    <option value="Delivered">✅ Delivered</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999999 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '420px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1rem' }}>Add New Product</h3>
            <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Product Name</label>
                <input
                  type="text"
                  required
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Store Category</label>
                <select
                  value={newProd.category}
                  onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff' }}
                >
                  {INITIAL_STORES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Stock</label>
                  <input
                    type="number"
                    value={newProd.stock}
                    onChange={(e) => setNewProd({ ...newProd, stock: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button
                  type="submit"
                  style={{ flex: 1, backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}
                >
                  Save Product
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{ flex: 1, backgroundColor: '#f1f5f9', color: '#475569', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
