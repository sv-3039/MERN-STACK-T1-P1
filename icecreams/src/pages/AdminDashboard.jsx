import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { brands, categories } from '../data/products.js';
import StoreAnalytics from '../components/Admin/StoreAnalytics.jsx';
import {
  FiLock,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiRefreshCw,
  FiPackage,
  FiCheckCircle,
  FiAlertCircle,
  FiDollarSign,
  FiShoppingBag,
  FiX,
  FiCheck,
  FiTrendingUp,
} from 'react-icons/fi';
import './admin.css';

export default function AdminDashboard() {
  const {
    products,
    combos,
    loading,
    isServerOnline,
    addProduct,
    updateProduct,
    deleteProduct,
    addCombo,
    updateCombo,
    deleteCombo,
    resetDatabase,
  } = useProducts();
  const { addToast } = useToast();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem('admin_token'))
  );
  const [loginCreds, setLoginCreds] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Dashboard Active Tab
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders' | 'analytics'

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSection, setSelectedSection] = useState('all'); // 'all' | 'popular' | 'family-packs' | 'sundaes' | 'milkshakes' | 'kulfi' | 'gelato'

  // Product Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProductId, setDeletingProductId] = useState(null);

  const defaultForm = {
    name: '',
    brand: 'Amul',
    brandId: 'amul',
    flavor: 'Vanilla',
    category: 'cups',
    price: '',
    mrp: '',
    rating: '4.8',
    reviewsCount: 25,
    stock: 30,
    image: '',
    description: '',
    isNew: false,
    isBestseller: false,
  };

  const [formData, setFormData] = useState(defaultForm);

  // Combo Modal States
  const [isComboModalOpen, setIsComboModalOpen] = useState(false);
  const [editingCombo, setEditingCombo] = useState(null);
  const [deletingComboId, setDeletingComboId] = useState(null);

  const defaultComboForm = {
    name: '',
    tag: 'Best Value',
    price: '',
    mrp: '',
    image: '',
    description: '',
  };

  const [comboFormData, setComboFormData] = useState(defaultComboForm);

  const handleOpenAddCombo = () => {
    setComboFormData(defaultComboForm);
    setEditingCombo(null);
    setIsComboModalOpen(true);
  };

  const handleOpenEditCombo = (cb) => {
    setEditingCombo(cb);
    setComboFormData({
      name: cb.name || '',
      tag: cb.tag || 'Best Value',
      price: cb.price || '',
      mrp: cb.mrp || '',
      image: cb.image || '',
      description: cb.description || '',
    });
    setIsComboModalOpen(true);
  };

  const handleSubmitComboForm = async (e) => {
    e.preventDefault();
    if (!comboFormData.name || !comboFormData.price) {
      addToast('Please enter Combo Title and Price', 'error');
      return;
    }

    if (editingCombo) {
      const res = await updateCombo(editingCombo.id, comboFormData);
      if (res.success) {
        addToast(`Updated combo "${comboFormData.name}"`, 'success');
        setIsComboModalOpen(false);
      }
    } else {
      const res = await addCombo(comboFormData);
      if (res.success) {
        addToast(`Added new combo "${comboFormData.name}"`, 'success');
        setIsComboModalOpen(false);
      }
    }
  };

  const handleConfirmDeleteCombo = async () => {
    if (!deletingComboId) return;
    const res = await deleteCombo(deletingComboId);
    if (res.success) {
      addToast('Combo offer removed from store', 'info');
    }
    setDeletingComboId(null);
  };

  // --- AUTHENTICATION ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginCreds.username === 'admin' && loginCreds.password === 'admin123') {
      localStorage.setItem('admin_token', 'admin-session-active');
      setIsAuthenticated(true);
      setLoginError('');
      addToast('Welcome Admin! Logged in successfully.', 'success');
    } else {
      setLoginError('Invalid credentials. Use admin / admin123');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    addToast('Logged out from Admin Dashboard', 'info');
  };

  // --- OPEN ADD MODAL ---
  const handleOpenAdd = () => {
    setFormData(defaultForm);
    setEditingProduct(null);
    setIsAddModalOpen(true);
  };

  // --- OPEN EDIT MODAL ---
  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name || '',
      brand: prod.brand || 'Amul',
      brandId: prod.brandId || 'amul',
      flavor: prod.flavor || 'Vanilla',
      category: prod.category || 'cups',
      price: prod.price || '',
      mrp: prod.mrp || '',
      rating: prod.rating || '4.8',
      reviewsCount: prod.reviewsCount || 25,
      stock: prod.stock || 20,
      image: prod.image || '',
      description: prod.description || '',
      isNew: Boolean(prod.isNew),
      isBestseller: Boolean(prod.isBestseller),
    });
    setIsAddModalOpen(true);
  };

  // --- SUBMIT ADD / EDIT ---
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      addToast('Please enter Product Name and Price', 'error');
      return;
    }

    if (editingProduct) {
      const res = await updateProduct(editingProduct.id, formData);
      if (res.success) {
        addToast(`Updated product "${formData.name}"`, 'success');
        setIsAddModalOpen(false);
      } else {
        addToast(res.message || 'Failed to update product', 'error');
      }
    } else {
      const res = await addProduct(formData);
      if (res.success) {
        addToast(`Added new product "${formData.name}"`, 'success');
        setIsAddModalOpen(false);
      } else {
        addToast(res.message || 'Failed to add product', 'error');
      }
    }
  };

  // --- CONFIRM DELETE ---
  const handleConfirmDelete = async () => {
    if (!deletingProductId) return;
    const res = await deleteProduct(deletingProductId);
    if (res.success) {
      addToast('Product deleted from inventory', 'info');
    } else {
      addToast('Failed to delete product', 'error');
    }
    setDeletingProductId(null);
  };

  // --- FILTERED PRODUCTS ---
  const filteredProducts = products
    .filter((p) => {
      const searchLower = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !searchLower ||
        p.name?.toLowerCase().includes(searchLower) ||
        p.flavor?.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower);

      const matchesBrand = !selectedBrand || p.brandId === selectedBrand;

      const pCatNorm = (p.category || '').toLowerCase().trim();
      const selCatNorm = (selectedCategory || '').toLowerCase().trim();
      const matchesCategory = !selCatNorm || pCatNorm === selCatNorm;

      let matchesSection = true;
      if (selectedSection === 'popular') {
        matchesSection = Boolean(p.isBestseller);
      } else if (selectedSection === 'premium') {
        matchesSection = p.category === 'premium' || Boolean(p.isPremium);
      } else if (selectedSection !== 'all') {
        const secNorm = selectedSection.toLowerCase().trim();
        matchesSection = pCatNorm === secNorm;
      }

      return matchesSearch && matchesBrand && matchesCategory && matchesSection;
    })
    .sort((a, b) => {
      // Prioritize Scoop & Co. Section Exclusives at the very top
      if (a.brandId === 'scoop-co' && b.brandId !== 'scoop-co') return -1;
      if (a.brandId !== 'scoop-co' && b.brandId === 'scoop-co') return 1;
      return 0;
    });

  // KPI Statistics
  const totalProducts = products.length;
  const inStockCount = products.filter((p) => Number(p.stock) > 0).length;
  const outOfStockCount = products.filter((p) => Number(p.stock) <= 0).length;
  const totalBrandsCount = new Set(products.map((p) => p.brandId)).size;

  // Render Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="admin-login-screen">
        <div className="admin-login-card">
          <div className="admin-login-icon">
            <FiLock />
          </div>
          <h2>Admin Control Portal</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
            Manage Store Inventory, Pricing & Pickup Orders
          </p>

          {loginError && (
            <div
              style={{
                background: '#fee2e2',
                color: '#dc2626',
                padding: '10px',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
            <div className="admin-form-group" style={{ marginBottom: '16px' }}>
              <label>Username</label>
              <input
                type="text"
                placeholder="admin"
                value={loginCreds.username}
                onChange={(e) => setLoginCreds({ ...loginCreds, username: e.target.value })}
                required
              />
            </div>
            <div className="admin-form-group" style={{ marginBottom: '24px' }}>
              <label>Password</label>
              <input
                type="password"
                placeholder="admin123"
                value={loginCreds.password}
                onChange={(e) => setLoginCreds({ ...loginCreds, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="admin-btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Sign In to Admin Portal
            </button>
          </form>
          <p style={{ marginTop: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
            Default credentials: <strong>admin</strong> / <strong>admin123</strong>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-cream)', minHeight: '100vh', paddingBottom: '60px' }}>
      {/* Top Header Bar */}
      <div className="admin-header-bar">
        <div className="container admin-nav-content">
          <div className="admin-title-group">
            <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Scoop & Co. Store Admin</h2>
            <span className="admin-badge">Mall Counter #3</span>
            <div className={`admin-status-pill ${isServerOnline ? 'online' : 'offline'}`}>
              <span className="status-dot"></span>
              {isServerOnline ? 'Backend API Live' : 'Local Storage Mode'}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button className="admin-btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '30px' }}>
        {/* KPI Stats Grid */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="stat-info">
              <h3>{totalProducts}</h3>
              <p>Total Products</p>
            </div>
            <div className="stat-icon-wrapper">
              <FiPackage />
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="stat-info">
              <h3>{totalBrandsCount}</h3>
              <p>Active Brands</p>
            </div>
            <div className="stat-icon-wrapper">
              <FiShoppingBag />
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="stat-info">
              <h3>{inStockCount}</h3>
              <p>In-Stock Items</p>
            </div>
            <div className="stat-icon-wrapper" style={{ background: '#e6f4ea', color: '#1e8e3e' }}>
              <FiCheckCircle />
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="stat-info">
              <h3>{outOfStockCount}</h3>
              <p>Out of Stock</p>
            </div>
            <div className="stat-icon-wrapper" style={{ background: '#feefee', color: '#d93025' }}>
              <FiAlertCircle />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="admin-tabs">
          <div className="admin-tab-group">
            <button
              className={`admin-tab-btn ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <FiPackage /> Product Inventory ({filteredProducts.length})
            </button>
            <button
              className={`admin-tab-btn ${activeTab === 'combos' ? 'active' : ''}`}
              onClick={() => setActiveTab('combos')}
            >
              <FiShoppingBag /> Combo Offers ({combos.length})
            </button>
            <button
              className={`admin-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <FiShoppingBag /> Counter Orders
            </button>
            <button
              className={`admin-tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              <FiTrendingUp /> Store Analytics
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="admin-btn-secondary" onClick={resetDatabase} title="Reset to default seed">
              <FiRefreshCw /> Reset DB
            </button>
            {activeTab === 'combos' ? (
              <button className="admin-btn-primary" onClick={handleOpenAddCombo}>
                <FiPlus /> Add New Combo
              </button>
            ) : (
              <button className="admin-btn-primary" onClick={handleOpenAdd}>
                <FiPlus /> Add New Product
              </button>
            )}
          </div>
        </div>

        {/* --- PRODUCTS TAB --- */}
        {activeTab === 'products' && (
          <>
            {/* Section Quick Filter Pills */}
            <div className="section-filter-pills">
              <button
                className={`admin-pill ${selectedSection === 'all' && !selectedCategory ? 'active' : ''}`}
                onClick={() => {
                  setSelectedSection('all');
                  setSelectedCategory('');
                }}
              >
                🍨 All Products ({products.length})
              </button>
              <button
                className={`admin-pill ${selectedSection === 'popular' ? 'active' : ''}`}
                onClick={() => {
                  setSelectedSection('popular');
                  setSelectedCategory('');
                }}
              >
                ⭐ Popular Section ({products.filter((p) => p.isBestseller).length})
              </button>
              <button
                className={`admin-pill ${selectedSection === 'family-packs' || selectedCategory === 'family-packs' ? 'active' : ''}`}
                onClick={() => {
                  setSelectedSection('family-packs');
                  setSelectedCategory('');
                }}
              >
                🧊 Family Packs ({products.filter((p) => p.category === 'family-packs').length})
              </button>
              <button
                className={`admin-pill ${selectedSection === 'sundaes' || selectedCategory === 'sundaes' ? 'active' : ''}`}
                onClick={() => {
                  setSelectedSection('sundaes');
                  setSelectedCategory('');
                }}
              >
                🍧 Sundaes ({products.filter((p) => p.category === 'sundaes').length})
              </button>
              <button
                className={`admin-pill ${selectedSection === 'milkshakes' || selectedCategory === 'milkshakes' ? 'active' : ''}`}
                onClick={() => {
                  setSelectedSection('milkshakes');
                  setSelectedCategory('');
                }}
              >
                🥤 Milkshakes ({products.filter((p) => p.category === 'milkshakes').length})
              </button>
              <button
                className={`admin-pill ${selectedSection === 'kulfi' || selectedCategory === 'kulfi' ? 'active' : ''}`}
                onClick={() => {
                  setSelectedSection('kulfi');
                  setSelectedCategory('');
                }}
              >
                🍡 Kulfi ({products.filter((p) => p.category === 'kulfi').length})
              </button>
              <button
                className={`admin-pill ${selectedSection === 'gelato' || selectedCategory === 'gelato' ? 'active' : ''}`}
                onClick={() => {
                  setSelectedSection('gelato');
                  setSelectedCategory('');
                }}
              >
                🍮 Gelato ({products.filter((p) => p.category === 'gelato').length})
              </button>
              <button
                className={`admin-pill ${selectedSection === 'premium' || selectedCategory === 'premium' ? 'active' : ''}`}
                onClick={() => {
                  setSelectedSection('premium');
                  setSelectedCategory('');
                }}
              >
                👑 Premium ({products.filter((p) => p.category === 'premium' || p.isPremium).length})
              </button>
            </div>

            {/* Toolbar Filters */}
            <div className="admin-toolbar">
              <div className="admin-search-box">
                <FiSearch style={{ color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search products by name, flavor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <select
                  style={{
                    padding: '8px 14px',
                    borderRadius: '20px',
                    border: '1px solid rgba(0,0,0,0.12)',
                    fontSize: '13.5px',
                    fontWeight: 600,
                  }}
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  <option value="">All Brands ({brands.length})</option>
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>

                <select
                  style={{
                    padding: '8px 14px',
                    borderRadius: '20px',
                    border: '1px solid rgba(0,0,0,0.12)',
                    fontSize: '13.5px',
                    fontWeight: 600,
                  }}
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedSection('all');
                  }}
                >
                  <option value="">All Categories ({categories.length})</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Product Table */}
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Price / MRP</th>
                    <th>Stock</th>
                    <th>Badges</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>
                        No products found matching search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((p) => (
                      <tr key={p.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <img
                              src={p.image}
                              alt={p.name}
                              className="tbl-thumb"
                              onError={(e) => {
                                e.target.src =
                                  'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80';
                              }}
                            />
                            <div>
                              <span className="tbl-product-name">{p.name}</span>
                              <span className="tbl-flavor">Flavor: {p.flavor || 'Vanilla'}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span style={{ fontWeight: 700, color: 'var(--primary-pink)' }}>
                            {p.brand}
                          </span>
                        </td>
                        <td style={{ textTransform: 'capitalize' }}>{p.category}</td>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 800, color: 'var(--text-dark)' }}>
                              ₹{p.price}
                            </span>
                            {Number(p.mrp) > Number(p.price) && (
                              <span
                                style={{
                                  fontSize: '11px',
                                  textDecoration: 'line-through',
                                  color: 'var(--text-muted)',
                                }}
                              >
                                ₹{p.mrp}
                              </span>
                            )}
                          </div>
                        </td>
                        <td>
                          <input
                            type="number"
                            className="tbl-stock-input"
                            value={p.stock}
                            onChange={(e) => updateProduct(p.id, { stock: Number(e.target.value) })}
                          />
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                            {p.isBestseller && (
                              <span className="tbl-badge bestseller">Bestseller</span>
                            )}
                            {p.isNew && <span className="tbl-badge new">New</span>}
                          </div>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div className="tbl-actions" style={{ justifyContent: 'flex-end' }}>
                            <button
                              className="tbl-act-btn edit"
                              onClick={() => handleOpenEdit(p)}
                              title="Edit product"
                            >
                              <FiEdit2 />
                            </button>
                            <button
                              className="tbl-act-btn delete"
                              onClick={() => setDeletingProductId(p.id)}
                              title="Delete product"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* --- COMBOS TAB --- */}
        {activeTab === 'combos' && (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Combo Offer</th>
                  <th>Tag Badge</th>
                  <th>Offer Price</th>
                  <th>Original MRP</th>
                  <th>Savings</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {combos.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>
                      No combo offers available. Click "Add New Combo" to create one.
                    </td>
                  </tr>
                ) : (
                  combos.map((cb) => {
                    const discount = Math.round(((cb.mrp - cb.price) / cb.mrp) * 100);
                    return (
                      <tr key={cb.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <img
                              src={cb.image}
                              alt={cb.name}
                              className="tbl-thumb"
                              onError={(e) => {
                                e.target.src =
                                  'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80';
                              }}
                            />
                            <div>
                              <span className="tbl-product-name">{cb.name}</span>
                              <span className="tbl-flavor">{cb.description || 'Curated Combo'}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="tbl-badge bestseller">{cb.tag || 'Special Offer'}</span>
                        </td>
                        <td>
                          <span style={{ fontWeight: 800, color: 'var(--primary-pink)' }}>
                            ₹{cb.price}
                          </span>
                        </td>
                        <td>
                          <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)' }}>
                            ₹{cb.mrp}
                          </span>
                        </td>
                        <td>
                          <span style={{ fontWeight: 800, color: '#1e8e3e' }}>
                            {discount > 0 ? `${discount}% OFF` : 'Save ₹' + (cb.mrp - cb.price)}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div className="tbl-actions" style={{ justifyContent: 'flex-end' }}>
                            <button
                              className="tbl-act-btn edit"
                              onClick={() => handleOpenEditCombo(cb)}
                              title="Edit combo"
                            >
                              <FiEdit2 />
                            </button>
                            <button
                              className="tbl-act-btn delete"
                              onClick={() => setDeletingComboId(cb.id)}
                              title="Delete combo"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* --- ORDERS TAB --- */}
        {activeTab === 'orders' && (
          <div className="admin-table-container" style={{ padding: '30px', textAlign: 'center' }}>
            <FiShoppingBag style={{ fontSize: '48px', color: 'var(--primary-pink)', marginBottom: '16px' }} />
            <h3>Mall Food Court Pickup Orders</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
              Orders placed by customers at Counter Pickup will display here with Token numbers (TK-01, TK-02).
            </p>
          </div>
        )}

        {/* --- STORE ANALYTICS TAB --- */}
        {activeTab === 'analytics' && (
          <StoreAnalytics products={products} combos={combos} />
        )}
      </div>

      {/* --- ADD / EDIT PRODUCT MODAL --- */}
      {isAddModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3>{editingProduct ? 'Edit Product' : 'Add New Ice Cream Product'}</h3>
              <button className="admin-modal-close" onClick={() => setIsAddModalOpen(false)}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="admin-form-grid">
              <div className="admin-form-group admin-form-full">
                <label>Product Full Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Amul Real Ice Cream Belgian Dark Chocolate (1 L Tub)"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Brand *</label>
                <select
                  value={formData.brandId}
                  onChange={(e) => {
                    const selected = brands.find((b) => b.id === e.target.value);
                    setFormData({
                      ...formData,
                      brandId: e.target.value,
                      brand: selected ? selected.name : e.target.value,
                    });
                  }}
                >
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="admin-form-group">
                <label>Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="admin-form-group">
                <label>Selling Price (₹) *</label>
                <input
                  type="number"
                  placeholder="230"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Original MRP (₹)</label>
                <input
                  type="number"
                  placeholder="250"
                  value={formData.mrp}
                  onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label>Stock Quantity</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label>Flavor Profile</label>
                <input
                  type="text"
                  placeholder="Chocolate, Mango, Vanilla"
                  value={formData.flavor}
                  onChange={(e) => setFormData({ ...formData, flavor: e.target.value })}
                />
              </div>

              <div className="admin-form-group admin-form-full">
                <label>Product Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
                {formData.image && (
                  <div className="img-preview-box">
                    <img
                      src={formData.image}
                      alt="Preview"
                      onError={(e) => (e.target.style.display = 'none')}
                    />
                  </div>
                )}
              </div>

              <div className="admin-form-group admin-form-full">
                <label>Description</label>
                <textarea
                  rows="3"
                  placeholder="Short description of ingredients, milk fat content..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="admin-form-full admin-checkbox-group">
                <label className="admin-checkbox-label" style={{ color: 'var(--primary-pink)', fontWeight: 800 }}>
                  <input
                    type="checkbox"
                    checked={formData.isBestseller}
                    onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
                  />
                  ⭐ Feature in "Popular Ice Creams" Section
                </label>

                <label className="admin-checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.isNew}
                    onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                  />
                  🆕 Mark as New Arrival
                </label>
              </div>

              <div className="admin-form-full" style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                <button type="button" className="admin-btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary">
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD / EDIT COMBO MODAL --- */}
      {isComboModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3>{editingCombo ? 'Edit Combo Offer' : 'Add New Combo Offer'}</h3>
              <button className="admin-modal-close" onClick={() => setIsComboModalOpen(false)}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmitComboForm} className="admin-form-grid">
              <div className="admin-form-group admin-form-full">
                <label>Combo Title *</label>
                <input
                  type="text"
                  placeholder="e.g. 2 Ice Cream Cups + Brownie"
                  value={comboFormData.name}
                  onChange={(e) => setComboFormData({ ...comboFormData, name: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Tag Badge (e.g. Best Value, Family Favourite)</label>
                <input
                  type="text"
                  placeholder="Best Value"
                  value={comboFormData.tag}
                  onChange={(e) => setComboFormData({ ...comboFormData, tag: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label>Offer Price (₹) *</label>
                <input
                  type="number"
                  placeholder="249"
                  value={comboFormData.price}
                  onChange={(e) => setComboFormData({ ...comboFormData, price: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Original MRP (₹) *</label>
                <input
                  type="number"
                  placeholder="320"
                  value={comboFormData.mrp}
                  onChange={(e) => setComboFormData({ ...comboFormData, mrp: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group admin-form-full">
                <label>Combo Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={comboFormData.image}
                  onChange={(e) => setComboFormData({ ...comboFormData, image: e.target.value })}
                />
                {comboFormData.image && (
                  <div className="img-preview-box">
                    <img
                      src={comboFormData.image}
                      alt="Preview"
                      onError={(e) => (e.target.style.display = 'none')}
                    />
                  </div>
                )}
              </div>

              <div className="admin-form-group admin-form-full">
                <label>Description / Included Items</label>
                <textarea
                  rows="3"
                  placeholder="Includes 2 Vanilla Cups, 1 Hot Fudge Brownie..."
                  value={comboFormData.description}
                  onChange={(e) => setComboFormData({ ...comboFormData, description: e.target.value })}
                />
              </div>

              <div className="admin-form-full" style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                <button type="button" className="admin-btn-secondary" onClick={() => setIsComboModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary">
                  {editingCombo ? 'Save Changes' : 'Create Combo Offer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CONFIRM DELETE PRODUCT MODAL --- */}
      {deletingProductId && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card" style={{ maxWidth: '420px', textAlign: 'center' }}>
            <FiAlertCircle style={{ fontSize: '48px', color: '#dc2626', marginBottom: '16px' }} />
            <h3>Delete Product?</h3>
            <p style={{ color: 'var(--text-muted)', margin: '10px 0 24px' }}>
              Are you sure you want to remove this item from the store? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button className="admin-btn-secondary" onClick={() => setDeletingProductId(null)}>
                Cancel
              </button>
              <button
                className="admin-btn-primary"
                style={{ background: '#dc2626' }}
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- CONFIRM DELETE COMBO MODAL --- */}
      {deletingComboId && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card" style={{ maxWidth: '420px', textAlign: 'center' }}>
            <FiAlertCircle style={{ fontSize: '48px', color: '#dc2626', marginBottom: '16px' }} />
            <h3>Delete Combo Offer?</h3>
            <p style={{ color: 'var(--text-muted)', margin: '10px 0 24px' }}>
              Are you sure you want to remove this combo offer? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button className="admin-btn-secondary" onClick={() => setDeletingComboId(null)}>
                Cancel
              </button>
              <button
                className="admin-btn-primary"
                style={{ background: '#dc2626' }}
                onClick={handleConfirmDeleteCombo}
              >
                Delete Combo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
