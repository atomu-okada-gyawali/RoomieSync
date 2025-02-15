import express from "express";
import {
  createShrdExpense,
  getAllShrdExpenses,
  getShrdExpenseById,
  updateShrdExpense,
  deleteShrdExpense,
} from "../../controller/shrdExpense/shrdExpenseController.js";


const router = express.Router();


// Shared Expense routes
router.post("/", createShrdExpense);
router.get("/", getAllShrdExpenses);
router.get("/:id", getShrdExpenseById);
router.put("/:id", updateShrdExpense);
router.delete("/:id", deleteShrdExpense);

export default router;
