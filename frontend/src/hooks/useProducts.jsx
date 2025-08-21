import { useState, useEffect } from "react";
import {
  getAllProducts as apiGetAllProducts,
  getProductById as apiGetProductById,
  createProduct as apiCreateProduct,
  deleteProduct as apiDeleteProduct,
  updateProduct as apiUpdateProduct,
} from "../services/productServices";

export default function useProducts() {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const data = await apiGetAllProducts();
      console.log(data);
      setProducts(data.products);
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm:", err);
    }
  };

  const getProductById = async (id) => {
    try {
      const data = await apiGetProductById(id);
      console.log(data);
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm:", err);
    }
  };
  const handleCreateProduct = async (newProduct) => {
    try {
      await apiCreateProduct(newProduct);

      // thêm thành công, load lại danh sách
      await getAllProducts();
    } catch (err) {
      console.error("Lỗi khi thêm sản phẩm:", err);
    }
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    try {
      await apiUpdateProduct(id, updatedProduct);

      // thêm thành công, load lại danh sách
      await getAllProducts();
    } catch (err) {
      console.error("Lỗi khi cập nhật sản phẩm:", err);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await apiDeleteProduct(id);

      // thêm thành công, load lại danh sách
      await getAllProducts();
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm:", err);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return {
    products,
    getAllProducts,
    getProductById,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
  };
}
