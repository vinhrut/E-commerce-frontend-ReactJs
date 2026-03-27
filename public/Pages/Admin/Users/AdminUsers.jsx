import { useEffect, useState } from "react";
import { getAllUsersPaged, lockUser, unlockUser } from "../../../../src/apis/adminService";
import styles from "./AdminUsers.module.css";
import { MdPeople, MdLock, MdLockOpen, MdRefresh, MdShield } from "react-icons/md";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [actionId, setActionId] = useState(null);

  const loadUsers = (p = 0) => {
    setLoading(true);
    getAllUsersPaged(p, 10)
      .then((res) => {
        if (res.code === 1000) {
          setUsers(res.result.content || []);
          setTotalPages(res.result.totalPages || 1);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadUsers(page); }, [page]);

  const handleLock = async (user) => {
    setActionId(user.id);
    try {
      if (user.lockUser) {
        await unlockUser(user.id);
      } else {
        await lockUser(user.id);
      }
      loadUsers(page);
    } catch (err) {
      alert("Thao tác thất bại: " + (err?.response?.data?.message || err.message));
    } finally {
      setActionId(null);
    }
  };

  const getRoleBadge = (role, isLocked) => {
    if (isLocked) return { label: "BỊ KHÓA", color: "#94a3b8", bg: "#f1f5f9" };
    
    const map = {
      ADMIN: { label: "QUẢN TRỊ VIÊN", color: "#ef4444", bg: "#fef2f2" },
      STAFF: { label: "NHÂN VIÊN", color: "#f59e0b", bg: "#fffbeb" },
      USER: { label: "NGƯỜI DÙNG", color: "#10b981", bg: "#ecfdf5" },
    };
    return map[role] || { label: role, color: "#64748b", bg: "#f1f5f9" };
  };

  const stringToHslColor = (str, s, l) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    return `hsl(${h}, ${s}%, ${l}%)`;
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Quản lý Người dùng</h1>
          <p className={styles.subtitle}>Xem danh sách thành viên và phân quyền hệ thống</p>
        </div>
        <button className={styles.btnSecondary} onClick={() => loadUsers(page)}>
          <MdRefresh size={20} /> Làm mới thành viên
        </button>
      </div>

      <div className={styles.toolBar}>
        <div className={styles.filterGroup}>
          <div className={styles.filterLabelWrap}>
            <MdPeople size={20} color="#64748b" />
            <span className={styles.filterLabel}>Lọc & Tìm kiếm:</span>
          </div>
          <div className={styles.filterChips}>
             <button className={styles.filterBtnActive}>Tất cả người dùng</button>
             {/* Future search/filter can be added here */}
          </div>
        </div>
      </div>

      <div className={styles.tableCard}>
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Đang tải dữ liệu người dùng...</p>
          </div>
        ) : users.length === 0 ? (
           <div className={styles.empty}>
             <MdPeople size={48} color="#cbd5e1" />
             <p>Không có người dùng nào</p>
           </div>
        ) : (
          <div className={styles.tableResponsive}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Tài khoản</th>
                  <th>Liên hệ</th>
                  <th>Đăng ký</th>
                  <th>Truy cập</th>
                  <th align="right">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  const isLocked = u.lockUser;
                  const badge = getRoleBadge(u.role, isLocked);
                  const initial = (u.fullName || u.email || "U")[0].toUpperCase();
                  const avatarColor = stringToHslColor(u.id || "default", 60, 60);

                  return (
                    <tr key={u.id} className={isLocked ? styles.rowLocked : ""}>
                      <td>
                        <div className={styles.userCell}>
                          <div className={styles.avatar} style={{ background: avatarColor }}>
                            {initial}
                          </div>
                          <div className={styles.userInfo}>
                            <span className={styles.userName}>{u.fullName || "Chưa cập nhật"}</span>
                            <span className={styles.roleTag} style={{ color: badge.color, backgroundColor: badge.bg }}>
                              {u.role === "ADMIN" && <MdShield size={12} />}
                              {badge.label}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className={styles.contactInfo}>
                          <span className={styles.email}>{u.email || "—"}</span>
                          <span className={styles.phone}>{u.phone || "Chưa có SĐT"}</span>
                        </div>
                      </td>
                      <td className={styles.dateCell}>
                         {/* Optional tracking field if available in backend, otherwise placeholder */}
                         <div className={styles.dateInfo}>
                           <span className={styles.dateMain}>{"Gần đây"}</span>
                         </div>
                      </td>
                      <td className={styles.accessCell}>
                        {u.role === "ADMIN" ? (
                           <span className={styles.badgeSuccess}>Cho phép</span>
                        ) : isLocked ? (
                           <span className={styles.badgeDanger}>Bị chặn</span>
                        ) : (
                           <span className={styles.badgeNormal}>Bình thường</span>
                        )}
                      </td>
                      <td>
                        <div className={styles.actionGroup}>
                          {u.role !== "ADMIN" ? (
                            <button
                              className={`${styles.btnAction} ${isLocked ? styles.btnUnlock : styles.btnLock}`}
                              disabled={actionId === u.id}
                              onClick={() => handleLock(u)}
                              title={isLocked ? "Mở khóa tài khoản" : "Khóa tài khoản hệ thống"}
                            >
                              {actionId === u.id ? <div className={styles.smallSpinner} /> : isLocked ? <MdLockOpen size={18} /> : <MdLock size={18} />}
                              <span>{isLocked ? "Mở khóa" : "Khóa"}</span>
                            </button>
                          ) : (
                            <span className={styles.adminNote}>ROOT</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button disabled={page === 0} onClick={() => setPage(p => p - 1)} className={styles.pageBtn}>
              Trang trước
            </button>
            <span className={styles.pageInfo}>Trang {page + 1} / {totalPages}</span>
            <button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)} className={styles.pageBtn}>
              Trang sau
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
