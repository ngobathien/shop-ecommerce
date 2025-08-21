import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
} from "../controllers/productController.js";
import protect from "../middlewares/verifytoken.js";

const router = express.Router();

// lấy tất cả sản phẩm
// GET api/v1/products/
router.get("/", getAllProducts);

// lấy sản phẩm theo id
// GET api/v1/products/:id
router.get("/:id", getProductById);

// tạo sản phẩm mới
// POST api/v1/products/
router.post("/", protect, createProduct);

// PUT api/v1/products/:id
router.put("/:id", protect, updateProduct);

// DELETE api/v1/products/:id
router.delete("/:id", protect, deleteProduct);

export default router;
