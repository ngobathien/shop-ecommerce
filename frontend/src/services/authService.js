import axios from "axios";
import api from "./apiClient";

export const login = async (userData) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.post(`${api}/auth/login`, userData, config);
    console.log("Login response:", data);
    return data.data;
  } catch (error) {
    throw error.response?.data || { message: "Đăng nhập thất bại" };
  }
};

export const register = async (userData) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await axios.post(`${api}/auth/register`, userData, config);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Đăng ký thất bại" };
  }
};

export const getCurrentUser = async (token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const res = await axios.get(`${api}/auth/me`, config);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Lấy thông tin user thất bại" };
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};
