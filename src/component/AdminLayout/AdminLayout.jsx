import { useContext } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { StoreContext } from "../../contexts/storeProvider";
import styles from "./AdminLayout.module.css";

import {
  MdDashboard,
  MdInventory,
  MdOutlineShoppingBag,
  MdReceipt,
  MdPeople,
  MdAdminPanelSettings,
  MdLogout,
  MdArrowBack
} from "react-icons/md";

const menuItems = [
  { label: "Dashboard", path: "/admin", icon: <MdDashboard /> },
  { label: "Sản phẩm", path: "/admin/products", icon: <MdInventory /> },
  { label: "Đơn hàng", path: "/admin/orders", icon: <MdOutlineShoppingBag /> },
  { label: "Hóa đơn", path: "/admin/invoices", icon: <MdReceipt /> },
  { label: "Người dùng", path: "/admin/users", icon: <MdPeople /> },
];

export default function AdminLayout() {
  const { userInfo, handleLogout } = useContext(StoreContext);
  const navigate = useNavigate();

  // Chỉ ADMIN hoặc STAFF mới được vào
  if (!userInfo || (userInfo.role !== "ADMIN" && userInfo.role !== "STAFF")) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.wrapper}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>
            <MdAdminPanelSettings />
          </span>
          <span className={styles.logoText}>Admin Panel</span>
        </div>

        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <button
              key={item.path}
              className={`${styles.navItem} ${
                window.location.pathname === item.path ? styles.active : ""
              }`}
              onClick={() => navigate(item.path)}
            >
              <span className={styles.itemIcon}>{item.icon}</span>
              <span className={styles.itemLabel}>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <span className={styles.avatar}>
              {(userInfo.fullName || userInfo.email || "A")[0].toUpperCase()}
            </span>
            <div>
              <p className={styles.userName}>{userInfo.fullName || "Admin"}</p>
              <p className={styles.userRole}>{userInfo.role}</p>
            </div>
          </div>
          <button className={styles.logoutBtn} onClick={() => { handleLogout(); navigate("/"); }}>
            <MdLogout style={{ marginRight: "6px" }} /> Đăng xuất
          </button>
          <button className={styles.backBtn} onClick={() => navigate("/")}>
            <MdArrowBack style={{ marginRight: "6px" }} /> Về trang chủ
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
