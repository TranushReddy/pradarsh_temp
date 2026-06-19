import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const getErrorMessage = (err, defaultMsg) => {
  const detail = err.response?.data?.detail;
  if (!detail) return err.message || defaultMsg;
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail)) {
    return detail.map(d => {
      const msg = d.msg || (typeof d === 'string' ? d : JSON.stringify(d));
      return msg.charAt(0).toUpperCase() + msg.slice(1);
    }).join(', ');
  }
  return typeof detail === 'string' ? detail : JSON.stringify(detail);
};

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize from LocalStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('nimbus_user');
    const storedToken = localStorage.getItem('nimbus_token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      const data = await authService.login(email, password);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('nimbus_user', JSON.stringify(data.user));
      localStorage.setItem('nimbus_token', data.token);
      return data.user;
    } catch (err) {
      const errMsg = getErrorMessage(err, 'Login failed');
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    setError(null);
    setLoading(true);
    try {
      // 1. Create the user profile in Supabase
      await authService.register(username, email, password);
      // 2. Perform login immediately using the same credentials to authenticate
      const data = await authService.login(email, password);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('nimbus_user', JSON.stringify(data.user));
      localStorage.setItem('nimbus_token', data.token);
      return data.user;
    } catch (err) {
      const errMsg = getErrorMessage(err, 'Registration failed');
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('nimbus_user');
    localStorage.removeItem('nimbus_token');
  };

  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    setError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
