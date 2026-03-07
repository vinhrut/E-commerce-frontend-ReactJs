import { toast } from "react-toastify";
import axiosClient from "./axiosClient";

// POST /api/cart-items — Thêm sản phẩm vào giỏ
// body: { userId, productId, quantity, size }
const addToCart = async (data) => {
  const response = await axiosClient.post("/api/cart-items", data);
  return response.data; // { code, message, result: CartItemResponse }
};

// GET /api/cart/{userId} — Lấy giỏ hàng của user
const getCart = async (userId) => {
  const response = await axiosClient.get(`/api/cart/${userId}`);
  return response.data; // { code, message, result: CartItemResponse[] }
};

// DELETE /api/cart-items/{cartItemId} — Xóa 1 item khỏi giỏ
const deleteItemCart = async (cartItemId) => {
  try {
    await axiosClient.delete(`/api/cart-items/${cartItemId}`);
    toast.success("Xóa sản phẩm khỏi giỏ thành công!");
  } catch (err) {
    toast.error("Xóa sản phẩm thất bại!");
    console.error(err);
  }
};

// DELETE /api/cart-items/cart/{cartId} — Xóa toàn bộ giỏ hàng
const clearCart = async (cartId) => {
  try {
    await axiosClient.delete(`/api/cart-items/cart/${cartId}`);
    toast.success("Đã xóa toàn bộ giỏ hàng!");
  } catch (err) {
    toast.error("Xóa giỏ hàng thất bại!");
    console.error(err);
  }
};

export { addToCart, getCart, deleteItemCart, clearCart };
