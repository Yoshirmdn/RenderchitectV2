import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authService } from "../services/auth.service";
import { Loader } from "../components/ui/Loader";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user dari localStorage saat mount
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("archvault_token");
      if (!token) { setLoading(false); return; }

      try {
        const res = await authService.getMe();
        setUser(res.data);
      } catch {
        authService.logout();
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await authService.login({ email, password });
    const { user, accessToken, refreshToken } = res.data;

    localStorage.setItem("archvault_token",   accessToken);
    localStorage.setItem("archvault_refresh",  refreshToken);
    localStorage.setItem("archvault_user",     JSON.stringify(user));
    setUser(user);
    return user;
  }, []);

  const register = useCallback(async (data) => {
    const res = await authService.register(data);
    return res;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const updateUser = useCallback((updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  }, []);

  if (loading) return <Loader fullScreen />;

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};