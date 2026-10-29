import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('med_finder_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('med_finder_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('med_finder_user');
    }
  }, [user]);

  const login = async (username, password) => {
    setLoading(true);
    setAuthError(null);
    try {
      const response = await api.login({ username, password });
      if (response && response.success) {
        setUser(response);
        return { success: true };
      } else {
        setAuthError(response.message || 'Login failed');
        return { success: false, message: response.message };
      }
    } catch (err) {
      setAuthError(err.message || 'Failed to connect to authentication server');
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setAuthError(null);
    try {
      const response = await api.register(userData);
      if (response && response.success) {
        setUser(response);
        return { success: true };
      } else {
        setAuthError(response.message || 'Registration failed');
        return { success: false, message: response.message };
      }
    } catch (err) {
      setAuthError(err.message || 'Failed to connect to server');
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('med_finder_user');
  };

  const isPharmacyOwner = user?.role === 'PHARMACY_OWNER';
  const isCustomer = user?.role === 'CUSTOMER';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isPharmacyOwner,
        isCustomer,
        loading,
        authError,
        setAuthError,
        login,
        register,
        logout,
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
