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
      case "Our Shop":
        navigate("/shop");
        setIsOpen(false);
        break;
      case "About us":
        navigate("/aboutUs");
        setIsOpen(false);
        break;
      case "Contacts":
        navigate("/contact");
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleShowContent = () => {
    if (content === "Sign in" && userInfo) {
      return `Hello ${userInfo.username}`;
    }
    return content;
  };

  const handleShowSubMenu = () => {
    if (content === "Sign in" && userInfo) {
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
          Sign out
        </div>
      )}
    </div>
  );
}

export default MyMenu;
