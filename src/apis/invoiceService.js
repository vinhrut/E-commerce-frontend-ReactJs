import axiosClient from "./axiosClient";

// GET /api/invoices/user/{userId} — Xem hóa đơn của user
const getInvoicesByUser = async (userId) => {
    const response = await axiosClient.get(`/api/invoices/user/${userId}`);
    return response.data; // { code, message, result: InvoiceResponse[] }
};

// GET /api/invoices/{id} — Xem chi tiết 1 hóa đơn
const getInvoiceById = async (id) => {
    const response = await axiosClient.get(`/api/invoices/${id}`);
    return response.data; // { code, message, result: InvoiceResponse }
};

// POST /api/invoices/generate-pdf/{id} — Tạo PDF hóa đơn, trả về URL file
const generateInvoicePdf = async (invoiceId) => {
    const response = await axiosClient.post(`/api/invoices/generate-pdf/${invoiceId}`);
    return response.data; // { code, message, result: "http://minio-url/invoice.pdf" }
};

export { getInvoicesByUser, getInvoiceById, generateInvoicePdf };
