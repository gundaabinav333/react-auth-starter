import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
  avatar?: string;
}

export interface LoginData {
  email: string;
  password: string;
}


export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  loginAction: (data: LoginData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  isAuthenticated: boolean;
  hasRole: (role: string) => boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
AuthContext.displayName = 'AuthContext';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Simulated token loading (replace with real token check)
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const loginAction = async (data: LoginData) => {
    setLoading(true);
    try {
      // 🔁 Replace with your API call
      const fakeUser: User = {
        id: '1',
        email: data.email,
        name: 'Demo User',
        roles: ['user'], // Example roles
      };
      const fakeToken = 'demo-token-123';

      // Simulate API response
      await new Promise((res) => setTimeout(res, 1000));

      // Set state
      setUser(fakeUser);
      setToken(fakeToken);
      localStorage.setItem('token', fakeToken);
      localStorage.setItem('user', JSON.stringify(fakeUser));
      setError(null);
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const clearError = () => setError(null);

  const hasRole = (role: string) => user?.roles?.includes(role) || false;

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        loginAction,
        logout,
        clearError,
        isAuthenticated,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
