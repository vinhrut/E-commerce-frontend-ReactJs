import { useEffect, useState } from "react";
import { filterOrders, updateOrderStatus } from "../../../../src/apis/adminService";
import styles from "./AdminOrders.module.css";
import { MdLocalShipping, MdCheckCircle, MdCancel, MdSearch, MdVisibility, MdClose } from "react-icons/md";

const STATUS_OPTIONS = ["PENDING", "CONFIRMED", "SHIPPING", "DELIVERED", "CANCELLED"];

const STATUS_LABELS = {
  PENDING: "Chờ xử lý",
  CONFIRMED: "Đã xác nhận",
  SHIPPING: "Đang giao",
  DELIVERED: "Đã giao",
  CANCELLED: "Đã hủy",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [filterStatus, setFilterStatus] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [detailOrder, setDetailOrder] = useState(null);

  const loadOrders = (p = 0) => {
    setLoading(true);
    const filter = filterStatus ? { status: filterStatus } : {};
    filterOrders(filter, p, 10)
      .then((res) => {
        if (res.code === 1000) {
          setOrders(res.result.content || []);
          setTotalPages(res.result.totalPages || 1);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadOrders(page); }, [page, filterStatus]);

  const handleStatusChange = async (orderId, newStatus) => {
    if (confirm(`Bạn có chắc muốn chuyển trạng thái thành: ${STATUS_LABELS[newStatus]}?`)) {
      setUpdatingId(orderId);
      try {
        await updateOrderStatus(orderId, newStatus);
        loadOrders(page);
      } catch (err) {
        alert("Cập nhật thất bại: " + (err?.response?.data?.message || err.message));
      } finally {
        setUpdatingId(null);
      }
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Quản lý Đơn hàng</h1>
          <p className={styles.subtitle}>Kiểm duyệt và cập nhật tiến trình giao hàng</p>
        </div>
      </div>

      {/* Filter */}
      <div className={styles.toolBar}>
        <div className={styles.filterGroup}>
          <div className={styles.filterLabelWrap}>
            <span className={styles.filterLabel}>Trạng thái đơn hàng:</span>
          </div>
          <div className={styles.filterTabs}>
            <button
              className={`${styles.tabBtn} ${filterStatus === "" ? styles.activeTab : ""}`}
              onClick={() => { setFilterStatus(""); setPage(0); }}
            >
              Tất cả
            </button>
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s}
                className={`${styles.tabBtn} ${filterStatus === s ? styles.activeTab : ""}`}
                onClick={() => { setFilterStatus(s); setPage(0); }}
                data-status={s}
              >
                {STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Đang tải dữ liệu...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className={styles.empty}>
            <MdSearch size={48} color="#cbd5e1" />
            <p>Không tìm thấy đơn hàng nào</p>
          </div>
        ) : (
          <div className={styles.tableResponsive}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Ngày tạo</th>
                  <th>Địa chỉ giao</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th className={styles.thRight}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.orderId}>
                    <td>
                      <span className={styles.orderIdText}>#{o.orderId?.slice(0, 8)}</span>
                    </td>
                    <td className={styles.dateCell}>
                      {o.createdAt ? new Date(o.createdAt).toLocaleDateString("vi-VN") : "—"}
                    </td>
                    <td className={styles.addressCell}>
                      {o.shippingInfo ? `${o.shippingInfo.province}, ${o.shippingInfo.district}` : "—"}
                    </td>
                    <td className={styles.amountCell}>{o.totalAmount?.toLocaleString("vi-VN")}đ</td>
                    <td>
                      <span className={styles.badge} data-status={o.status}>
                        {STATUS_LABELS[o.status] || o.status}
                      </span>
                    </td>
                    <td className={styles.tdAction}>
                      <div className={styles.actionGroup}>
                        <button 
                          className={styles.viewBtn} 
                          title="Xem chi tiết"
                          onClick={() => setDetailOrder(o)}
                        >
                          <MdVisibility size={16} /> Xem
                        </button>
                        
                        {(o.status === "PENDING" || o.status === "CONFIRMED") && (
                          <button
                            className={styles.actionBtn}
                            data-type="shipping"
                            disabled={updatingId === o.orderId}
                            onClick={() => handleStatusChange(o.orderId, "SHIPPING")}
                          >
                            <MdLocalShipping size={16} /> {updatingId === o.orderId ? "..." : "Giao hàng"}
                          </button>
                        )}

                        {o.status === "SHIPPING" && (
                          <button
                            className={styles.actionBtn}
                            data-type="delivered"
                            disabled={updatingId === o.orderId}
                            onClick={() => handleStatusChange(o.orderId, "DELIVERED")}
                          >
                            <MdCheckCircle size={16} /> {updatingId === o.orderId ? "..." : "Đã giao"}
                          </button>
                        )}

                        {(o.status === "PENDING") && (
                          <button
                            className={styles.actionBtn}
                            data-type="cancel"
                            disabled={updatingId === o.orderId}
                            onClick={() => handleStatusChange(o.orderId, "CANCELLED")}
                          >
                            <MdCancel size={16} /> Hủy
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination inside card footer */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button 
              disabled={page === 0} 
              onClick={() => setPage(p => p - 1)} 
              className={styles.pageBtn}
            >
              Trang trước
            </button>
            <span className={styles.pageInfo}>
              Trang {page + 1} / {totalPages}
            </span>
            <button 
              disabled={page >= totalPages - 1} 
              onClick={() => setPage(p => p + 1)} 
              className={styles.pageBtn}
            >
              Trang sau
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {detailOrder && (
        <div className={styles.overlay} onClick={() => setDetailOrder(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h2>Đơn hàng #{detailOrder.orderId?.slice(0, 8)}</h2>
                <span className={styles.modalDate}>
                  {detailOrder.createdAt ? new Date(detailOrder.createdAt).toLocaleString("vi-VN") : "—"}
                </span>
              </div>
              <button className={styles.closeBtn} onClick={() => setDetailOrder(null)}><MdClose size={18} /></button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.statusBanner} data-status={detailOrder.status}>
                <span>Trạng thái hiện tại:</span>
                <strong>{STATUS_LABELS[detailOrder.status] || detailOrder.status}</strong>
              </div>

              {detailOrder.shippingInfo && (
                <div className={styles.infoSection}>
                  <h3>Thông tin giao hàng</h3>
                  <div className={styles.infoContent}>
                    <p><strong>Người nhận:</strong> {detailOrder.shippingInfo.fullName || "—"} - {detailOrder.shippingInfo.phone || "—"}</p>
                    <p><strong>Địa chỉ:</strong> {detailOrder.shippingInfo.streetAddress || ""}, {detailOrder.shippingInfo.ward || ""}, {detailOrder.shippingInfo.district || ""}, {detailOrder.shippingInfo.province || "—"}</p>
                  </div>
                </div>
              )}

              <div className={styles.infoSection}>
                <h3>Sản phẩm ({detailOrder.items?.length || 0})</h3>
                <div className={styles.itemsList}>
                  {detailOrder.items?.map((item, i) => (
                    <div key={i} className={styles.itemRow}>
                      <div className={styles.itemMain}>
                        <span className={styles.itemName}>{item.productName}</span>
                        <span className={styles.itemMeta}>Size: {item.sizeName} × {item.quantity}</span>
                      </div>
                      <span className={styles.itemPrice}>{item.totalPrice?.toLocaleString("vi-VN")}đ</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.totalSection}>
                <span>Tổng cộng:</span>
                <span className={styles.totalAmount}>{detailOrder.totalAmount?.toLocaleString("vi-VN")}đ</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
