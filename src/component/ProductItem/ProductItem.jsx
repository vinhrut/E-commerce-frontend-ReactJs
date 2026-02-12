import {
  boxImg,
  showImage,
  showFunction,
  boxIcon,
  title,
  price,
  boxSize,
  size,
  textCenter,
  boxBtn,
  btnAdd,
  content,
  containerItem,
  isActiveSize,
  btnClear,
} from "./style.module.scss";
import heartIcon from "../../assets/icon/svgs/heartIcon.svg";
import cartIcon from "../../assets/icon/svgs/cartIcon.svg";
import reloadIcon from "../../assets/icon/svgs/reloadIcon.svg";
import cls from "classnames";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OurShopContext } from "../../contexts/OurShopProvider";
import Cookies from "js-cookie";
import { SidebarContext } from "../../contexts/SidebarProvider";
import { ToastContext } from "../../contexts/ToastProvider";
import { addToCart } from "../../apis/cartService";

function ProductItem({
  src,
  prevSrc,
  name,
  priceItem,
  details,
  isHomePage = true,
}) {
  const ourShopStore = useContext(OurShopContext);
  const [isShowGrid, setIsShowGrid] = useState(ourShopStore?.isShowGrid);
  const [sizeChoose, setSizeChoose] = useState("");
  const userId = Cookies.get("userId");
  const { setIsOpen, setType, handleGetListProductCart, listProductCart } =
    useContext(SidebarContext);
  const { toast } = useContext(ToastContext);
  const navigate = useNavigate();

  const handleViewDetail = () => {
    if (details?.id) navigate(`/product/${details.id}`);
  };

  const handleChooseSize = (size) => {
    setSizeChoose(size);
  };

  const handleClearSize = () => {
    setSizeChoose("");
  };

  const handleAddToCart = () => {
    if (!userId) {
      toast.warn("Vui lòng đăng nhập để thêm vào giỏ hàng");
    } else if (!sizeChoose) {
      toast.warn("Vui lòng chọn size trước");
    } else {
      setIsOpen(true);
      setType("cart");

      const data = {
        userId,
        productId: details.id,   // Spring Boot dùng 'id' (UUID), không phải '_id' (MongoDB)
        quantity: 1,
        size: sizeChoose,
      };

      addToCart(data)
        .then((res) => {
          toast.success("Thêm vào giỏ hàng thành công!");
          handleGetListProductCart(userId, "cart");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Thêm vào giỏ thất bại!");
        });
    }
  };

  useEffect(() => {
    if (isHomePage) {
      setIsShowGrid(true);
    } else {
      setIsShowGrid(ourShopStore?.isShowGrid);
    }
  }, [isHomePage, ourShopStore?.isShowGrid]);

  return (
    <div className={isShowGrid ? "" : containerItem}>
      <div className={boxImg} style={{ cursor: "pointer" }} onClick={handleViewDetail}>
        <img src={src} alt="" />
        <img src={prevSrc} alt="" className={showImage} />
        <div className={showFunction}>
          <div className={boxIcon}>
            <img src={heartIcon} alt="Heart Icon" />
          </div>
          <div className={boxIcon} onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}>
            <img src={cartIcon} alt="Cart Icon" />
          </div>
          <div className={boxIcon}>
            <img src={reloadIcon} alt="reload icon" />
          </div>
        </div>
      </div>

      <div className={isShowGrid ? "" : content}>
        {!isHomePage && (
          <div className={boxSize}>
            {/* Backend trả: sizes: [{ sizeName, quantity }] */}
            {(details.sizes || []).map((item, index) => (
              <span
                key={index}
                className={cls(size, {
                  [isActiveSize]: sizeChoose === item.sizeName,
                })}
                onClick={() => handleChooseSize(item.sizeName)}
              >
                {item.sizeName}
              </span>
            ))}
          </div>
        )}

        {sizeChoose && (
          <div className={btnClear} onClick={() => handleClearSize()}>
            xóa
          </div>
        )}

        <div className={cls(title, { [textCenter]: !isHomePage })} style={{ cursor: "pointer" }} onClick={handleViewDetail}>{name}</div>

        <div className={cls(price, { [textCenter]: !isHomePage })}>
          ${priceItem}
        </div>
        {!isHomePage && (
          <div className={boxBtn}>
            <button className={btnAdd} onClick={handleAddToCart}>
              Thêm vào giỏ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductItem;
