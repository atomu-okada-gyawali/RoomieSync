import Room from "../../model/room/Room.js";

// Create a new room
export const createRoom = async (req, res) => {
  try {
    const {name} = req.body;
    const room = await Room.create(name);
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a room by ID
export const getRoomById = async (req, res) => {
  const {code} = req.params;
  try {
    const room = await Room.findOne({
      where:{
        Code:code}});
    if (room) {
      res.status(200).json(room);
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a room
export const updateRoom = async (req, res) => {
  try {
    const [updated] = await Room.update(req.body, {
      where: { Id: req.params.id },
    });
    if (updated) {
      const updatedRoom = await Room.findByPk(req.params.id);
      res.status(200).json(updatedRoom);
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
