import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

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

const trackAuthEvent = async (userId: string, eventType: 'login' | 'signup', metadata = {}) => {
  try {
    const { error } = await supabase
      .from('auth_tracking')
      .insert({
        user_id: userId,
        event_type: eventType,
        metadata,
        ip_address: window.location.hostname,
        user_agent: navigator.userAgent
      });

    if (error) {
      console.error('Error tracking auth event:', error);
      throw error;
    }
  } catch (error) {
    console.error('Failed to track auth event:', error);
    throw error;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check for saved user on load
  useEffect(() => {
    const savedUser = localStorage.getItem('elimuxr_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      trackAuthEvent(parsedUser.id, 'login', { method: 'auto' })
        .catch(error => console.error('Error tracking auto login:', error));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (profileError) throw profileError;

        const userData = {
          id: user.id,
          name: profile.full_name,
          email: user.email,
          role: profile.role,
          grade: profile.grade
        };

        setUser(userData);
        localStorage.setItem('elimuxr_user', JSON.stringify(userData));
        await trackAuthEvent(user.id, 'login', { method: 'password' });
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string, role: 'student' | 'teacher') => {
    setLoading(true);
    try {
      const { data: { user }, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role: role
          }
        }
      });

      if (error) throw error;

      if (user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            user_id: user.id,
            full_name: name,
            role: role,
            grade: role === 'student' ? 7 : null,
            phone: '' // This should be updated later with actual phone number
          });

        if (profileError) throw profileError;

        const userData = {
          id: user.id,
          name,
          email,
          role,
          grade: role === 'student' ? 7 : undefined
        };

        setUser(userData);
        localStorage.setItem('elimuxr_user', JSON.stringify(userData));
        await trackAuthEvent(user.id, 'signup', { role });
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      localStorage.removeItem('elimuxr_user');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
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
