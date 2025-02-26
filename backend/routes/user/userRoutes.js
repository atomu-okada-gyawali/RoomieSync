import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  leaveRoom,
} from "../../controller/user/userController.js";
import upload from "../../middleware/upload.js";
import multer from "multer";
import path from "path"; // Import path module
const router = express.Router();

// User routes
router.post("/", createUser);
router.get("/all/:roomId", getAllUsers);
router.get("/:id", getUserById);
router.put("/leaveRoom/:id", leaveRoom);
router.put(
  "/:id",
  (req, res, next) => {
    upload.single("photo")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
      } else if (err) {
        return res.status(500).json({ message: err.message });
      }
      next();
    });
  },
  updateUser
);
router.delete("/:id", deleteUser);

export default router; // Add export statement for the router
