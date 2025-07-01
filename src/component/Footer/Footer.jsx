import { container, menu, menu_content } from "./style.module.scss";
import Logo from "../../assets/icon/images/marseille-logo-footer.webp";
import { dataMenu } from "./constants";
import imageFooter from "../../assets/icon/images/card_footer.webp";

function Footer() {
  return (
    <div className={container}>
      <div>
        <img src={Logo} alt="Logo" style={{ width: "153px", height: "53px" }} />
      </div>
      <div className={menu}>
        {dataMenu.map((item, index) => {
          return (
            <div key={index} className={menu_content}>
              {item.content}
            </div>
          );
        })}
      </div>
      <div>
        <p>Guaranteed safe checkout</p>
        <img
          src={imageFooter}
          alt=""
          style={{ width: "270px", height: "30px" }}
        />
      </div>
      <div>
        © 27-5-2025 React Hook learning. Copy by –
        VinhRut/nguyenxuanvinh2004@gmail.com.
      </div>
    </div>
  );
}

export default Footer;
