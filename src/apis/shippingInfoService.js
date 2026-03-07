import axiosClient from "./axiosClient";

// POST /api/shipping-info/{userId} — Thêm địa chỉ giao hàng
// body: { fullName, phone, province, district, ward, streetAddress, note, isDefault }
const createShippingInfo = async (userId, data) => {
    const response = await axiosClient.post(`/api/shipping-info/${userId}`, data);
    return response.data; // { code, message, result: ShippingInfoResponse }
};

// GET /api/shipping-info/{userId} — Lấy danh sách địa chỉ của user
const getShippingInfoByUser = async (userId) => {
    const response = await axiosClient.get(`/api/shipping-info/${userId}`);
    return response.data; // { code, message, result: ShippingInfoResponse[] }
};

// PUT /api/shipping-info/{id} — Cập nhật địa chỉ
const updateShippingInfo = async (id, data) => {
    const response = await axiosClient.put(`/api/shipping-info/${id}`, data);
    return response.data;
};

// DELETE /api/shipping-info/{id} — Xóa địa chỉ
const deleteShippingInfo = async (id) => {
    const response = await axiosClient.delete(`/api/shipping-info/${id}`);
    return response.data;
};

export { createShippingInfo, getShippingInfoByUser, updateShippingInfo, deleteShippingInfo };
