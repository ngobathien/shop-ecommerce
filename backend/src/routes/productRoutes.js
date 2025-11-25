import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
} from "../controllers/ProductController.js";
import protect from "../middlewares/verifyToken.js";
import { upload } from "../middlewares/uploadImage.js";

const router = express.Router();

// lấy tất cả sản phẩm
// GET api/v1/products/
router.get("/", getAllProducts);

// lấy sản phẩm theo id
// GET api/v1/products/:id
router.get("/:id", getProductById);

// tạo sản phẩm mới
// POST api/v1/products/
router.post("/", protect, upload.array("images", 5), createProduct);

// PUT api/v1/products/:id
router.put("/:id", protect, updateProduct);

// DELETE api/v1/products/:id
router.delete("/:id", protect, deleteProduct);

// router.post("/upload/product");
export default router;
