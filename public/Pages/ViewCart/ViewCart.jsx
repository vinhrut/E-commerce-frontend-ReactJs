import { useContext, useEffect, useState } from "react";
import Footer from "../../../src/component/Footer/Footer";
import MyHeader from "../../../src/component/Header/Header";
import Layout from "../../../src/component/Layout/LayoutForm";
import CountViewCart from "./countViewCart";
import { FaTrashAlt } from "react-icons/fa";
import { FaCcPaypal, FaCcMastercard, FaCcVisa } from "react-icons/fa6";
import { FaBitcoin } from "react-icons/fa";
import { SiAmericanexpress } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../../src/contexts/storeProvider";
import { SidebarContext } from "../../../src/contexts/SidebarProvider";
import { ToastContext } from "../../../src/contexts/ToastProvider";
import { getCart, deleteItemCart, clearCart } from "../../../src/apis/cartService";
import {
  stepBox, stepLeft, stepMiddle, number, numberHighlight,
  formRight, formContainer, formLeft, formField, formFieldRight,
  formRightHigh, formRightLow, headline, btnProceed, btnContinue,
} from "./style.module.scss";
import style from "./style.module.scss";

function ViewCart() {
  const navigate = useNavigate();
  const { userId } = useContext(StoreContext);
  const { handleGetListProductCart } = useContext(SidebarContext);
  const { toast } = useContext(ToastContext);

  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCart = () => {
    if (!userId) return;
    setIsLoading(true);
    getCart(userId)
      .then((res) => {
        if (res.code === 1000) {
          setCartItems(res.result || []);
        }
      })
      .catch(() => toast.error("Lỗi tải giỏ hàng!"))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => { fetchCart(); }, [userId]);

  const handleDeleteItem = async (cartItemId) => {
    try {
      await deleteItemCart(cartItemId);
      toast.success("Đã xóa sản phẩm!");
      fetchCart();
      handleGetListProductCart(userId);
    } catch {
      toast.error("Xóa thất bại!");
    }
  };

  const handleClearCart = async () => {
    if (!cartItems.length) return;
    // cartItems[0].cartId from CartItemResponse — need cartId
    // Backend: DELETE /api/cart-items/cart/{cartId}
    const cartId = cartItems[0]?.cartId;
    if (!cartId) {
      toast.error("Không tìm thấy giỏ hàng!");
      return;
    }
    try {
      await clearCart(cartId);
      toast.success("Đã xóa toàn bộ giỏ hàng!");
      setCartItems([]);
      handleGetListProductCart(userId);
    } catch {
      toast.error("Xóa giỏ hàng thất bại!");
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0);

  return (
    <>
      <MyHeader />
      <Layout>
        {/* Step indicator */}
        <div className={stepBox}>
          <div className={stepLeft}>
            <div className={numberHighlight}>1</div>
            <div>SHOPPING CART</div>
            <div>- - - - - - - - -</div>
          </div>
          <div className={stepMiddle}>
            <div className={number}>2</div>
            <div>THANH TOÁN</div>
            <div>- - - - - - - - -</div>
          </div>
          <div className={stepLeft}>
            <div className={number}>3</div>
            <div>TRẠNG THÁI ĐƠN</div>
          </div>
        </div>

        {/* Countdown */}
        <div style={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
          <div>Mau thôi, sản phẩm có hạn! Hãy thanh toán trong vòng</div>
          <CountViewCart minutes={10} fontSize={20} fontWeight={600} />
        </div>

        {/* Content */}
        {!userId ? (
          <div style={{ textAlign: "center", padding: "60px", color: "#888", fontSize: "16px" }}>
            Vui lòng <span style={{ cursor: "pointer", textDecoration: "underline", color: "#000" }} onClick={() => { }}>đăng nhập</span> để xem giỏ hàng
          </div>
        ) : isLoading ? (
          <div style={{ textAlign: "center", padding: "60px", color: "#888" }}>Đang tải giỏ hàng...</div>
        ) : (
          <div className={formContainer}>
            {/* Left: cart items */}
            <div className={formLeft} style={{ height: "auto" }}>
              {/* Header row */}
              <div className={formField}>
                <div>SẢN PHẨM</div>
                <div className={formFieldRight}>
                  <div>ĐƠN GIÁ</div>
                  <div>SIZE</div>
                  <div>SỐ LƯỢNG</div>
                  <div>THÀNH TIỀN</div>
                  <div></div>
                </div>
              </div>
              <div className={headline} />

              {cartItems.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px", color: "#888" }}>
                  Giỏ hàng trống. <span style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => navigate("/shop")}>Tiếp tục mua sắm</span>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #eee" }}>
                    {/* Product info */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
                      <img src={item.images?.[0] || ""} alt={item.productName} style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "6px", background: "#f3f3f3" }} />
                      <span style={{ fontSize: "14px", fontWeight: "500" }}>{item.productName}</span>
                    </div>
                    {/* Right values */}
                    <div className={formFieldRight} style={{ flexShrink: 0 }}>
                      <div style={{ fontSize: "13px" }}>{Number(item.totalPrice / item.quantity).toLocaleString("vi-VN")}₫</div>
                      <div style={{ fontSize: "13px" }}>{item.size}</div>
                      <div style={{ fontSize: "13px" }}>{item.quantity}</div>
                      <div style={{ fontSize: "13px", fontWeight: "600" }}>{Number(item.totalPrice).toLocaleString("vi-VN")}₫</div>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#e44", fontSize: "16px" }}
                        title="Xóa sản phẩm"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                ))
              )}

              <div className={headline} style={{ marginTop: "16px" }} />

              {/* Actions */}
              <div style={{ display: "flex", gap: "10px", justifyContent: "space-between", marginTop: "20px" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <input type="text" placeholder="Mã giảm giá" style={{ height: "25px", padding: "5px", border: "1px solid #ccc", borderRadius: "4px" }} />
                  <div style={{ padding: "5px 12px", backgroundColor: "black", color: "white", fontSize: "14px", borderRadius: "3px", cursor: "pointer" }}>
                    ÁP DỤNG
                  </div>
                </div>
                <div
                  style={{ border: "1px solid black", padding: "5px 12px", borderRadius: "3px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}
                  onClick={handleClearCart}
                >
                  <FaTrashAlt /> XÓA GIỎ HÀNG
                </div>
              </div>
            </div>

            {/* Right: totals */}
            <div className={formRight}>
              <div className={formRightHigh}>
                <span style={{ fontSize: "20px", fontWeight: "600" }}>TỔNG GIỎ HÀNG</span>
                <div className={headline} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
                  <div>Tạm tính</div>
                  <div>{subtotal.toLocaleString("vi-VN")}₫</div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px", fontSize: "20px", fontWeight: "600" }}>
                  <div>Tổng cộng</div>
                  <div>{subtotal.toLocaleString("vi-VN")}₫</div>
                </div>
                <div className={btnProceed} onClick={() => cartItems.length > 0 && navigate("/checkout")}>
                  ĐẶT HÀNG
                </div>
                <div className={btnContinue} onClick={() => navigate("/shop")}>
                  TIẾP TỤC MUA SẮM
                </div>
              </div>
              <div style={{ marginTop: "20px", textAlign: "center", fontWeight: "600" }}>
                Thanh toán an toàn được đảm bảo
              </div>
              <div className={formRightLow}>
                <FaCcPaypal style={{ fontSize: "50px", marginRight: "10px" }} />
                <FaCcMastercard style={{ fontSize: "50px", marginRight: "10px" }} />
                <FaCcVisa style={{ fontSize: "50px", marginRight: "10px" }} />
                <FaBitcoin style={{ fontSize: "50px", marginRight: "10px" }} />
                <SiAmericanexpress style={{ fontSize: "45px", marginRight: "10px" }} />
              </div>
            </div>
          </div>
        )}
      </Layout>
      <Footer />
    </>
  );
}

export default ViewCart;
