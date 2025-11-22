import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, setAuthToken, getAuthToken } from './api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from token
  useEffect(() => {
    const initAuth = async () => {
      const token = getAuthToken();
      if (token) {
        try {
          const response = await api.get('/auth/me');
          setUser(response.data?.user || response.user);
        } catch (err) {
          console.error('Failed to fetch user:', err);
          setAuthToken(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      
      // Guest login - no backend required
      if (email === 'guest@example.com' && password === 'guest123') {
        const guestUser = {
          id: 'guest-001',
          name: 'Guest User',
          email: 'guest@example.com',
          role: 'warehouse_staff',
        };
        const token = 'guest-token-' + Date.now();
        setAuthToken(token);
        setUser(guestUser);
        return { user: guestUser, token };
      }
      
      // Demo manager login
      if (email === 'manager@example.com' && password === 'manager123') {
        const managerUser = {
          id: 'manager-001',
          name: 'John Manager',
          email: 'manager@example.com',
          role: 'inventory_manager',
        };
        const token = 'manager-token-' + Date.now();
        setAuthToken(token);
        setUser(managerUser);
        return { user: managerUser, token };
      }
      
      // Demo admin login
      if (email === 'admin@example.com' && password === 'admin123') {
        const adminUser = {
          id: 'admin-001',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'stock_master',
        };
        const token = 'admin-token-' + Date.now();
        setAuthToken(token);
        setUser(adminUser);
        return { user: adminUser, token };
      }
      
      // Try backend API
      const response = await api.post('/auth/login', { email, password });
      const token = response.data?.token || response.token;
      setAuthToken(token);
      setUser(response.data?.user || response.user);
      return response;
    } catch (err) {
      setError(err.payload?.error?.message || 'Login failed');
      throw err;
    }
  };

  const signup = async (name, email, password, role = 'warehouse_staff') => {
    try {
      setError(null);
      const response = await api.post('/auth/signup', { name, email, password, role });
      const token = response.data?.token || response.token;
      setAuthToken(token);
      setUser(response.data?.user || response.user);
      return response;
    } catch (err) {
      setError(err.payload?.error?.message || 'Signup failed');
      throw err;
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout', {});
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setAuthToken(null);
      setUser(null);
    }
  };

  const requestOTP = async (email) => {
    try {
      setError(null);
      const response = await api.post('/auth/request-otp', { email });
      return response;
    } catch (err) {
      setError(err.payload?.error?.message || 'OTP request failed');
      throw err;
    }
  };

  const verifyOTP = async (email, otp, newPassword) => {
    try {
      setError(null);
      const response = await api.post('/auth/verify-otp', { email, otp, newPassword });
      const token = response.data?.token || response.token;
      setAuthToken(token);
      setUser(response.data?.user || response.user);
      return response;
    } catch (err) {
      setError(err.payload?.error?.message || 'OTP verification failed');
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    requestOTP,
    verifyOTP,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
