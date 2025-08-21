import React, { createContext, useState, useEffect } from "react";
import {
  login,
  register,
  logout,
  getCurrentUser,
  getToken,
} from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = getToken();
      if (token) {
        try {
          const data = await getCurrentUser(token);
          // data.data.user
          // data.data.user.lastname
          // data.data.user.firstname
          // data.data.user.email
          setAuthUser(data.user);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Token không hợp lệ, đăng xuất:", error);
          logout();
          setAuthUser(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };
    checkAuthStatus();
  }, []);

  const loginUser = async (userData) => {
    try {
      const data = await login(userData);
      if (data?.token) {
        localStorage.setItem("token", data.token);
        setAuthUser(data.user);
        setIsAuthenticated(true);
      }
      return data;
    } catch (error) {
      // throw error;
      console.error("Đăng nhập thất bại:", error);
      throw {
        message: "Đăng nhập thất bại",
        error: error.response?.data || error.message,
      };
    }
  };

  const registerUser = async (userData) => {
    try {
      const data = await register(userData);
      if (data?.token) {
        localStorage.setItem("token", data.token);
        setAuthUser(data.user);
        setIsAuthenticated(true);
      }
      return data;
    } catch (error) {
      // throw error;
      console.error("Đăng ký thất bại:", error);
      throw {
        message: "Đăng ký thất bại",
        error: error.response?.data || error.message,
      };
    }
  };

  const logoutUser = () => {
    logout();
    setAuthUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    authUser,
    isAuthenticated,
    loading,
    register: registerUser,
    login: loginUser,
    logout: logoutUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
