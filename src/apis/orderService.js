import axiosClient from "./axiosClient";

// POST /api/orders/{userId}?shippingInfoId=1 — Tạo đơn hàng từ giỏ
const createOrder = async (userId, shippingInfoId = null) => {
    const url = shippingInfoId
        ? `/api/orders/${userId}?shippingInfoId=${shippingInfoId}`
        : `/api/orders/${userId}`;
    const response = await axiosClient.post(url);
    return response.data; // { code, message, result: OrderResponse }
};

// GET /api/orders/user/{userId} — Lấy danh sách đơn hàng của user
const getOrdersByUser = async (userId) => {
    const response = await axiosClient.get(`/api/orders/user/${userId}`);
    return response.data; // { code, message, result: OrderResponse[] }
};

// GET /api/orders/{orderId} — Lấy chi tiết 1 đơn hàng
const getOrderById = async (orderId) => {
    const response = await axiosClient.get(`/api/orders/${orderId}`);
    return response.data; // { code, message, result: OrderResponse }
};

// PUT /api/orders/status/{orderId} — Cập nhật trạng thái đơn (ADMIN/STAFF)
// status: PENDING | CONFIRMED | SHIPPING | DELIVERED | CANCELLED
const updateOrderStatus = async (orderId, status) => {
    const response = await axiosClient.put(`/api/orders/status/${orderId}`, { status });
    return response.data;
};

// POST /api/orders/filter?page=0&size=10 — Lọc đơn hàng (ADMIN/STAFF)
const filterOrders = async (filterBody = {}, page = 0, size = 10) => {
    const response = await axiosClient.post(
        `/api/orders/filter?page=${page}&size=${size}`,
        filterBody
    );
    return response.data;
};

export { createOrder, getOrdersByUser, getOrderById, updateOrderStatus, filterOrders };
