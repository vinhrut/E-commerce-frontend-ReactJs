import {
  container,
  overlay,
  sidebar,
  sliceSidebar,
  boxIcon,
} from "./style.module.scss";
import { SidebarContext } from "../../contexts/SidebarProvider";
import { useContext } from "react";
import classNames from "classnames";
import { IoMdClose } from "react-icons/io";
import Login from "../contentSidebar/login/Login";
import Compare from "../contentSidebar/compare/compare";
import Cart from "../contentSidebar/cart/Cart";
import WishList from "../contentSidebar/wishlist/WishList";

function SideBar() {
  const { isOpen, setIsOpen, type } = useContext(SidebarContext);

  const handleToggle = () => setIsOpen(!isOpen);

  const renderSidebarRight = ({ type }) => {
    switch (type) {
      case "Sign in":
        return <Login />;
      case "reload":
        return <Compare />;
      case "heart":
        return <WishList />;
      case "cart":
        return <Cart />;
      default:
        return <Login />;
    }
  };
  return (
    <div className={container}>
      <div className={classNames({ [overlay]: isOpen })} />
      <div className={classNames(sidebar, { [sliceSidebar]: isOpen })}>
        <IoMdClose className={boxIcon} onClick={handleToggle} />
        {renderSidebarRight({ type })}
      </div>
    </div>
  );
}

export default SideBar;
