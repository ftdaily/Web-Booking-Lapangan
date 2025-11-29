import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadMe = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/auth/me');
      if (data?.user) setUser(data.user);
    } catch (err) {
      // not logged in or error
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMe();
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    if (data?.user) setUser(data.user);
    return data;
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    // only set context user if user account is active (admin approved)
    if (data?.user && data.user.is_active === 1) setUser(data.user);
    return data;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      // ignore
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refresh: loadMe }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
