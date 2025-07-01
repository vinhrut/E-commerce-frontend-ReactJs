import axiosClient from "./axiosClient";

const register = async (data) => {
  try {
    const response = await axiosClient.post("/register", data);
    return response;
  } catch (error) {
    throw error;
  }
};

const signIn = async (data) => {
  try {
    const response = await axiosClient.post("/login", data);
    return response;
  } catch (error) {
    throw error;
  }
};

const getInfo = async (userId) => {
  try {
    return await axiosClient.get(`/user/info/${userId}`);
  } catch (error) {
    throw error;
  }
};

export { register, signIn, getInfo };
