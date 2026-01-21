import { create } from 'zustand';
import { apiService } from '@/services/api';

interface AuthState {
  user: any | null;
  token: string | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  loadUserFromStorage: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: async ({ email, password }) => {
  try {
    const res = await apiService.login({ email, password });
    if (typeof window !== 'undefined') localStorage.setItem('token', res.token);
    set({ user: res.user, token: res.token });
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(error.response?.data?.error || 'Error al iniciar sesión');
  }
 },
  logout: () => {
    if (typeof window !== 'undefined') localStorage.removeItem('token');
    set({ user: null, token: null });
  },
  loadUserFromStorage: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        set({ token, user: { name: 'Test User' } }); // simula login persistente
      }
    }
  },
}));
