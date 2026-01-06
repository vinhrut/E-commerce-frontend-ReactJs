import { useEffect, useState } from "react";
import { filterInvoices, generateInvoicePdf } from "../../../../src/apis/adminService";
import styles from "./AdminInvoices.module.css";
import { MdReceipt, MdSearch, MdFilterList, MdVisibility, MdPictureAsPdf, MdDownload, MdClose, MdRefresh } from "react-icons/md";

export default function AdminInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [detailInvoice, setDetailInvoice] = useState(null);
  const [generatingId, setGeneratingId] = useState(null);

  const loadInvoices = (p = 0) => {
    setLoading(true);
    const filter = paymentStatus ? { paymentStatus } : {};
    filterInvoices(filter, p, 10)
      .then((res) => {
        if (res.code === 1000) {
          setInvoices(res.result.content || []);
          setTotalPages(res.result.totalPages || 1);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadInvoices(page); }, [page, paymentStatus]);

  const handleGeneratePdf = async (invoiceId) => {
    setGeneratingId(invoiceId);
    try {
      const res = await generateInvoicePdf(invoiceId);
      if (res.code === 1000 && res.result) {
        window.open(res.result, "_blank");
      } else {
        alert("Tạo PDF thất bại");
      }
    } catch (err) {
      alert("Lỗi: " + (err?.response?.data?.message || err.message));
    } finally {
      setGeneratingId(null);
      loadInvoices(page);
    }
  };

  const paymentStatusColor = (s) => {
    if (!s) return "#94a3b8";
    if (s === "PAID" || s.includes("PAID")) return "#10b981";
    if (s === "PENDING") return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Quản lý Hóa đơn</h1>
          <p className={styles.subtitle}>Xem, lọc và tạo PDF hóa đơn cho các đơn hàng</p>
        </div>
        <button className={styles.btnSecondary} onClick={() => loadInvoices(page)}>
          <MdRefresh size={20} /> Làm mới
        </button>
      </div>

      {/* Filter */}
      <div className={styles.toolBar}>
        <div className={styles.filterGroup}>
          <div className={styles.filterLabelWrap}>
            <MdFilterList size={20} color="#64748b" />
            <span className={styles.filterLabel}>Trạng thái thanh toán:</span>
          </div>
          <div className={styles.filterChips}>
            {["", "PAID", "PENDING", "FAILED"].map((s) => (
              <button
                key={s}
                className={`${styles.filterBtn} ${paymentStatus === s ? styles.filterActive : ""}`}
                onClick={() => { setPaymentStatus(s); setPage(0); }}
              >
                {s === "" ? "Tất cả" : s === "PAID" ? "Đã thanh toán" : s === "PENDING" ? "Chờ thanh toán" : "Thất bại"}
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
            <p>Đang tải dữ liệu hóa đơn...</p>
          </div>
        ) : invoices.length === 0 ? (
          <div className={styles.empty}>
            <MdReceipt size={48} color="#cbd5e1" />
            <p>Không tìm thấy hóa đơn nào</p>
          </div>
        ) : (
          <div className={styles.tableResponsive}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Mã hóa đơn</th>
                  <th>Khách hàng</th>
                  <th>Phương thức</th>
                  <th>Số tiền</th>
                  <th>Trạng thái</th>
                  <th>Ngày tạo</th>
                  <th align="right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id}>
                    <td>
                      <button className={styles.codeBtn} onClick={() => setDetailInvoice(inv)}>
                        #{inv.invoiceCode || inv.id?.slice(0, 8)}
                      </button>
                    </td>
                    <td>
                      <div className={styles.customerInfo}>
                        <span className={styles.customerName}>{inv.billingName || "Khách ẩn danh"}</span>
                        <span className={styles.customerEmail}>{inv.billingEmail || ""}</span>
                      </div>
                    </td>
                    <td>
                      <span className={styles.methodBadge}>{inv.paymentMethod || "—"}</span>
                    </td>
                    <td className={styles.amount}>{inv.paymentAmount?.toLocaleString("vi-VN")}đ</td>
                    <td>
                      <span className={styles.statusBadge} style={{ "--color": paymentStatusColor(inv.paymentStatus) }}>
                        {inv.paymentStatus || "—"}
                      </span>
                    </td>
                    <td className={styles.dateCell}>
                      {inv.issuedAt ? new Date(inv.issuedAt).toLocaleDateString("vi-VN") : "—"}
                    </td>
                    <td>
                      <div className={styles.actionGroup}>
                        <button className={styles.btnAction} onClick={() => setDetailInvoice(inv)} title="Xem chi tiết">
                          <MdVisibility />
                        </button>
                        <button
                          className={`${styles.btnAction} ${styles.btnPdfAction}`}
                          disabled={generatingId === inv.id}
                          onClick={() => handleGeneratePdf(inv.id)}
                          title="Tạo file PDF"
                        >
                          {generatingId === inv.id ? <div className={styles.smallSpinner} /> : <MdPictureAsPdf />}
                        </button>
                        {inv.filePath && (
                          <a href={inv.filePath} target="_blank" rel="noopener noreferrer" className={`${styles.btnAction} ${styles.btnDownloadAction}`} title="Tải file PDF">
                            <MdDownload />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */ }
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

      {/* Detail Modal */}
      {detailInvoice && (
        <div className={styles.overlay} onClick={() => setDetailInvoice(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleWrap}>
                <div className={styles.modalIcon}>
                  <MdReceipt />
                </div>
                <h2>Chi tiết hóa đơn #{detailInvoice.invoiceCode || detailInvoice.id?.slice(0, 8)}</h2>
              </div>
              <button className={styles.closeBtn} onClick={() => setDetailInvoice(null)}><MdClose /></button>
            </div>
            <div className={styles.modalBody}>
              
              <div className={styles.billCard}>
                <div className={styles.billHeader}>
                  <div className={styles.billTotal}>
                    <span className={styles.detailLabel}>Tổng thanh toán</span>
                    <span className={styles.amountLg}>{detailInvoice.paymentAmount?.toLocaleString("vi-VN")}đ</span>
                  </div>
                  <div className={styles.billStatus}>
                    <span className={styles.statusBadgeModal} style={{ "--color": paymentStatusColor(detailInvoice.paymentStatus) }}>
                      {detailInvoice.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Khách hàng</span>
                    <span className={styles.detailValue}>{detailInvoice.billingName || "—"}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Liên hệ</span>
                    <span className={styles.detailValue}>{detailInvoice.billingPhone || "—"}</span>
                    {detailInvoice.billingEmail && <span className={styles.detailSubValue}>{detailInvoice.billingEmail}</span>}
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Phương thức</span>
                    <span className={styles.methodBadge}>{detailInvoice.paymentMethod || "—"}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Ngày tạo</span>
                    <span className={styles.detailValue}>{detailInvoice.issuedAt ? new Date(detailInvoice.issuedAt).toLocaleString("vi-VN") : "—"}</span>
                  </div>
                  <div className={`${styles.detailItem} ${styles.fullWidth}`}>
                    <span className={styles.detailLabel}>Ngày thanh toán</span>
                    <span className={styles.detailValue}>{detailInvoice.paymentDate ? new Date(detailInvoice.paymentDate).toLocaleString("vi-VN") : "—"}</span>
                  </div>
                  <div className={`${styles.detailItem} ${styles.fullWidth}`}>
                    <span className={styles.detailLabel}>Địa chỉ giao hàng</span>
                    <span className={styles.detailValue}>{detailInvoice.shippingAddress || "—"}</span>
                  </div>
                </div>
              </div>

              {detailInvoice.filePath && (
                <div className={styles.pdfActionBox}>
                  <MdPictureAsPdf size={24} color="#7c3aed" />
                  <div className={styles.pdfActionText}>
                    <h4>Hóa đơn PDF đã sẵn sàng</h4>
                    <p>Bạn có thể xem hoặc tải xuống file PDF của hóa đơn này.</p>
                  </div>
                  <a href={detailInvoice.filePath} target="_blank" rel="noopener noreferrer" className={styles.btnPdfDownload}>
                    Mở hóa đơn
                  </a>
                </div>
              )}
            </div>
            
            <div className={styles.modalFooter}>
              <button className={styles.btnSecondary} onClick={() => setDetailInvoice(null)}>Đóng</button>
              <button 
                className={styles.btnPrimary}
                 disabled={generatingId === detailInvoice.id}
                 onClick={() => handleGeneratePdf(detailInvoice.id)}
              >
                  {generatingId === detailInvoice.id ? "Đang tạo PDF..." : "Tạo mới file PDF"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
