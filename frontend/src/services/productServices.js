import axios from "axios";
import api from "./apiClient";

const apiProduct = `${api}/products/`;

export const getAllProducts = async () => {
  const res = await axios.get(`${api}/products`);
  // console.log(res);
  return res.data;
};

export const getProductById = async (id) => {
  const res = await axios.get(`${api}/products/${id}`);
  return res.data;
};

// admin
export const createProduct = async (productData) => {
  const token = localStorage.getItem("token");

  // const config = { header: { "Content-Type": "application/json" } };
  const res = await axios.post(`${api}/products`, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateProduct = async (id, updatedProduct) => {
  const token = localStorage.getItem("token");
  const res = await axios.put(`${api}/products/${id}`, updatedProduct, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const deleteProduct = async (id) => {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`${api}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
