import axios from "axios";
import api from "./apiClient";

export const getAllUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(`${api}/users`, config);
    console.log("Fetched users:", res);
    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};
