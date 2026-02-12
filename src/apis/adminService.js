import axiosClient from "./axiosClient";

// ===================== DASHBOARD =====================
export const getDashboardSummary = async () => {
  const response = await axiosClient.get("/api/dashboard/summary");
  return response.data; // { code, message, result: { totalOrders, totalRevenue, totalProducts, totalSoldItems } }
};

// ===================== USERS =====================
export const getAllUsersPaged = async (page = 0, size = 10) => {
  const response = await axiosClient.get(`/api/users/paged?page=${page}&size=${size}`);
  return response.data; // { code, message, result: Page<UserResponse> }
};

export const lockUser = async (id) => {
  const response = await axiosClient.put(`/api/users/lock/${id}`);
  return response.data;
};

export const unlockUser = async (id) => {
  const response = await axiosClient.put(`/api/users/unlock/${id}`);
  return response.data;
};

// ===================== PRODUCTS =====================
export const getAllProducts = async () => {
  const response = await axiosClient.get("/api/products");
  return response.data; // { code, message, result: ProductResponse[] }
};

export const filterProducts = async (filterBody = {}, page = 0, size = 10, sortBy = "createdAt", direction = "desc") => {
  const response = await axiosClient.post(
    `/api/products/filter?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`,
    filterBody
  );
  return response.data; // { code, message, result: Page<ProductResponse> }
};

export const createProduct = async (formData) => {
  const response = await axiosClient.post("/api/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateProduct = async (id, formData) => {
  const response = await axiosClient.put(`/api/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axiosClient.delete(`/api/products/${id}`);
  return response.data;
};

// ===================== ORDERS =====================
export const filterOrders = async (filterBody = {}, page = 0, size = 10) => {
  const response = await axiosClient.post(
    `/api/orders/filter?page=${page}&size=${size}`,
    filterBody
  );
  return response.data; // { code, message, result: Page<OrderResponse> }
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await axiosClient.put(`/api/orders/status/${orderId}`, { status });
  return response.data;
};

// ===================== INVOICES =====================
export const filterInvoices = async (filterBody = {}, page = 0, size = 10, sortBy = "issuedAt", direction = "desc") => {
  const response = await axiosClient.post(
    `/api/invoices/filter?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`,
    filterBody
  );
  return response.data; // { code, message, result: Page<InvoiceResponse> }
};

export const getInvoiceById = async (id) => {
  const response = await axiosClient.get(`/api/invoices/${id}`);
  return response.data;
};

export const generateInvoicePdf = async (invoiceId) => {
  const response = await axiosClient.post(`/api/invoices/generate-pdf/${invoiceId}`);
  return response.data; // { code, message, result: "url-to-pdf" }
};
