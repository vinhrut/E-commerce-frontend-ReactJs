import { toast } from "react-toastify";
import axiosClient from "./axiosClient";

const addToCart = async (data) => {
  try {
    const response = await axiosClient.post("/cart", data);
    return response;
  } catch (error) {
    throw error;
  }
};

const getCart = async (userId) => {
  try {
    const response = await axiosClient.get(`/cart/${userId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

const deleteItemCart = async (data) => {
  const response = await axiosClient
    .delete(`/cart/deleteItem`, { data })
    .then((res) => {
      toast.success("Delete item successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

export { addToCart, getCart, deleteItemCart };
