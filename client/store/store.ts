import { create } from "zustand";
import Cookies from "js-cookie";
import { REFRESH_TOKEN, ACCESS_TOKEN, FASTSASSTHEME, DEFAULT_THEME } from "@/constants";
import { get_me } from "@/lib/apis/auth";

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: Cookies.get(ACCESS_TOKEN) || null,
  refreshToken: Cookies.get(REFRESH_TOKEN) || null,
  isAuthenticated: !!Cookies.get(ACCESS_TOKEN),
  user: null,
  loading: true,
  theme: 'system',
  setTheme: (theme) => set({ theme }),
  setUser: (user) => set({ user }),
  setLogin: (accessToken, refreshToken, user) => {
    Cookies.set(ACCESS_TOKEN, accessToken);
    Cookies.set(REFRESH_TOKEN, refreshToken);
    set({
      accessToken,
      user,
      refreshToken,
      isAuthenticated: true,
    });
  },
  logout: () => {
    set({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
    });
    Cookies.remove(ACCESS_TOKEN);
    Cookies.remove(REFRESH_TOKEN);
  },
  initialLoading: async () => {
    const theme =  typeof window !== "undefined" ? (localStorage.getItem(FASTSASSTHEME) as Theme) || DEFAULT_THEME : DEFAULT_THEME
    set({ theme })
    if (get().accessToken) {
      try {
        const data = await get_me()
        set({ user: data.user })
      } catch (err) {
        set({ user: null }) 
      } finally{
        set({ loading: false })
      }
    } else {
      set({ loading: false })
    }
  },

}));