import { createContext, useState } from "react";
import { getCart } from "../apis/cartService";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { use } from "react";
export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("");
  const [contentSidebar, setContentSidebar] = useState("");
  const [listProductCart, setListProductCart] = useState([]);
  const userId = Cookies.get("userId");

  const handleGetListProductCart = (userId, type) => {
    if (userId && type === "cart") {
      getCart(userId).then((res) => {
        setListProductCart(res.data.data);
      });
    }
  };

  useEffect(() => {
    handleGetListProductCart(userId, "cart");
  }, [userId]);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        setIsOpen,
        type,
        setType,
        contentSidebar,
        setContentSidebar,
        handleGetListProductCart,
        listProductCart,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
