import { useEffect, useState } from "react";
import { getDashboardSummary } from "../../../../src/apis/adminService";
import styles from "./AdminDashboard.module.css";

const STAT_CARDS = [
  { key: "totalOrders", label: "Tổng đơn hàng", icon: "🛒", color: "#6366f1" },
  { key: "totalRevenue", label: "Doanh thu (VNĐ)", icon: "💰", color: "#10b981", format: "currency" },
  { key: "totalProducts", label: "Sản phẩm", icon: "📦", color: "#f59e0b" },
  { key: "totalSoldItems", label: "Sản phẩm đã bán", icon: "🏷️", color: "#ef4444" },
];

function formatCurrency(value) {
  return new Intl.NumberFormat("vi-VN").format(value) + "đ";
}

export default function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDashboardSummary()
      .then((res) => {
        if (res.code === 1000) setSummary(res.result);
        else setError("Không lấy được dữ liệu dashboard");
      })
      .catch(() => setError("Lỗi kết nối server"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>📊 Dashboard</h1>
        <p className={styles.subtitle}>Tổng quan hoạt động của cửa hàng</p>
      </div>

      {loading && <div className={styles.loading}>Đang tải dữ liệu...</div>}
      {error && <div className={styles.error}>{error}</div>}

      {summary && (
        <div className={styles.cards}>
          {STAT_CARDS.map((card) => (
            <div
              key={card.key}
              className={styles.card}
              style={{ "--accent": card.color }}
            >
              <div className={styles.cardIcon}>{card.icon}</div>
              <div className={styles.cardBody}>
                <p className={styles.cardLabel}>{card.label}</p>
                <p className={styles.cardValue}>
                  {card.format === "currency"
                    ? formatCurrency(summary[card.key])
                    : summary[card.key]?.toLocaleString("vi-VN")}
                </p>
              </div>
              <div className={styles.cardAccent} />
            </div>
          ))}
        </div>
      )}

      <div className={styles.infoBox}>
        <p>💡 Sử dụng menu bên trái để quản lý sản phẩm, đơn hàng, hóa đơn và người dùng.</p>
      </div>
    </div>
  );
}
