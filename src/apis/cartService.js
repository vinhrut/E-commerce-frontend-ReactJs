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

const deleteItemCart = async (cartItemId) => {
  try {
    await axiosClient.delete(`/api/cart-items/${cartItemId}`);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const clearCart = async (cartId) => {
  try {
    await axiosClient.delete(`/api/cart-items/cart/${cartId}`);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { addToCart, getCart, deleteItemCart, clearCart };
