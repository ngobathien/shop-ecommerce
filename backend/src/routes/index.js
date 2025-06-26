import { Router } from "express";
import productRoutes from "./productRoutes.js";
import authorRoutes from "./authRoutes.js";
const router = Router();

// api/v1/auth
router.use("/auth", authorRoutes);

// api/v1/products
router.use("/products", productRoutes);

// api/v1/users

// api/v1/carts

// api/v1/orders

export default router;
