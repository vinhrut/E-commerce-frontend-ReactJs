import { useContext, useState } from "react";
import styles from "../style.module.scss";
import { StoreContext } from "../../../contexts/storeProvider";
import { useNavigate } from "react-router-dom";
import { SidebarContext } from "../../../contexts/SidebarProvider";

function MyMenu({ content, setIsOpen, setType }) {
  const navigate = useNavigate();
  const { userInfo, handleLogout } = useContext(StoreContext);
  const { setListProductCart } = useContext(SidebarContext);
  const [showSubMenu, setShowSubMenu] = useState(false);

  const handleShow = () => {
    if (content === "Sign in" && userInfo) {
      return;
    }

    setIsOpen(true);
    setType(content);
    switch (content) {
      case "Trang chủ":
        navigate("/");
        setIsOpen(false);
        break;
      case "Cửa hàng":
        navigate("/shop");
        setIsOpen(false);
        break;
      case "Giới thiệu":
        navigate("/aboutUs");
        setIsOpen(false);
        break;
      case "Liên hệ":
        navigate("/contact");
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleShowContent = () => {
    if (content === "Đăng nhập" && userInfo) {
      return `Xin chào ${userInfo.username}`;
    }
    return content;
  };

  const handleShowSubMenu = () => {
    if (content === "Đăng nhập" && userInfo) {
      setShowSubMenu(true);
    }
  };

  return (
    <div
      className={styles.menu}
      onMouseEnter={handleShowSubMenu}
      onMouseLeave={() => setShowSubMenu(false)}
      onClick={handleShow}
    >
      {handleShowContent()}
      {showSubMenu && (
        <div
          className={styles.subMenu}
          onClick={(e) => {
            e.stopPropagation();
            handleLogout();
            window.location.reload();
          }}
        >
          Đăng xuất
        </div>
      )}
    </div>
  );
}

export default MyMenu;
