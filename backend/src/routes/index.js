import { Router } from "express";
import productRoutes from "./productRoutes.js";
import authorRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";

const router = Router();

// api/v1/auth
router.use("/auth", authorRoutes);

// api/v1/products
router.use("/products", productRoutes);

// api/v1/users
router.use("/users", userRoutes);

// api/v1/carts

// api/v1/orders

export default router;
