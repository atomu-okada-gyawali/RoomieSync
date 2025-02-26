import Room from "../../model/room/Room.js";

import { generateToken } from "../../security/jwt-util.js";
// Create a new room
// createRoom,
// deleteRoom,
// joinRoom,
export const createRoom = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if room with same name exists
    const existingRoom = await Room.findOne({
      where: { Name: name },
    });

    if (existingRoom) {
      return res.status(409).json({ message: "Room already exists" });
    }

    // Create new room
    const room = await Room.create({
      Name: name,
    });

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const joinRoom = async (req, res) => {
  const { rName } = req.params;
  try {
    // Check if room with same name exists
    const existingRoom = await Room.findOne({
      where: { Name: rName },
    });

    if (existingRoom) {
      res.status(200).json(existingRoom);
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a room
export const deleteRoom = async (req, res) => {
  try {
    const deleted = await Room.destroy({
      where: { Id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
