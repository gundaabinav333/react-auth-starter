import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import type { User, LoginData, AuthContextType } from './AuthContext';
import api from '../axios/axiosInstance'; 

interface AuthProviderProps {
  children: ReactNode;
}

interface LoginResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
  message?: string;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // State management
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  // Initialize auth state on app load
  useEffect(() => {
    initializeAuth();
  }, []);

  // Initialize authentication from localStorage
  const initializeAuth = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('userData');

      if (storedToken && storedUser) {
        // Verify token is still valid
        const isValid = await verifyToken(storedToken);
        
        if (isValid) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        } else {
          // Token expired, clear storage
          clearAuthData();
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      clearAuthData();
    } finally {
      setLoading(false);
    }
  };

  // Verify token with backend
  const verifyToken = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/verify-token', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  };

  // Login action
const loginAction = async (data: LoginData): Promise<void> => {
  setLoading(true);
  setError(null);

  try {
    const response = await api.post<LoginResponse>('/login', data);

    if (response.data.success && response.data.data) {
      const { token, user } = response.data.data;

      setUser(user);
      setToken(token);

      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(user));

      navigate('/dashboard');
    } else {
      throw new Error(response.data.message || 'Login failed');
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Login failed';
    setError(errorMessage);
    throw err;
  } finally {
    setLoading(false);
  }
};

  // Logout action
  const logout = async () => {
    setLoading(true);
    
    try {
      // Call logout API if needed
      if (token) {
        await fetch('/api/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout API error:', error);
      // Continue with logout even if API fails
    } finally {
      clearAuthData();
      navigate('/login');
      setLoading(false);
    }
  };

  // Clear authentication data
  const clearAuthData = () => {
    setUser(null);
    setToken(null);
    setError(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Utility: Check if user is authenticated
  const isAuthenticated = Boolean(user && token);

  // Utility: Check if user has specific role
  const hasRole = (role: string): boolean => {
    return user?.roles?.includes(role) ?? false;
  };

  // Context value
  const contextValue: AuthContextType = {
    // State
    user,
    token,
    loading,
    error,
    
    // Actions
    loginAction,
    logout,
    clearError,
    
    // Utilities
    isAuthenticated,
    hasRole,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
