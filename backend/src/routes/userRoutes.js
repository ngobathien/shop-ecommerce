import express from "express";
import { getAllUsers } from "../controllers/userController.js";
import protect from "../middlewares/verifyToken.js";

const router = express.Router();

// POST api/v1/auth/getAllUsers
router.get("/", protect, getAllUsers);

export default router;
