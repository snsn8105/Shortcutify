// src/contexts/AuthContext.js
import { createContext, useState } from "react";

// 1) Context 생성
export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  // 2) user 상태 관리 (null이면 비로그인)
  const [user, setUser] = useState(null);

  // 3) 로그인 함수: 실제로는 API 호출 후 setUser
  const login = (userInfo) => {
    setUser(userInfo);
  };

  // 4) 로그아웃 함수
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
