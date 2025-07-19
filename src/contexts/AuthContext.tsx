import { createContext } from 'react';

// User interface
export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
  avatar?: string;
}

// Login data interface
export interface LoginData {
  email: string;
  password: string;
}

// Auth context type definition
export interface AuthContextType {
  // State
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  loginAction: (data: LoginData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  
  // Utility methods
  isAuthenticated: boolean;
  hasRole: (role: string) => boolean;
}

// Create the context with null as default
export const AuthContext = createContext<AuthContextType | null>(null);

// Context display name for debugging
AuthContext.displayName = 'AuthContext';
