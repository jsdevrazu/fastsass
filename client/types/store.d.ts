type Theme = "dark" | "light" | "system"

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    setLogin: (accessToken: string, refreshToken: string, user: User) => void;
    setUser: (user: User) => void;
    logout: () => void;
    user: User | null;
    loading: boolean
    initialLoading: () => void,
    theme:Theme,
    setTheme: (theme: Theme) => void
  }