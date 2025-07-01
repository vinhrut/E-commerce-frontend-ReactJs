import BoxIcon from "./BoxIcon/BoxIcon";
import { dataBoxIcon, dataMenu } from "./constants";
import MyMenu from "./Menu/Menu";
import style from "./style.module.scss";
import Logo from "../../assets/icon/images/Logo-retina.webp";
import { useContext } from "react";
import { SidebarContext } from "../../contexts/SidebarProvider";
import { useNavigate } from "react-router-dom";

function MyHeader() {
  const {
    containerBoxIcon,
    containerMenu,
    containerHeader,
    containerBox,
    container,
  } = style;

  const { setType, setIsOpen, setContentSidebar, listProductCart } =
    useContext(SidebarContext);

  const navigate = useNavigate();

  const handleBackHome = () => navigate("/");

  return (
    <div className={container}>
      <div className={containerHeader}>
        <div className={containerBox}>
          <div className={containerBoxIcon}>
            {dataBoxIcon.slice(0, 3).map((item, index) => (
              <BoxIcon key={index} type={item.type} href={item.href} />
            ))}
          </div>
          <div className={containerMenu}>
            {dataMenu.slice(0, 3).map((item, index) => {
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
        <div className={containerBox}>
          <div className={containerMenu}>
            {dataMenu.slice(3, 6).map((item, index) => {
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
          <div className={containerBoxIcon}>
            {dataBoxIcon.slice(3, 6).map((item, index) => (
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
