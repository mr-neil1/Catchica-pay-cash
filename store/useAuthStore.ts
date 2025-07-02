import { create } from 'zustand';

interface User {
  id: string;
  username: string;
  balance: number;
  rank: string;
  level: number;
}

interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  updateBalance: (amount: number) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateBalance: (amount) => 
    set((state) => ({
      user: state.user ? { ...state.user, balance: state.user.balance + amount } : null
    })),
  logout: () => set({ user: null }),
}));