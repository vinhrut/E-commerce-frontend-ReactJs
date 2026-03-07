import axiosClient from "./axiosClient";

// POST /api/users — Đăng ký tài khoản mới
const register = async (data) => {
  // data: { fullName, email, password, phone }
  const response = await axiosClient.post("/api/users", data);
  return response.data; // { code, message, result: UserResponse }
};

// POST /api/auth/login — Đăng nhập
const signIn = async (data) => {
  // data: { email, password }
  const response = await axiosClient.post("/api/auth/login", data);
  return response.data; // { code, message, result: { accessToken, refreshToken, roles, userResponse } }
};

// GET /api/users/{id} — Lấy thông tin user
const getInfo = async (userId) => {
  const response = await axiosClient.get(`/api/users/${userId}`);
  return response.data; // { code, message, result: UserResponse }
};

// PUT /api/users/updateUserProfile/{id} — Cập nhật thông tin cá nhân
const updateProfile = async (userId, data) => {
  // data: { fullName, phone }
  const response = await axiosClient.put(`/api/users/updateUserProfile/${userId}`, data);
  return response.data;
};

// PUT /api/users/updateUserPassword/{id} — Đổi mật khẩu
const updatePassword = async (userId, data) => {
  // data: { oldPassword, newPassword }
  const response = await axiosClient.put(`/api/users/updateUserPassword/${userId}`, data);
  return response.data;
};

export { register, signIn, getInfo, updateProfile, updatePassword };
