import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { CiCircleList } from "react-icons/ci";
import style from "../../OurShop/style.module.scss";
import cls from "classnames";
import { OurShopContext } from "../../../../src/contexts/OurShopProvider";
import { useContext } from "react";

function Filter() {
  const { containerFilter, boxIcon, boxLeft, boxRight, show, sort, selectBox } =
    style;

  const { sortOptions, showOptions, setShowId, setSortId, setIsShowGrid } =
    useContext(OurShopContext);

  const handleSortChange = (e) => {
    setSortId(e.target.value);
  };

  const handleShowChange = (e) => {
    setShowId(e.target.value);
  };

  return (
    <div className={containerFilter}>
      <div className={boxLeft}>
        <select
          name=""
          id=""
          className={cls(selectBox, sort)}
          onChange={handleSortChange}
          style={{ height: "30px" }}
        >
          {sortOptions.map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            );
          })}
        </select>
        <div className={boxIcon}>
          <TfiLayoutGrid4Alt
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={() => setIsShowGrid(true)}
          />
          <div
            style={{
              width: "1px",
              height: "20px",
              background: "gray",
              cursor: "pointer",
            }}
          />
          <CiCircleList
            style={{ fontSize: "22px", cursor: "pointer" }}
            onClick={() => setIsShowGrid(false)}
          />
        </div>
      </div>
      <div className={boxRight}>
        <div>Show</div>
        <select
          name=""
          id=""
          className={cls(selectBox)}
          onChange={handleShowChange}
          style={{ height: "30px" }}
        >
          {showOptions.map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default Filter;
