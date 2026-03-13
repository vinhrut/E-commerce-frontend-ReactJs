import style from "./style.module.scss";
import { MdOutlineShoppingCart } from "react-icons/md";
import HeaderSidebar from "../component/headerSidebar/HeaderSidebar";
import ItemProduct from "../component/itemProduct/ItemProduct";
import { useContext } from "react";
import { SidebarContext } from "../../../contexts/SidebarProvider";
import { StoreContext } from "../../../contexts/storeProvider";
import { useNavigate } from "react-router-dom";

function Cart() {
  const {
    container,
    boxContent,
    button2,
    button1,
    boxButton,
    boxPrice,
    title,
    price,
  } = style;

  const { listProductCart, setIsOpen } = useContext(SidebarContext);
  const { userId } = useContext(StoreContext);
  const navigate = useNavigate();

  const MoveToViewCart = () => navigate("/viewCart");

  // Tính tổng tiền từ các CartItemResponse
  const subtotal = listProductCart.reduce(
    (sum, item) => sum + (item.totalPrice || 0),
    0
  );

  return (
    <div className={container}>
      <div className={boxContent}>
        <div>
          <HeaderSidebar
            icon={<MdOutlineShoppingCart style={{ fontSize: "25px" }} />}
            title={"GIỎ HÀNG"}
          />
          {!userId && (
            <div style={{ color: "gray", textAlign: "center", padding: "20px" }}>
              Vui lòng đăng nhập để xem giỏ hàng
            </div>
          )}
          {userId && listProductCart.length === 0 && (
            <div style={{ color: "gray", textAlign: "center", padding: "20px" }}>
              Giỏ hàng của bạn đang trống
            </div>
          )}
          {listProductCart.map((item, index) => (
            <ItemProduct
              key={index}
              cartItemId={item.id}
              src={item.images?.[0] || ""}
              name={item.productName || ""}
              size={item.size}
              price={item.totalPrice}
              quantity={item.quantity}
            />
          ))}
        </div>
      </div>

      <div>
        <div className={boxPrice}>
          <div className={title}>TẠM TÍNH:</div>
          <div className={price}>
            {subtotal.toLocaleString("vi-VN")}đ
          </div>
        </div>

        <div className={boxButton}>
          <div className={button1}>
            <button
              onClick={() => {
                MoveToViewCart();
                setIsOpen(false);
              }}
            >
              Xem giỏ hàng
            </button>
          </div>
          <div className={button2}>
            <button>Thanh toán</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
