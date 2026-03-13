import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyHeader from "../../../src/component/Header/Header";
import Footer from "../../../src/component/Footer/Footer";
import Layout from "../../../src/component/Layout/LayoutForm";
import { StoreContext } from "../../../src/contexts/storeProvider";
import { ToastContext } from "../../../src/contexts/ToastProvider";
import { getOrdersByUser } from "../../../src/apis/orderService";
import style from "./style.module.scss";

const STATUS_LABEL = {
    PENDING: { label: "Chờ xác nhận", color: "#f59e0b" },
    CONFIRMED: { label: "Đã xác nhận", color: "#3b82f6" },
    SHIPPING: { label: "Đang giao", color: "#8b5cf6" },
    DELIVERED: { label: "Đã nhận hàng", color: "#22c55e" },
    CANCELLED: { label: "Đã hủy", color: "#ef4444" },
};

function MyOrders() {
    const navigate = useNavigate();
    const { userId } = useContext(StoreContext);
    const { toast } = useContext(ToastContext);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            toast.warn("Vui lòng đăng nhập!");
            navigate("/");
            return;
        }
        getOrdersByUser(userId)
            .then((res) => {
                if (res.code === 1000) setOrders(res.result || []);
            })
            .catch(() => toast.error("Lỗi tải đơn hàng!"))
            .finally(() => setIsLoading(false));
    }, [userId]);

    return (
        <>
            <MyHeader />
            <Layout>
                <div className={style.container}>
                    <h1 className={style.pageTitle}>📋 Đơn hàng của tôi</h1>

                    {isLoading ? (
                        <div className={style.loading}>Đang tải đơn hàng...</div>
                    ) : orders.length === 0 ? (
                        <div className={style.empty}>
                            <div className={style.emptyIcon}>📦</div>
                            <p>Bạn chưa có đơn hàng nào.</p>
                            <button className={style.shopBtn} onClick={() => navigate("/shop")}>
                                Bắt đầu mua sắm
                            </button>
                        </div>
                    ) : (
                        <div className={style.orderList}>
                            {orders.map((order) => {
                                const status = STATUS_LABEL[order.status] || { label: order.status, color: "#888" };
                                const total = order.totalPrice || (order.orderItems?.reduce((s, i) => s + (i.totalPrice || 0), 0)) || 0;
                                return (
                                    <div key={order.id} className={style.orderCard}>
                                        <div className={style.orderHeader}>
                                            <div>
                                                <span className={style.orderId}>Đơn hàng #{order.id?.slice(-8)?.toUpperCase()}</span>
                                                <span className={style.orderDate}>
                                                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString("vi-VN") : ""}
                                                </span>
                                            </div>
                                            <span className={style.statusBadge} style={{ background: status.color }}>
                                                {status.label}
                                            </span>
                                        </div>

                                        <div className={style.orderItems}>
                                            {(order.orderItems || []).map((item, idx) => (
                                                <div key={idx} className={style.orderItem}>
                                                    <img src={item.images?.[0] || ""} alt={item.productName}
                                                        className={style.itemImg} />
                                                    <div className={style.itemInfo}>
                                                        <div className={style.itemName}>{item.productName}</div>
                                                        <div className={style.itemMeta}>
                                                            Size: {item.size} · SL: {item.quantity}
                                                        </div>
                                                    </div>
                                                    <div className={style.itemPrice}>
                                                        {Number(item.totalPrice || 0).toLocaleString("vi-VN")}₫
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className={style.orderFooter}>
                                            <div className={style.totalRow}>
                                                <span>Tổng tiền:</span>
                                                <span className={style.totalAmount}>{Number(total).toLocaleString("vi-VN")}₫</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </Layout>
            <Footer />
        </>
    );
}

export default MyOrders;
