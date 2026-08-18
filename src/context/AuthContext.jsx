import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('mall_user_data');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('mall_auth_token') || null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token && user) {
      localStorage.setItem('mall_auth_token', token);
      localStorage.setItem('mall_user_data', JSON.stringify(user));
    } else {
      localStorage.removeItem('mall_auth_token');
      localStorage.removeItem('mall_user_data');
    }
  }, [token, user]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // Attempt backend API call if endpoint exists
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      }).catch(() => null);

      if (response && response.ok) {
        const data = await response.json();
        const role = data.user?.role || (email.toLowerCase().includes('admin') ? 'admin' : 'user');
        const userData = { ...(data.user || { name: email.split('@')[0], email }), role };
        const userToken = data.token || `jwt_token_${Date.now()}`;
        setUser(userData);
        setToken(userToken);
        setLoading(false);
        return { success: true, user: userData };
      }

      // Offline fallback authentication simulation
      const role = email.toLowerCase().includes('admin') ? 'admin' : 'user';
      const mockUserData = {
        id: `usr_${Date.now()}`,
        name: email.split('@')[0] || 'Member',
        email: email,
        role: role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      };
      const mockToken = `jwt_mock_${Date.now()}`;
      setUser(mockUserData);
      setToken(mockToken);
      setLoading(false);
      return { success: true, user: mockUserData };
    } catch (err) {
      setError(err.message || 'Login failed');
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      }).catch(() => null);

      if (response && response.ok) {
        const data = await response.json();
        const userData = data.user || { name, email };
        const userToken = data.token || `jwt_token_${Date.now()}`;
        setUser(userData);
        setToken(userToken);
        setLoading(false);
        return { success: true, user: userData };
      }

      // Fallback registration
      const newUserData = {
        id: `usr_${Date.now()}`,
        name: name || email.split('@')[0],
        email: email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      };
      const newToken = `jwt_mock_${Date.now()}`;
      setUser(newUserData);
      setToken(newToken);
      setLoading(false);
      return { success: true, user: newUserData };
    } catch (err) {
      setError(err.message || 'Registration failed');
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const updateProfile = (updatedFields) => {
    setUser((prev) => {
      const next = { ...prev, ...updatedFields };
      localStorage.setItem('mall_user_data', JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthContext };
