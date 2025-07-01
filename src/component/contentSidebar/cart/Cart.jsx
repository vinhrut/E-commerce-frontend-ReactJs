import style from "./style.module.scss";
import { MdOutlineShoppingCart } from "react-icons/md";
import HeaderSidebar from "../component/headerSidebar/HeaderSidebar";
import ItemProduct from "../component/itemProduct/ItemProduct";
import { useContext } from "react";
import { SidebarContext } from "../../../contexts/SidebarProvider";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

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
  const navigate = useNavigate();

  const MoveToViewCart = () => navigate("/viewCart");
  const userId = Cookies.get("userId");
  // const [totalPrice, setTotalPrice] = useState(0);

  return (
    <div className={container}>
      <div className={boxContent}>
        <div>
          <HeaderSidebar
            icon={<MdOutlineShoppingCart style={{ fontSize: "25px" }} />}
            title={"CART"}
          />
          {listProductCart.map((item, index) => (
            <ItemProduct
              key={index}
              src={item.images[0]}
              name={item.name}
              size={item.size}
              price={item.price}
              SKU={item.SKU}
              quantity={item.quantity}
              productId={item.productId}
              userId={item.userId}
            />
          ))}
        </div>
      </div>

      {!userId && (
        <div style={{ color: "gray", textAlign: "center" }}>
          Please login to view cart
        </div>
      )}

      <div>
        <div className={boxPrice}>
          <div className={title}>SUBTOTAL:</div>
          <div className={price}>$price</div>
        </div>

        <div className={boxButton}>
          <div className={button1}>
            <button
              onClick={() => {
                MoveToViewCart();
                setIsOpen(false);
              }}
            >
              View cart
            </button>
          </div>
          <div className={button2}>
            <button>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
