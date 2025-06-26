import express from "express";
import ProductController from "../controllers/ProductController.js";

const router = express.Router();

// GET api/v1/products/
router.get("/", ProductController.getAllProducts);

// GET api/v1/products/:id
router.get("/:id", ProductController.getProductById);

// POST api/v1/products/
router.post("/", ProductController.createProduct);

// PUT api/v1/products/:id
router.put("/:id", ProductController.updateProduct);

// DELETE api/v1/products/:id
router.delete("/:id", ProductController.deleteProduct);

export default router;
