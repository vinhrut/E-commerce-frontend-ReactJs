import style from "./style.module.scss";
import HeaderSidebar from "../component/headerSidebar/HeaderSidebar";
import { TfiReload } from "react-icons/tfi";
import ItemProduct from "../component/itemProduct/ItemProduct";

function Compare() {
  const { container, boxContent } = style;

  return (
    <div className={container}>
      <div className={boxContent}>
        <div>
          <HeaderSidebar
            icon={<TfiReload style={{ fontSize: "25px" }} />}
            title={"COMPARE"}
          />
        </div>
        <div>
          <ItemProduct />
        </div>
      </div>

      <div>
        <button>View compare</button>
      </div>
    </div>
  );
}

export default Compare;
