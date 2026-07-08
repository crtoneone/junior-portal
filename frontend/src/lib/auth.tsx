'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { api } from './api';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'CANDIDATE' | 'EMPLOYER' | 'ADMIN';
  avatarUrl?: string;
  isVerified?: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const clearAuth = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }, []);

  useEffect(() => {
    const handleSessionExpired = () => {
      clearAuth();
    };
    window.addEventListener('session-expired', handleSessionExpired);
    return () => window.removeEventListener('session-expired', handleSessionExpired);
  }, [clearAuth]);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('accessToken');
      if (!storedToken) {
        setLoading(false);
        return;
      }
      setToken(storedToken);
      try {
        const userData = await api.get<User>('/auth/profile', storedToken);
        setUser(userData);
      } catch {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/auth/refresh`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ refreshToken }),
            });
            if (res.ok) {
              const json = await res.json();
              localStorage.setItem('accessToken', json.data.accessToken);
              localStorage.setItem('refreshToken', json.data.refreshToken);
              setToken(json.data.accessToken);
              const userData = await api.get<User>('/auth/profile', json.data.accessToken);
              setUser(userData);
              return;
            }
          } catch {}
        }
        clearAuth();
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, [clearAuth]);

  const fetchUser = async (t: string) => {
    try {
      const userData = await api.get<User>('/auth/profile', t);
      setUser(userData);
    } catch {
      setUser(null);
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    const data = await api.post<{ user: User; accessToken: string; refreshToken: string }>(
      '/auth/login', { email, password }
    );
    setUser(data.user);
    setToken(data.accessToken);
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
  }, []);

  const register = useCallback(async (registerData: any) => {
    const data = await api.post<{ user: User; accessToken: string; refreshToken: string }>(
      '/auth/register', registerData
    );
    setUser(data.user);
    setToken(data.accessToken);
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout', {}, token || undefined);
    } catch {}
    clearAuth();
  }, [token, clearAuth]);

  const refreshUser = useCallback(async () => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setToken(storedToken);
      await fetchUser(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, refreshUser }}>
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
