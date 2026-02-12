import BoxIcon from "./BoxIcon/BoxIcon";
import { dataBoxIcon, dataMenu } from "./constants";
import MyMenu from "./Menu/Menu";
import style from "./style.module.scss";
import Logo from "../../assets/icon/images/Logo-retina.webp";
import { useContext } from "react";
import { SidebarContext } from "../../contexts/SidebarProvider";
import { StoreContext } from "../../contexts/storeProvider";
import { useNavigate } from "react-router-dom";

function MyHeader() {
  const {
    containerBoxIcon,
    containerMenu,
    containerHeader,
    containerBoxLeft,
    containerBoxRight,
    container,
  } = style;

  const { setType, setIsOpen, setContentSidebar, listProductCart } =
    useContext(SidebarContext);
  const { userInfo, handleLogout } = useContext(StoreContext);

  const navigate = useNavigate();

  const handleBackHome = () => navigate("/");

  const handleOpenLogin = () => {
    setType("Sign in");
    setIsOpen(true);
  };

  return (
    <div className={container}>
      <div className={containerHeader}>
        <div className={containerBoxLeft}>
          <div className={containerBoxIcon}>
            {dataBoxIcon.slice(0, 3).map((item, index) => (
              <BoxIcon key={index} type={item.type} href={item.href} />
            ))}
          </div>
          <div className={containerMenu}>
            {dataMenu.map((item, index) => {
              return (
                <MyMenu
                  key={index}
                  content={item.content}
                  href={item.href}
                  setIsOpen={setIsOpen}
                  setContentSidebar={setContentSidebar}
                  setType={setType}
                />
              );
            })}
          </div>
        </div>
        <div>
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "153px", height: "53px", cursor: "pointer" }}
            onClick={handleBackHome}
          />
        </div>
        <div className={containerBoxRight}>
          {/* User auth area */}
          {userInfo ? (
            <div className={style.authArea}>
              <span className={style.userName}>
                {userInfo.fullName || userInfo.email}
              </span>
              {(userInfo.role === "ADMIN" || userInfo.role === "STAFF") && (
                <span
                  onClick={() => navigate("/admin")}
                  className={style.authLinkAdmin}
                >
                  Quản trị
                </span>
              )}
              <span
                onClick={() => navigate("/my-orders")}
                className={style.authLink}
              >
                Đơn hàng
              </span>
              <span
                onClick={handleLogout}
                className={style.authLinkMuted}
              >
                Đăng xuất
              </span>
            </div>
          ) : (
            <span
              onClick={handleOpenLogin}
              className={style.authLink}
            >
              Đăng nhập
            </span>
          )}
          <div className={containerBoxIcon}>
            {dataBoxIcon.slice(3, 4).map((item, index) => (
              <BoxIcon
                key={index}
                type={item.type}
                href={item.href}
                setIsOpen={setIsOpen}
                setType={setType}
                listProductCart={listProductCart}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default MyHeader;
