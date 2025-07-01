import style from "./style.module.scss";
import { FaRegHeart } from "react-icons/fa";
import HeaderSidebar from "../component/headerSidebar/HeaderSidebar";
import ItemProduct from "../component/itemProduct/ItemProduct";

function WishList() {
  const { container, boxContent, boxButton, button1, button2 } = style;
  return (
    <div className={container}>
      <div className={boxContent}>
        <div>
          <HeaderSidebar
            icon={<FaRegHeart style={{ fontSize: "25px" }} />}
            title={"WISH LIST"}
          />
        </div>
        <div>
          <ItemProduct />
        </div>
      </div>
      <div className={boxButton}>
        <div className={button1}>
          <button>View wish list</button>
        </div>
        <div className={button2}>
          <button>Add all to cart</button>
        </div>
      </div>
    </div>
  );
}

export default WishList;
