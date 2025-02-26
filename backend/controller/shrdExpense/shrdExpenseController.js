import ShrdExpense from "../../model/shrdExpense/ShrdExpense.js";
import Users from "../../model/user/User.js";
import { Op } from "sequelize";
export const payShrdExpenses = async (req, res) => {
  const { ids } = req.body; // Expecting an array of IDs
  try {
    await ShrdExpense.update(
      { Status: "paid" }, // Update status to "paid"
      { where: { Id: ids } } // Update where Id is in the provided array
    );
    res.status(200).json({ message: "Expenses marked as paid." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new shared expense
export const createShrdExpense = async (req, res) => {
  const { name, amount, agentId } = req.body;
  try {
    const shrdExpense = await ShrdExpense.create({
      Name: name,
      Amount: amount,
      Agent: agentId,
      Status: "unpaid",
    });
    res.status(201).json(shrdExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all shared expenses
export const getAllShrdExpenses = async (req, res) => {
  try {
    const { roomId } = req.params;
    const shrdExpenses = await ShrdExpense.findAll({
      include: [
        {
          model: Users,
          attributes: ["Id", "Name", "RoomId"],
          where: {
            RoomId: Number(roomId),
          },
        },
      ],
      where: {
        Status: "unpaid",
      },
    });
    res.status(200).json(shrdExpenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const payShrdExpense = async (req, res) => {
  const { ids } = req.body; // Expecting an array of IDs
  try {
    await ShrdExpense.update(
      { Status: "paid" }, // Update status to "paid"
      { where: { Id: { [Op.in]: ids } } } // Update where Id is in the provided array
    );
    res.status(200).json({ message: "Expenses marked as paid." });
  } catch (err) {}
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

export const updateShrdExpense = async (req, res) => {
  const { name, amount} = req.body;
  const id = req.params.id;
  try {
    const shrdExpense = await ShrdExpense.findOne({
      where: { Id: id },
    });
    
    if (!shrdExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    shrdExpense.Name = name || shrdExpense.Name;
    shrdExpense.Amount = amount || shrdExpense.Amount;

    
    await shrdExpense.save();
    res.status(200).json({ message: "Expense updated successfully" });
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
