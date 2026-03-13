import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyHeader from "../../../src/component/Header/Header";
import Footer from "../../../src/component/Footer/Footer";
import Layout from "../../../src/component/Layout/LayoutForm";
import { StoreContext } from "../../../src/contexts/storeProvider";
import { SidebarContext } from "../../../src/contexts/SidebarProvider";
import { ToastContext } from "../../../src/contexts/ToastProvider";
import { getCart } from "../../../src/apis/cartService";
import { getShippingInfoByUser, createShippingInfo } from "../../../src/apis/shippingInfoService";
import { createOrder } from "../../../src/apis/orderService";
import { createPaymentUrl } from "../../../src/apis/paymentService";
import style from "./style.module.scss";

function Checkout() {
    const navigate = useNavigate();
    const { userId, userInfo } = useContext(StoreContext);
    const { handleGetListProductCart } = useContext(SidebarContext);
    const { toast } = useContext(ToastContext);

    const [cartItems, setCartItems] = useState([]);
    const [shippingList, setShippingList] = useState([]);
    const [selectedShippingId, setSelectedShippingId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showAddressForm, setShowAddressForm] = useState(false);

    const [addressForm, setAddressForm] = useState({
        fullName: userInfo?.fullName || "",
        phone: userInfo?.phone || "",
        province: "",
        district: "",
        ward: "",
        streetAddress: "",
        note: "",
        isDefault: false,
    });

    useEffect(() => {
        if (!userId) {
            toast.warn("Vui lòng đăng nhập trước!");
            navigate("/");
            return;
        }
        Promise.all([
            getCart(userId),
            getShippingInfoByUser(userId),
        ]).then(([cartRes, shippingRes]) => {
            if (cartRes.code === 1000) setCartItems(cartRes.result || []);
            if (shippingRes.code === 1000) {
                const list = shippingRes.result || [];
                setShippingList(list);
                const def = list.find(s => s.isDefault) || list[0];
                if (def) setSelectedShippingId(def.id);
            }
        }).catch(() => toast.error("Lỗi tải dữ liệu!"))
            .finally(() => setIsLoading(false));
    }, [userId]);

    const subtotal = cartItems.reduce((s, i) => s + (i.totalPrice || 0), 0);

    const handleAddAddress = async (e) => {
        e.preventDefault();
        try {
            const res = await createShippingInfo(userId, addressForm);
            if (res.code === 1000) {
                const newAddr = res.result;
                setShippingList(prev => [...prev, newAddr]);
                setSelectedShippingId(newAddr.id);
                setShowAddressForm(false);
                toast.success("Đã thêm địa chỉ!");
            }
        } catch {
            toast.error("Thêm địa chỉ thất bại!");
        }
    };

    const handlePlaceOrder = async () => {
        if (cartItems.length === 0) {
            toast.warn("Giỏ hàng trống!");
            return;
        }
        if (!selectedShippingId) {
            toast.warn("Vui lòng chọn hoặc thêm địa chỉ giao hàng!");
            return;
        }
        setIsProcessing(true);
        try {
            // 1. Tạo đơn hàng — OrderResponse.orderId (không phải .id)
            const orderRes = await createOrder(userId, selectedShippingId);
            if (orderRes.code !== 1000) {
                toast.error(orderRes.message || "Tạo đơn hàng thất bại!");
                setIsProcessing(false);
                return;
            }
            const orderId = orderRes.result?.orderId; // ← OrderResponse dùng `orderId`
            if (!orderId) {
                toast.error("Không lấy được mã đơn hàng!");
                setIsProcessing(false);
                return;
            }
            handleGetListProductCart(userId); // Refresh cart count in header

            // 2. Tạo URL VNPay — PaymentController trả về PaymentResponse trực tiếp (không bọc APIResponse)
            const paymentRes = await createPaymentUrl(orderId);
            // paymentRes = { paymentUrl, txnRef, amount, message, status }
            if (paymentRes.paymentUrl) {
                toast.success("Đang chuyển đến cổng thanh toán VNPay...");
                setTimeout(() => {
                    window.location.href = paymentRes.paymentUrl;
                }, 800);
            } else {
                toast.error(paymentRes.message || "Không thể tạo URL thanh toán!");
            }
        } catch (err) {
            console.error(err);
            toast.error("Lỗi đặt hàng: " + (err?.response?.data?.message || "Thử lại sau!"));
        } finally {
            setIsProcessing(false);
        }
    };

    if (!userId) return null;

    return (
        <>
            <MyHeader />
            <Layout>
                {/* Breadcrumb */}
                <div className={style.breadcrumb}>
                    <span className={style.link} onClick={() => navigate("/viewCart")}>Giỏ hàng</span>
                    {" > "}
                    <span className={style.current}>Thanh toán</span>
                </div>

                {isLoading ? (
                    <div className={style.loading}>Đang tải...</div>
                ) : (
                    <div className={style.container}>

                        {/* LEFT: Shipping + Order summary */}
                        <div className={style.left}>
                            {/* Shipping addresses */}
                            <div className={style.card}>
                                <h2 className={style.sectionTitle}>📍 Địa chỉ giao hàng</h2>

                                {shippingList.length === 0 && !showAddressForm && (
                                    <p className={style.emptyText}>Bạn chưa có địa chỉ giao hàng.</p>
                                )}

                                {shippingList.map((addr) => (
                                    <div
                                        key={addr.id}
                                        className={`${style.addressCard} ${selectedShippingId === addr.id ? style.addressCardSelected : ""}`}
                                        onClick={() => setSelectedShippingId(addr.id)}
                                    >
                                        <div className={style.radioRow}>
                                            <input type="radio" readOnly checked={selectedShippingId === addr.id} style={{ marginRight: "10px" }} />
                                            <div>
                                                <div className={style.addrName}>{addr.fullName} — {addr.phone}</div>
                                                <div className={style.addrDetail}>
                                                    {addr.streetAddress}, {addr.ward}, {addr.district}, {addr.province}
                                                </div>
                                                {addr.note && <div className={style.addrNote}>Ghi chú: {addr.note}</div>}
                                                {addr.isDefault && <span className={style.defaultBadge}>Mặc định</span>}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <button className={style.addAddrBtn} onClick={() => setShowAddressForm(!showAddressForm)}>
                                    {showAddressForm ? "✕ Hủy" : "+ Thêm địa chỉ mới"}
                                </button>

                                {showAddressForm && (
                                    <form className={style.addrForm} onSubmit={handleAddAddress}>
                                        <div className={style.formRow}>
                                            <input required placeholder="Họ tên *" value={addressForm.fullName}
                                                onChange={e => setAddressForm(p => ({ ...p, fullName: e.target.value }))} />
                                            <input required placeholder="Số điện thoại *" value={addressForm.phone}
                                                onChange={e => setAddressForm(p => ({ ...p, phone: e.target.value }))} />
                                        </div>
                                        <div className={style.formRow}>
                                            <input required placeholder="Tỉnh/Thành phố *" value={addressForm.province}
                                                onChange={e => setAddressForm(p => ({ ...p, province: e.target.value }))} />
                                            <input required placeholder="Quận/Huyện *" value={addressForm.district}
                                                onChange={e => setAddressForm(p => ({ ...p, district: e.target.value }))} />
                                        </div>
                                        <div className={style.formRow}>
                                            <input required placeholder="Phường/Xã *" value={addressForm.ward}
                                                onChange={e => setAddressForm(p => ({ ...p, ward: e.target.value }))} />
                                            <input required placeholder="Địa chỉ cụ thể *" value={addressForm.streetAddress}
                                                onChange={e => setAddressForm(p => ({ ...p, streetAddress: e.target.value }))} />
                                        </div>
                                        <input placeholder="Ghi chú (tùy chọn)" value={addressForm.note}
                                            onChange={e => setAddressForm(p => ({ ...p, note: e.target.value }))} />
                                        <label className={style.checkboxRow}>
                                            <input type="checkbox" checked={addressForm.isDefault}
                                                onChange={e => setAddressForm(p => ({ ...p, isDefault: e.target.checked }))} />
                                            Đặt làm địa chỉ mặc định
                                        </label>
                                        <button type="submit" className={style.saveAddrBtn}>Lưu địa chỉ</button>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* RIGHT: Order summary */}
                        <div className={style.right}>
                            <div className={style.card}>
                                <h2 className={style.sectionTitle}>🛒 Đơn hàng của bạn</h2>

                                {cartItems.length === 0 ? (
                                    <p className={style.emptyText}>Giỏ hàng trống!</p>
                                ) : (
                                    cartItems.map(item => (
                                        <div key={item.id} className={style.orderItem}>
                                            <img src={item.images?.[0] || ""} alt={item.productName}
                                                className={style.orderItemImg} />
                                            <div className={style.orderItemInfo}>
                                                <div className={style.orderItemName}>{item.productName}</div>
                                                <div className={style.orderItemMeta}>Size: {item.size} · SL: {item.quantity}</div>
                                            </div>
                                            <div className={style.orderItemPrice}>
                                                {Number(item.totalPrice).toLocaleString("vi-VN")}₫
                                            </div>
                                        </div>
                                    ))
                                )}

                                <div className={style.divider} />
                                <div className={style.totalRow}>
                                    <span>Tạm tính:</span>
                                    <span>{subtotal.toLocaleString("vi-VN")}₫</span>
                                </div>
                                <div className={style.totalRow}>
                                    <span>Phí vận chuyển:</span>
                                    <span>Miễn phí</span>
                                </div>
                                <div className={`${style.totalRow} ${style.grandTotal}`}>
                                    <span>Tổng cộng:</span>
                                    <span>{subtotal.toLocaleString("vi-VN")}₫</span>
                                </div>

                                <button
                                    className={style.checkoutBtn}
                                    onClick={handlePlaceOrder}
                                    disabled={isProcessing || cartItems.length === 0}
                                >
                                    {isProcessing ? "Đang xử lý..." : "💳 ĐẶT HÀNG VÀ THANH TOÁN VNPAY"}
                                </button>
                                <p className={style.paymentNote}>Bạn sẽ được chuyển đến cổng VNPAY để thanh toán an toàn.</p>
                            </div>
                        </div>

                    </div>
                )}
            </Layout>
            <Footer />
        </>
    );
}

export default Checkout;
