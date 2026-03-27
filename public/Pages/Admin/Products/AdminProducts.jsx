import { useEffect, useState, useRef } from "react";
import {
  filterProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../../../src/apis/adminService";
import styles from "./AdminProducts.module.css";
import { MdAdd, MdSearch, MdEdit, MdDelete, MdClose, MdInventory, MdWarning, MdSave, MdCheckCircle } from "react-icons/md";

const EMPTY_FORM = {
  name: "", price: "", description: "", type: "", material: "",
  sizes: [{ sizeName: "", quantity: "" }],
};

const PRODUCT_TYPES = ["Áo", "Quần", "Váy", "Đầm", "Phụ kiện", "Giày dép", "Túi xách", "Khác"];

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    setImagePreviews(files.map(f => URL.createObjectURL(f)));
  };

  const loadProducts = (p = 0) => {
    setLoading(true);
    filterProducts({ name: search || undefined }, p, 10)
      .then((res) => {
        if (res.code === 1000) {
          setProducts(res.result.content || []);
          setTotalPages(res.result.totalPages || 1);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadProducts(page); }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
    loadProducts(0);
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setImageFiles([]);
    setImagePreviews([]);
    setShowModal(true);
  };

  const openEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name || "",
      price: product.price || "",
      description: product.description || "",
      type: product.type || "",
      material: product.material || "",
      sizes: product.sizes?.length ? product.sizes.map(s => ({ sizeName: s.sizeName, quantity: s.quantity })) : [{ sizeName: "", quantity: "" }],
    });
    setImageFiles([]);
    setImagePreviews(product.images || []);
    setShowModal(true);
  };

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSizeChange = (index, field, value) => {
    const newSizes = [...form.sizes];
    newSizes[index][field] = value;
    setForm({ ...form, sizes: newSizes });
  };

  const addSize = () => setForm({ ...form, sizes: [...form.sizes, { sizeName: "", quantity: "" }] });
  const removeSize = (i) => setForm({ ...form, sizes: form.sizes.filter((_, idx) => idx !== i) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("price", form.price);
      fd.append("description", form.description);
      fd.append("type", form.type);
      fd.append("material", form.material);
      fd.append("sizes", JSON.stringify(form.sizes));
      imageFiles.forEach((f) => fd.append("images", f));

      if (editingId) {
        await updateProduct(editingId, fd);
      } else {
        await createProduct(fd);
      }
      setShowModal(false);
      loadProducts(page);
    } catch (err) {
      alert("Lỗi lưu sản phẩm: " + (err?.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setConfirmDelete(null);
      loadProducts(page);
    } catch (err) {
      alert("Xóa thất bại: " + (err?.response?.data?.message || err.message));
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Quản lý Sản phẩm</h1>
          <p className={styles.subtitle}>Thêm, sửa và quản lý danh mục sản phẩm</p>
        </div>
        <button className={styles.btnPrimary} onClick={openCreate}>
          <MdAdd size={20} /> Thêm sản phẩm
        </button>
      </div>

      {/* Tool Bar */}
      <div className={styles.toolBar}>
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <div className={styles.searchWrapper}>
            <MdSearch className={styles.searchIcon} />
            <input
              className={styles.searchInput}
              placeholder="Tìm kiếm sản phẩm theo tên..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className={styles.btnSecondary} type="submit">
            <MdSearch size={16} /> Tìm
          </button>
        </form>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Đang tải dữ liệu...</p>
          </div>
        ) : products.length === 0 ? (
          <div className={styles.empty}>
            <MdInventory size={48} color="#cbd5e1" />
            <p>Không có sản phẩm nào</p>
          </div>
        ) : (
          <div className={styles.tableResponsive}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Loại</th>
                  <th>Giá</th>
                  <th>Tồn kho (Theo size)</th>
                  <th className={styles.thRight}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className={styles.productCell}>
                        {p.images?.[0] ? (
                          <img src={p.images[0]} alt={p.name} className={styles.thumb} />
                        ) : (
                          <div className={styles.noImgWrapper}>
                            <MdInventory className={styles.noImg} />
                          </div>
                        )}
                        <span className={styles.productName}>{p.name}</span>
                      </div>
                    </td>
                    <td><span className={styles.badge}>{p.type || "Khác"}</span></td>
                    <td className={styles.price}>
                      {p.price?.toLocaleString("vi-VN")}đ
                    </td>
                    <td className={styles.sizes}>
                      <div className={styles.sizesBox}>
                        {p.sizes?.map((s, idx) => (
                          <span key={idx} className={styles.sizeTag}>
                            <strong>{s.sizeName}</strong>: {s.quantity}
                          </span>
                        )) || "—"}
                      </div>
                    </td>
                    <td className={styles.tdAction}>
                      <div className={styles.actionGroup}>
                        <button className={styles.editBtn} onClick={() => openEdit(p)} title="Sửa">
                          <MdEdit size={16} /> Sửa
                        </button>
                        <button className={styles.deleteBtn} onClick={() => setConfirmDelete(p)} title="Xóa">
                          <MdDelete size={16} /> Xóa
                        </button>
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

      {/* Modal thêm/sửa */}
      {showModal && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>{editingId ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</h2>
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}><MdClose /></button>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.modalBody}>
                <div className={styles.formSection}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Tên sản phẩm *</label>
                      <input name="name" className={styles.input} value={form.name} onChange={handleFormChange} required placeholder="Nhập tên sản phẩm" />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Giá (VNĐ) *</label>
                      <input name="price" type="number" className={styles.input} value={form.price} onChange={handleFormChange} required min={0} placeholder="VD: 500000" />
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Loại sản phẩm</label>
                      <select name="type" className={styles.select} value={form.type} onChange={handleFormChange}>
                        <option value="">-- Chọn loại --</option>
                        {PRODUCT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Chất liệu</label>
                      <input name="material" className={styles.input} value={form.material} onChange={handleFormChange} placeholder="VD: Cotton 100%" />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Mô tả chi tiết</label>
                    <textarea name="description" className={styles.textarea} value={form.description} onChange={handleFormChange} rows={3} placeholder="Mô tả về sản phẩm..." />
                  </div>
                </div>

                <div className={styles.formDivider} />

                {/* Sizes */}
                <div className={styles.sizesSection}>
                  <div className={styles.sectionHeader}>
                    <h3>Kích thước & Số lượng</h3>
                    <button type="button" className={styles.addSizeBtn} onClick={addSize}>
                      <MdAdd /> Thêm phân loại
                    </button>
                  </div>
                  <div className={styles.sizesList}>
                    {form.sizes.map((s, i) => (
                      <div key={i} className={styles.sizeRow}>
                        <input placeholder="Size (Cỡ)" className={styles.input} value={s.sizeName} onChange={e => handleSizeChange(i, "sizeName", e.target.value)} />
                        <input placeholder="Số lượng" type="number" min="0" className={styles.input} value={s.quantity} onChange={e => handleSizeChange(i, "quantity", e.target.value)} />
                        {form.sizes.length > 1 && (
                          <button type="button" className={styles.removeSizeBtn} onClick={() => removeSize(i)} title="Xóa size này">
                            <MdClose />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.formDivider} />

                {/* Images */}
                <div className={styles.imageSection}>
                  <div className={styles.sectionHeader}>
                    <h3>Ảnh sản phẩm</h3>
                    {imageFiles.length > 0 && <span className={styles.fileCount}>{imageFiles.length} file mới</span>}
                  </div>
                  
                  {imagePreviews.length > 0 && (
                    <div className={styles.previewGrid}>
                      {imagePreviews.map((src, idx) => (
                        <img key={idx} src={src} alt="Preview" className={styles.previewImg} />
                      ))}
                    </div>
                  )}

                  <div className={styles.uploadArea} onClick={() => fileInputRef.current?.click()}>
                    <MdAdd size={32} color="#94a3b8" />
                    <p>{imagePreviews.length > 0 ? "Chọn ảnh khác để thay thế" : "Nhấn để tải ảnh lên"}</p>
                    <input ref={fileInputRef} type="file" multiple accept="image/*" className={styles.hiddenFile} onChange={handleImageChange} />
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" className={styles.btnSecondary} onClick={() => setShowModal(false)}>
                  <MdClose size={16} /> Hủy bỏ
                </button>
                <button type="submit" className={styles.btnPrimary} disabled={saving}>
                  {saving
                    ? <><MdSave size={16} /> Đang lưu...</>
                    : editingId
                      ? <><MdSave size={16} /> Lưu cập nhật</>
                      : <><MdCheckCircle size={16} /> Tạo sản phẩm</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete */}
      {confirmDelete && (
        <div className={styles.overlay}>
          <div className={styles.confirmBox}>
            <div className={styles.confirmIcon}>
              <MdWarning size={32} />
            </div>
            <h3>Xóa sản phẩm</h3>
            <p>Bạn có chắc muốn xóa sản phẩm <strong>"{confirmDelete.name}"</strong>? Hành động này không thể hoàn tác.</p>
            <div className={styles.confirmActions}>
              <button className={styles.btnSecondary} onClick={() => setConfirmDelete(null)}>
                <MdClose size={16} /> Hủy
              </button>
              <button className={`${styles.btnPrimary} ${styles.btnDangerBg}`} onClick={() => handleDelete(confirmDelete.id)}>
                <MdDelete size={16} /> Xóa Sản Phẩm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
