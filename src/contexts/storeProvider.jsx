import { useState } from "react";
import { createContext } from "react";
import Cookies from "js-cookie";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    try {
      const saved = localStorage.getItem("userInfo");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [userId, setUserId] = useState(Cookies.get("userId") || null);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    Cookies.remove("refreshToken");
    localStorage.removeItem("userInfo");
    setUserInfo(null);
    setUserId(null);
  };

  // Lưu thông tin sau khi đăng nhập thành công
  // authResult = { accessToken, refreshToken, roles, userResponse }
  const handleLoginSuccess = (authResult) => {
    Cookies.set("token", authResult.accessToken, { expires: 1 });
    Cookies.set("refreshToken", authResult.refreshToken, { expires: 7 });
    Cookies.set("userId", authResult.userResponse.id, { expires: 1 });
    localStorage.setItem("userInfo", JSON.stringify(authResult.userResponse));
    setUserId(authResult.userResponse.id);
    setUserInfo(authResult.userResponse);
  };

  return (
    <StoreContext.Provider
      value={{ userInfo, userId, handleLogout, setUserId, handleLoginSuccess }}
    >
      {children}
    </StoreContext.Provider>
  );
};
