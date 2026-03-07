import { useEffect, useState } from "react";
import { createContext } from "react";
import Cookies from "js-cookie";
import { getInfo } from "../apis/authService";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [userId, setUserId] = useState(Cookies.get("userId"));

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    Cookies.remove("refreshToken");
    setUserInfo(null);
    setUserId(null);
  };

  // Lưu thông tin sau khi đăng nhập
  // authResult = { accessToken, refreshToken, roles, userResponse }
  const handleLoginSuccess = (authResult) => {
    Cookies.set("token", authResult.accessToken);
    Cookies.set("refreshToken", authResult.refreshToken);
    Cookies.set("userId", authResult.userResponse.id);
    setUserId(authResult.userResponse.id);
    setUserInfo(authResult.userResponse);
  };

  useEffect(() => {
    if (userId) {
      getInfo(userId)
        .then((res) => {
          // Backend trả: { code: 1000, message: "...", result: UserResponse }
          if (res.code === 1000) {
            setUserInfo(res.result);
          }
        })
        .catch((err) => {
          console.log("Lỗi lấy thông tin user:", err);
        });
    }
  }, [userId]);

  return (
    <StoreContext.Provider value={{ userInfo, handleLogout, setUserId, handleLoginSuccess }}>
      {children}
    </StoreContext.Provider>
  );
};
