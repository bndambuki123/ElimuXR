import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Types
type User = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  grade?: number;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: 'student' | 'teacher') => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const MOCK_USERS = [
  { id: '1', name: 'Student Demo', email: 'student@example.com', password: 'password', role: 'student', grade: 7 },
  { id: '2', name: 'Teacher Demo', email: 'teacher@example.com', password: 'password', role: 'teacher' }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check for saved user on load
  useEffect(() => {
    const savedUser = localStorage.getItem('elimuxr_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );
    
    if (foundUser) {
      // Remove password before storing
      const { password, ...userWithoutPassword } = foundUser;
      
      // Save user to state and localStorage
      setUser(userWithoutPassword as User);
      localStorage.setItem('elimuxr_user', JSON.stringify(userWithoutPassword));
      setLoading(false);
      navigate('/dashboard');
    } else {
      setLoading(false);
      throw new Error('Invalid email or password');
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string, role: 'student' | 'teacher') => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists
    if (MOCK_USERS.some(u => u.email === email)) {
      setLoading(false);
      throw new Error('User already exists');
    }
    
    // Create new user (in a real app, this would send to a backend)
    const newUser = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      role,
      grade: role === 'student' ? 7 : undefined
    };
    
    // Save user to state and localStorage
    setUser(newUser);
    localStorage.setItem('elimuxr_user', JSON.stringify(newUser));
    setLoading(false);
    navigate('/dashboard');
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('elimuxr_user');
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};