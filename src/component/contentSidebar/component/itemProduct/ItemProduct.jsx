import { IoBody } from "react-icons/io5";
import style from "./style.module.scss";
import { IoIosClose } from "react-icons/io";
import { deleteItemCart } from "../../../../apis/cartService";
import { useContext } from "react";
import { SidebarContext } from "../../../../contexts/SidebarProvider";

function ItemProduct({
  src,
  name,
  size,
  quantity,
  price,
  SKU,
  userId,
  productId,
}) {
  const { container, content, priceBox, title, box_close, sizeBox } = style;
  const { handleGetListProductCart } = useContext(SidebarContext);
  const data = { userId, productId };

  const handleDeleteItem = async (data) => {
    deleteItemCart(data)
      .then((res) => {
        handleGetListProductCart(userId, "cart");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={container}>
      <img src={src} alt="" />
      <div className={box_close} onClick={() => handleDeleteItem(data)}>
        <IoIosClose style={{ fontSize: "25px" }} />
      </div>
      <div className={content}>
        <div className={title}>{name}</div>
        <div className={sizeBox}>Size: {size}</div>
        <div className={priceBox}>
          {quantity} x ${price}
        </div>
        <div className={price}>SKU: {SKU}</div>
      </div>
    </div>
  );
}

export default ItemProduct;
