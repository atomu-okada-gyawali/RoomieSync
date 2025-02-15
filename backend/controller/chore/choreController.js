import Chore from "../../model/chore/Chore.js";

// Create a new chore
export const createChore = async (req, res) => {
  try {
    const chore = await Chore.create(req.body);
    res.status(201).json(chore);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all chores
export const getAllChores = async (req, res) => {
  try {
    const chores = await Chore.findAll();
    res.status(200).json(chores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a chore by ID
export const getChoreById = async (req, res) => {
  try {
    const chore = await Chore.findByPk(req.params.id);
    if (chore) {
      res.status(200).json(chore);
    } else {
      res.status(404).json({ message: "Chore not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a chore
export const updateChore = async (req, res) => {
  try {
    const [updated] = await Chore.update(req.body, {
      where: { Id: req.params.id },
    });
    if (updated) {
      const updatedChore = await Chore.findByPk(req.params.id);
      res.status(200).json(updatedChore);
    } else {
      res.status(404).json({ message: "Chore not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a chore
export const deleteChore = async (req, res) => {
  try {
    const deleted = await Chore.destroy({
      where: { Id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Chore not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
