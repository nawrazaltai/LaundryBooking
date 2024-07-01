import express from "express";
import { getUserById } from "../controllers/userController.js";
import authenticateJWT from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id", authenticateJWT, getUserById);

export default router;
