import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts, combos as initialCombos } from '../data/products.js';

const ProductContext = createContext();

const API_BASE_URL = 'http://localhost:5000/api';

function applyImageOverrides(productList) {
  try {
    const overrides = JSON.parse(localStorage.getItem('scoop_custom_images') || '{}');
    const genericUrl = 'photo-1570197788417-0e82375c9371';
    return productList.map((p) => {
      if (overrides[p.id]) {
        if (overrides[p.id].includes(genericUrl) && p.image && !p.image.includes(genericUrl)) {
          return p;
        }
        return { ...p, image: overrides[p.id] };
      }
      return p;
    });
  } catch (e) {
    return productList;
  }
}

function repairProductList(productList) {
  if (!Array.isArray(productList)) return initialProducts;
  const seenKeys = new Set();
  const repaired = [];

  for (const p of productList) {
    if (!p || !p.name) continue;

    const nameLower = p.name.toLowerCase().trim();
    const isAmul = nameLower.startsWith('amul');

    let cat = (p.category || 'cups').toLowerCase().trim();

    // Canonical category & image match from initialProducts
    const initMatch = initialProducts.find((i) => String(i.id) === String(p.id));
    let finalImg = p.image;

    if (initMatch) {
      cat = initMatch.category.toLowerCase().trim();
      if (!finalImg || finalImg.includes('photo-1570197788417-0e82375c9371') || (initMatch.image && initMatch.image !== finalImg && !localStorage.getItem('scoop_custom_images')?.includes(finalImg))) {
        finalImg = initMatch.image;
      }
    } else if (isAmul) {
      if (cat === 'gelato' || cat === 'sundaes' || cat === 'milkshakes') {
        if (nameLower.includes('kulfi')) cat = 'kulfi';
        else if (nameLower.includes('stick')) cat = 'sticks';
        else if (nameLower.includes('tub') || nameLower.includes('1 l') || nameLower.includes('real ice cream')) cat = 'family-packs';
        else cat = 'cups';
      }
    }

    // Deduplicate duplicate Amul products that were saved with custom IDs
    const dedupeKey = isAmul ? `amul-${nameLower}` : String(p.id);
    if (seenKeys.has(dedupeKey)) {
      continue;
    }
    seenKeys.add(dedupeKey);

    const isBest = initMatch ? Boolean(initMatch.isBestseller) : Boolean(p.isBestseller);

    repaired.push({
      ...p,
      image: finalImg,
      category: cat,
      isBestseller: isBest,
      brandId: isAmul ? 'amul' : (p.brandId || (p.brand ? p.brand.toLowerCase().replace(/\s+/g, '-') : 'scoop-co')).toLowerCase().trim(),
    });
  }

  return applyImageOverrides(repaired);
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('scoop_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingIds = new Set(parsed.map((p) => p.id));
          const missing = initialProducts.filter((p) => !existingIds.has(p.id));
          const merged = missing.length > 0 ? [...parsed, ...missing] : parsed;
          return repairProductList(merged);
        }
      }
    } catch (e) {
      console.error('Failed to parse saved products from localStorage:', e);
    }
    return repairProductList(initialProducts);
  });

  const [combos, setCombos] = useState(() => {
    try {
      const saved = localStorage.getItem('scoop_combos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to parse saved combos from localStorage:', e);
    }
    return initialCombos;
  });

  const [loading, setLoading] = useState(false);
  const [isServerOnline, setIsServerOnline] = useState(false);
  const [error, setError] = useState(null);

  // Sync products state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('scoop_products', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage:', e);
    }
  }, [products]);

  // Sync combos state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('scoop_combos', JSON.stringify(combos));
    } catch (e) {
      console.error('Failed to save combos to localStorage:', e);
    }
  }, [combos]);

  // Fetch products and combos from backend API
  const fetchData = async () => {
    setLoading(true);
    try {
      const [resProd, resCombos] = await Promise.all([
        fetch(`${API_BASE_URL}/products`).catch(() => null),
        fetch(`${API_BASE_URL}/combos`).catch(() => null),
      ]);

      if (resProd && resProd.ok) {
        const data = await resProd.json();
        if (Array.isArray(data) && data.length > 0) {
          setProducts(repairProductList(data));
          setIsServerOnline(true);
        }
      }
      if (resCombos && resCombos.ok) {
        const data = await resCombos.json();
        if (Array.isArray(data) && data.length > 0) {
          setCombos(data);
        }
      }
    } catch (err) {
      console.warn('Backend API server not reachable, using local persistent state:', err.message);
      setIsServerOnline(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add Product
  const addProduct = async (newProduct) => {
    setLoading(true);
    const productToAdd = {
      ...newProduct,
      id: newProduct.id || `custom-${Date.now()}`,
      brandId: newProduct.brandId || (newProduct.brand ? newProduct.brand.toLowerCase().replace(/\s+/g, '-') : 'custom'),
      price: Number(newProduct.price),
      mrp: Number(newProduct.mrp || newProduct.price),
      stock: Number(newProduct.stock || 20),
    };

    // Always update local state immediately
    setProducts((prev) => [productToAdd, ...prev.filter((p) => p.id !== productToAdd.id)]);

    try {
      if (isServerOnline) {
        await fetch(`${API_BASE_URL}/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productToAdd),
        });
      }
      return { success: true, product: productToAdd };
    } catch (err) {
      console.error('Server sync error on addProduct (saved locally):', err);
      return { success: true, product: productToAdd };
    } finally {
      setLoading(false);
    }
  };

  // Update Product (Guaranteed Immediate Save)
  const updateProduct = async (id, updatedData) => {
    setLoading(true);

    if (updatedData.image) {
      try {
        const overrides = JSON.parse(localStorage.getItem('scoop_custom_images') || '{}');
        overrides[id] = updatedData.image;
        localStorage.setItem('scoop_custom_images', JSON.stringify(overrides));
      } catch (e) {
        console.error('Failed to save custom image override:', e);
      }
    }

    // 1. Immediately update local state and localStorage
    setProducts((prev) =>
      prev.map((p) =>
        String(p.id) === String(id)
          ? {
              ...p,
              ...updatedData,
              price: updatedData.price !== undefined ? Number(updatedData.price) : p.price,
              mrp: updatedData.mrp !== undefined ? Number(updatedData.mrp) : p.mrp,
              stock: updatedData.stock !== undefined ? Number(updatedData.stock) : p.stock,
            }
          : p
      )
    );

    // 2. Sync to backend API if server is online
    try {
      if (isServerOnline) {
        await fetch(`${API_BASE_URL}/products/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData),
        });
      }
      return { success: true };
    } catch (err) {
      console.error('Server sync error on updateProduct (saved locally):', err);
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    setLoading(true);
    setProducts((prev) => prev.filter((p) => String(p.id) !== String(id)));

    try {
      if (isServerOnline) {
        await fetch(`${API_BASE_URL}/products/${id}`, { method: 'DELETE' });
      }
      return { success: true };
    } catch (err) {
      console.error('Server sync error on deleteProduct (saved locally):', err);
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  // --- COMBOS CRUD ---
  const addCombo = async (newCombo) => {
    setLoading(true);
    const comboToAdd = {
      ...newCombo,
      id: newCombo.id || `cb-${Date.now()}`,
      price: Number(newCombo.price),
      mrp: Number(newCombo.mrp || newCombo.price),
    };

    setCombos((prev) => [comboToAdd, ...prev.filter((c) => c.id !== comboToAdd.id)]);

    try {
      if (isServerOnline) {
        await fetch(`${API_BASE_URL}/combos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(comboToAdd),
        });
      }
      return { success: true, combo: comboToAdd };
    } catch (err) {
      console.error('Server sync error on addCombo (saved locally):', err);
      return { success: true, combo: comboToAdd };
    } finally {
      setLoading(false);
    }
  };

  const updateCombo = async (id, updatedData) => {
    setLoading(true);
    setCombos((prev) =>
      prev.map((c) =>
        String(c.id) === String(id)
          ? {
              ...c,
              ...updatedData,
              price: updatedData.price !== undefined ? Number(updatedData.price) : c.price,
              mrp: updatedData.mrp !== undefined ? Number(updatedData.mrp) : c.mrp,
            }
          : c
      )
    );

    try {
      if (isServerOnline) {
        await fetch(`${API_BASE_URL}/combos/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData),
        });
      }
      return { success: true };
    } catch (err) {
      console.error('Server sync error on updateCombo (saved locally):', err);
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const deleteCombo = async (id) => {
    setLoading(true);
    setCombos((prev) => prev.filter((c) => String(c.id) !== String(id)));

    try {
      if (isServerOnline) {
        await fetch(`${API_BASE_URL}/combos/${id}`, { method: 'DELETE' });
      }
      return { success: true };
    } catch (err) {
      console.error('Server sync error on deleteCombo (saved locally):', err);
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  // Reset to default seed
  const resetDatabase = async () => {
    setLoading(true);
    try {
      if (isServerOnline) {
        await fetch(`${API_BASE_URL}/seed`, { method: 'POST' });
      }
      localStorage.removeItem('scoop_products');
      localStorage.removeItem('scoop_combos');
      setProducts(applyImageOverrides(initialProducts.map(sanitizeProduct)));
      setCombos(initialCombos);
      return { success: true };
    } catch (err) {
      console.error('Error resetting database:', err);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        combos,
        loading,
        error,
        isServerOnline,
        fetchProducts: fetchData,
        addProduct,
        updateProduct,
        deleteProduct,
        addCombo,
        updateCombo,
        deleteCombo,
        resetDatabase,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
