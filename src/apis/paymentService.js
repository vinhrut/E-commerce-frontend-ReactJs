import axiosClient from "./axiosClient";

// POST /api/payment/create-url/{orderId} — Tạo URL thanh toán VNPay
// Trả về paymentUrl → redirect người dùng đến đó để thanh toán
const createPaymentUrl = async (orderId) => {
    const response = await axiosClient.post(`/api/payment/create-url/${orderId}`);
    return response.data;
    // result: { paymentUrl, txnRef, amount, message, status }
};

// Hàm tiện ích: redirect thẳng đến VNPay
const redirectToVNPay = async (orderId) => {
    const data = await createPaymentUrl(orderId);
    if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
    }
    return data;
};

// GET /api/payment/vnpay-return — Backend tự xử lý, frontend chỉ cần đọc query params khi VNPay redirect về
// Dùng trong trang /payment-return để đọc kết quả
const getVnpayReturnResult = async (queryString) => {
    const response = await axiosClient.get(`/api/payment/vnpay-return?${queryString}`);
    return response.data;
    // result: { txnRef, amount, message, status } — status "00" = thành công
};

export { createPaymentUrl, redirectToVNPay, getVnpayReturnResult };
