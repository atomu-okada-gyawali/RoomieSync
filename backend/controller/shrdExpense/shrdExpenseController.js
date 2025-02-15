import ShrdExpense from "../../model/shrdExpense/ShrdExpense.js";

// Create a new shared expense
export const createShrdExpense = async (req, res) => {
  try {
    const shrdExpense = await ShrdExpense.create(req.body);
    res.status(201).json(shrdExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all shared expenses
export const getAllShrdExpenses = async (req, res) => {
  try {
    const shrdExpenses = await ShrdExpense.findAll();
    res.status(200).json(shrdExpenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a shared expense by ID
export const getShrdExpenseById = async (req, res) => {
  try {
    const shrdExpense = await ShrdExpense.findByPk(req.params.id);
    if (shrdExpense) {
      res.status(200).json(shrdExpense);
    } else {
      res.status(404).json({ message: "Shared expense not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a shared expense
export const updateShrdExpense = async (req, res) => {
  try {
    const [updated] = await ShrdExpense.update(req.body, {
      where: { Id: req.params.id },
    });
    if (updated) {
      const updatedShrdExpense = await ShrdExpense.findByPk(req.params.id);
      res.status(200).json(updatedShrdExpense);
    } else {
      res.status(404).json({ message: "Shared expense not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a shared expense
export const deleteShrdExpense = async (req, res) => {
  try {
    const deleted = await ShrdExpense.destroy({
      where: { Id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Shared expense not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
