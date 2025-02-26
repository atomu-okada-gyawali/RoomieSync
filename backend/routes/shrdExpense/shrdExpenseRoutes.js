import express from "express";
import {
  payShrdExpenses,
  createShrdExpense,
  getAllShrdExpenses,
  getShrdExpenseById,
  updateShrdExpense,
  deleteShrdExpense,
} from "../../controller/shrdExpense/shrdExpenseController.js";

const router = express.Router();

// Shared Expense routes
router.post("/", createShrdExpense);
router.put("/pay", payShrdExpenses); // New route for paying shared expenses
router.get("/all/:roomId", getAllShrdExpenses);
router.get("/:id", getShrdExpenseById);
router.put("/:id", updateShrdExpense);
router.delete("/:id", deleteShrdExpense);

export default router;
