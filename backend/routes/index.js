import express from "express";
import roomRoutes from "./room/roomRoutes.js";
import userRoutes from "./user/userRoutes.js";
import shrdExpenseRoutes from "./shrdExpense/shrdExpenseRoutes.js";
import choreRoutes from "./chore/choreRoutes.js";
import authRoutes from "./auth/authRoutes.js";

const router = express.Router();

// Mount routes
router.use("/rooms", roomRoutes);
router.use("/users", userRoutes);
router.use("/shared-expenses", shrdExpenseRoutes);
router.use("/chores", choreRoutes);
router.use("/auth", authRoutes);

export default router;
