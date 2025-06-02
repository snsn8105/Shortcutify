import { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({ user: null, login: () => {}, logout: () => {} });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
  }, []);

  const login = useCallback((token) => {
    localStorage.setItem("token", token);
    axios
      .get("http://localhost:8080/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error("유저 정보 로딩 실패", err);
        logout();
      });
  }, [logout]); // logout도 의존성에 포함

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      login(token);
    }
  }, [login]); // ✅ 이제 경고 사라짐

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
