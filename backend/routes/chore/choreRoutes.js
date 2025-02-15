import express from "express";
import {
  createChore,
  getAllChores,
  getChoreById,
  updateChore,
  deleteChore,
} from "../../controller/chore/choreController.js";

const router = express.Router();

// Chore routes
router.post("/", createChore);
router.get("/", getAllChores);
router.get("/:id", getChoreById);
router.put("/:id", updateChore);
router.delete("/:id", deleteChore);

export default router;
