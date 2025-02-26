import express from "express";
import {
  createRoom,
  deleteRoom,
  joinRoom,
} from "../../controller/room/roomController.js";

const router = express.Router();

// Room routes
router.post("/", createRoom);
router.post("/join/:rName", joinRoom);
router.delete("/:id", deleteRoom);
export default router;
