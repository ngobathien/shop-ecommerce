import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/CategoriesController.js";

const router = express.Router();

// lấy tất cả sản phẩm
// GET api/v1/categories/
router.get("/", getCategories);

// lấy chi tiết category theo id
// GET api/v1/categories/
router.get("/:categoryId", getCategoryById);

// tạo category mới
// POST api/v1/categories/
router.post("/", createCategory);

//
// GET api/v1/categories/
router.put("/:id", updateCategory);

// lấy tất cả sản phẩm
// GET api/v1/categories/
router.delete("/:id", deleteCategory);

export default router;
