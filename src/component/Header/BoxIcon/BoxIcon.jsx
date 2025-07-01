import style from "../style.module.scss";
import fbIcon from "../../../assets/icon/svgs/fbIcon.svg";
import igIcon from "../../../assets/icon/svgs/igIcon.svg";
import ytIcon from "../../../assets/icon/svgs/ytIcon.svg";
import reloadIcon from "../../../assets/icon/svgs/reloadIcon.svg";
import heartIcon from "../../../assets/icon/svgs/heartIcon.svg";
import cartIcon from "../../../assets/icon/svgs/cartIcon.svg";

function BoxIcon({ type, href, setIsOpen, setType, listProductCart }) {
  const { boxIcon, quantity } = style;

  const handleIcon = () => {
    switch (type) {
      case "fb":
        return fbIcon;
      case "ig":
        return igIcon;
      case "yt":
        return ytIcon;
      case "reload":
        return reloadIcon;
      case "heart":
        return heartIcon;
      case "cart":
        return cartIcon;
      default:
        return fbIcon;
    }
  };

  const handleShow = () => {
    setIsOpen(true);
    setType(type);
  };

  return (
    <div
      className={boxIcon}
      onClick={() => {
        handleShow();
      }}
    >
      <img src={handleIcon(type)} alt={type}></img>

      {type === "cart" && (
        <div className={quantity}>{listProductCart.length}</div>
      )}
    </div>
  );
}

export default BoxIcon;
