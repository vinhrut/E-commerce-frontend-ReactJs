import style from "./style.module.scss";
import { IoIosClose } from "react-icons/io";
import { deleteItemCart } from "../../../../apis/cartService";
import { useContext } from "react";
import { SidebarContext } from "../../../../contexts/SidebarProvider";
import { StoreContext } from "../../../../contexts/storeProvider";

function ItemProduct({
  src,
  name,
  size,
  quantity,
  price,
  cartItemId,
}) {
  const { container, content, priceBox, title, box_close, sizeBox } = style;
  const { handleGetListProductCart } = useContext(SidebarContext);
  const { userId } = useContext(StoreContext);

  const handleDeleteItem = async () => {
    await deleteItemCart(cartItemId);
    handleGetListProductCart(userId);
  };

  return (
    <div className={container}>
      <img src={src} alt={name} />
      <div className={box_close} onClick={handleDeleteItem}>
        <IoIosClose style={{ fontSize: "25px" }} />
      </div>
      <div className={content}>
        <div className={title}>{name}</div>
        <div className={sizeBox}>Size: {size}</div>
        <div className={priceBox}>
          {quantity} x {Number(price).toLocaleString("vi-VN")}đ
        </div>
      </div>
    </div>
  );
}

export default ItemProduct;
