import express from "express";
import {
  getCurrentUser,
  login,
  register,
} from "../controllers/authController.js";
import protect from "../middlewares/verifyToken.js";

const router = express.Router();

// POST api/v1/auth/register
router.post("/register", register);

// POST api/v1/auth/login
router.post("/login", login);

// GET api/v1/auth/me
router.get("/me", protect, getCurrentUser);

export default router;
