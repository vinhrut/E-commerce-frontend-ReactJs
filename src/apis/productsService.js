import axiosClient from "./axiosClient";

// GET /api/products — Lấy tất cả sản phẩm (public)
const getProducts = async () => {
  const response = await axiosClient.get("/api/products");
  return response.data; // { code, message, result: ProductResponse[] }
};

// GET /api/products/{id} — Lấy 1 sản phẩm theo ID
const getProductById = async (id) => {
  const response = await axiosClient.get(`/api/products/${id}`);
  return response.data; // { code, message, result: ProductResponse }
};

// POST /api/products/filter — Lọc sản phẩm có phân trang (ADMIN/STAFF)
// params: { page=0, size=10, sortBy='createdAt', direction='desc' }
// body: { name, type, minPrice, maxPrice }
const filterProducts = async (filterBody = {}, params = {}) => {
  const { page = 0, size = 10, sortBy = "createdAt", direction = "desc" } = params;
  const response = await axiosClient.post(
    `/api/products/filter?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`,
    filterBody
  );
  return response.data; // { code, message, result: Page<ProductResponse> }
};

export { getProducts, getProductById, filterProducts };
