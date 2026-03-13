import { createContext, useState, useEffect, useContext } from "react";
import { getCart } from "../apis/cartService";
import { StoreContext } from "./storeProvider";

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("");
  const [contentSidebar, setContentSidebar] = useState("");
  const [listProductCart, setListProductCart] = useState([]);
  const { userId } = useContext(StoreContext);

  const handleGetListProductCart = (uid) => {
    if (uid) {
      getCart(uid)
        .then((res) => {
          // Backend: { code: 1000, message: "...", result: CartItemResponse[] }
          if (res.code === 1000) {
            setListProductCart(res.result || []);
          }
        })
        .catch((err) => {
          console.error("Lỗi lấy giỏ hàng:", err);
          setListProductCart([]);
        });
    } else {
      setListProductCart([]);
    }
  };

  // Tự động fetch cart khi userId thay đổi (login/logout)
  useEffect(() => {
    handleGetListProductCart(userId);
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
        setListProductCart,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
