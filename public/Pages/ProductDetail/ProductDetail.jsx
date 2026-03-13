import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MyHeader from "../../../src/component/Header/Header";
import Footer from "../../../src/component/Footer/Footer";
import Layout from "../../../src/component/Layout/LayoutForm";
import { getProductById } from "../../../src/apis/productsService";
import { addToCart } from "../../../src/apis/cartService";
import { SidebarContext } from "../../../src/contexts/SidebarProvider";
import { StoreContext } from "../../../src/contexts/storeProvider";
import { ToastContext } from "../../../src/contexts/ToastProvider";
import style from "./style.module.scss";

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState("");
    const [activeImg, setActiveImg] = useState(0);
    const [isAdding, setIsAdding] = useState(false);

    const { setIsOpen, setType, handleGetListProductCart } = useContext(SidebarContext);
    const { userId } = useContext(StoreContext);
    const { toast } = useContext(ToastContext);

    useEffect(() => {
        setIsLoading(true);
        getProductById(id)
            .then((res) => {
                if (res.code === 1000) {
                    setProduct(res.result);
                } else {
                    toast.error("Không tìm thấy sản phẩm!");
                    navigate("/shop");
                }
            })
            .catch(() => {
                toast.error("Lỗi tải sản phẩm!");
                navigate("/shop");
            })
            .finally(() => setIsLoading(false));
    }, [id]);

    const handleAddToCart = async () => {
        if (!userId) {
            toast.warn("Vui lòng đăng nhập để thêm vào giỏ hàng");
            return;
        }
        if (!selectedSize) {
            toast.warn("Vui lòng chọn size trước");
            return;
        }
        setIsAdding(true);
        try {
            await addToCart({ userId, productId: product.id, quantity: 1, size: selectedSize });
            toast.success("Thêm vào giỏ hàng thành công!");
            handleGetListProductCart(userId);
            setIsOpen(true);
            setType("cart");
        } catch {
            toast.error("Thêm vào giỏ thất bại!");
        } finally {
            setIsAdding(false);
        }
    };

    if (isLoading) {
        return (
            <>
                <MyHeader />
                <div className={style.loadingBox}>Đang tải sản phẩm...</div>
                <Footer />
            </>
        );
    }

    if (!product) return null;

    return (
        <>
            <MyHeader />
            <Layout>
                <div className={style.breadcrumb}>
                    <span className={style.breadcrumbLink} onClick={() => navigate("/")}>Home</span>
                    {" > "}
                    <span className={style.breadcrumbLink} onClick={() => navigate("/shop")}>Shop</span>
                    {" > "}
                    <span className={style.breadcrumbCurrent}>{product.name}</span>
                </div>

                <div className={style.container}>
                    {/* LEFT: Images */}
                    <div className={style.imageSection}>
                        <div className={style.mainImageBox}>
                            <img
                                src={product.images?.[activeImg] || ""}
                                alt={product.name}
                                className={style.mainImage}
                            />
                        </div>
                        <div className={style.thumbnailRow}>
                            {(product.images || []).map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`thumb-${idx}`}
                                    className={`${style.thumbnail} ${activeImg === idx ? style.thumbnailActive : ""}`}
                                    onClick={() => setActiveImg(idx)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Info */}
                    <div className={style.infoSection}>
                        <h1 className={style.productName}>{product.name}</h1>
                        <div className={style.productPrice}>
                            {Number(product.price).toLocaleString("vi-VN")}₫
                        </div>

                        <div className={style.divider} />

                        {product.description && (
                            <p className={style.description}>{product.description}</p>
                        )}

                        <div className={style.metaRow}>
                            {product.type && <span><b>Loại:</b> {product.type}</span>}
                            {product.material && <span><b>Chất liệu:</b> {product.material}</span>}
                        </div>

                        {/* Size selector */}
                        <div className={style.sizeLabel}>Chọn Size:</div>
                        <div className={style.sizeGrid}>
                            {(product.sizes || []).map((s, idx) => (
                                <button
                                    key={idx}
                                    className={`${style.sizeBtn} ${selectedSize === s.sizeName ? style.sizeBtnActive : ""} ${s.quantity === 0 ? style.sizeBtnDisabled : ""}`}
                                    onClick={() => s.quantity > 0 && setSelectedSize(s.sizeName)}
                                    disabled={s.quantity === 0}
                                    title={s.quantity === 0 ? "Hết hàng" : `Còn ${s.quantity} sản phẩm`}
                                >
                                    {s.sizeName}
                                    {s.quantity === 0 && <span className={style.outOfStock}>Hết</span>}
                                </button>
                            ))}
                        </div>

                        {selectedSize && (
                            <div className={style.selectedSizeInfo}>
                                Đã chọn: <b>{selectedSize}</b>
                                <span className={style.clearSize} onClick={() => setSelectedSize("")}> (xóa)</span>
                            </div>
                        )}

                        <button
                            className={style.addToCartBtn}
                            onClick={handleAddToCart}
                            disabled={isAdding}
                        >
                            {isAdding ? "Đang thêm..." : "🛒 THÊM VÀO GIỎ HÀNG"}
                        </button>

                        <div className={style.divider} />

                        <div className={style.extraInfo}>
                            <div>🚚 Miễn phí vận chuyển cho đơn hàng trên 500.000₫</div>
                            <div>🔄 Đổi trả trong vòng 7 ngày</div>
                            <div>✅ Sản phẩm chính hãng 100%</div>
                        </div>
                    </div>
                </div>
            </Layout>
            <Footer />
        </>
    );
}

export default ProductDetail;
