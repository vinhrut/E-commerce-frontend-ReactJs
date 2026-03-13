import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MyHeader from "../../../src/component/Header/Header";
import Footer from "../../../src/component/Footer/Footer";
import Layout from "../../../src/component/Layout/LayoutForm";
import { getVnpayReturnResult } from "../../../src/apis/paymentService";
import style from "./style.module.scss";

function PaymentReturn() {
    const navigate = useNavigate();
    const location = useLocation();
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const queryString = location.search.replace("?", "");
        if (!queryString) {
            setIsLoading(false);
            return;
        }
        getVnpayReturnResult(queryString)
            .then((res) => {
                // Backend PaymentResponse: { status, message, txnRef, amount, paymentUrl }
                setResult(res);
            })
            .catch((err) => {
                console.error(err);
                setResult({ status: "error", message: "Không thể xác minh kết quả thanh toán." });
            })
            .finally(() => setIsLoading(false));
    }, []);

    const isSuccess = result?.status === "00" || result?.status === "SUCCESS";

    return (
        <>
            <MyHeader />
            <Layout>
                <div className={style.container}>
                    {isLoading ? (
                        <div className={style.loadingBox}>Đang xác nhận thanh toán...</div>
                    ) : (
                        <div className={`${style.card} ${isSuccess ? style.successCard : style.failCard}`}>
                            <div className={style.icon}>{isSuccess ? "✅" : "❌"}</div>
                            <h1 className={style.title}>
                                {isSuccess ? "Thanh toán thành công!" : "Thanh toán thất bại"}
                            </h1>
                            <p className={style.message}>
                                {result?.message || (isSuccess ? "Đơn hàng của bạn đã được xác nhận." : "Có lỗi xảy ra trong quá trình thanh toán.")}
                            </p>

                            {result?.txnRef && (
                                <div className={style.infoBox}>
                                    <div className={style.infoRow}>
                                        <span>Mã giao dịch:</span>
                                        <span className={style.infoValue}>{result.txnRef}</span>
                                    </div>
                                    {result.amount && (
                                        <div className={style.infoRow}>
                                            <span>Số tiền:</span>
                                            <span className={style.infoValue}>
                                                {Number(result.amount / 100).toLocaleString("vi-VN")}₫
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className={style.btnGroup}>
                                {isSuccess ? (
                                    <>
                                        <button className={style.btnPrimary} onClick={() => navigate("/my-orders")}>
                                            📋 Xem đơn hàng
                                        </button>
                                        <button className={style.btnSecondary} onClick={() => navigate("/shop")}>
                                            🛍️ Tiếp tục mua sắm
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className={style.btnPrimary} onClick={() => navigate("/checkout")}>
                                            🔄 Thử lại
                                        </button>
                                        <button className={style.btnSecondary} onClick={() => navigate("/")}>
                                            🏠 Về trang chủ
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </Layout>
            <Footer />
        </>
    );
}

export default PaymentReturn;
