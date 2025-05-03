import create from 'zustand';

interface AppState {
  isLoggedIn: boolean;
  username: string | null;
  redirectUrl: string | null;
  setLoggedIn: (status: boolean) => void;
  setUsername: (name: string | null) => void;
  setRedirectUrl: (url: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn') || 'false'),
  username: localStorage.getItem('username'),
  redirectUrl: null,
  setLoggedIn: (status: boolean) => {
    set({ isLoggedIn: status });
    localStorage.setItem('isLoggedIn', JSON.stringify(status));  // Save login status to localStorage
  },
  setUsername: (name: string | null) => {
    set({ username: name });
    if (name) localStorage.setItem('username', name);
    else localStorage.removeItem('username');
  },
  setRedirectUrl: (url: string) => set({ redirectUrl: url }),
}));