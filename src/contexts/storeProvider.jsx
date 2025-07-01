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
  };

  useEffect(() => {
    if (userId) {
      getInfo(userId)
        .then((res) => {
          setUserInfo(res.data.data);
        })
        .catch((err) => {
          console.log("day la err: ", err);
        });
    }
  }, [userId]);

  return (
    <StoreContext.Provider value={{ userInfo, handleLogout, setUserId }}>
      {children}
    </StoreContext.Provider>
  );
};
