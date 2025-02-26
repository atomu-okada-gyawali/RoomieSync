import Chore from "../../model/chore/Chore.js";
import User from "../../model/user/User.js";
import { Op } from "sequelize";

export const createChore = async (req, res) => {
  let { name, date, userId, days } = req.body;

  try {
    // Transform null date to undefined
    const choreData = {
      Name: name,
      Date: date === "" ? undefined : date,
      UserId: userId,
      Days: days,
      Status: "Pending",
    };
    console.log(choreData);
    const chore = await Chore.create(choreData);
    res.status(201).json(chore);
  } catch (error) {
    console.error("Error creating chore:", error);
    res.status(500).json({
      message: error.message,
      details: error.errors?.map((err) => err.message),
    });
  }
};

// Get all chores
export const getAllChores = async (req, res) => {
  console.log("getAllChores function invoked");
  const { date, roomId, dayOfTheWeek } = req.params; // Use dayOfTheWeek parameter
  console.log("Received parameters:", { date, roomId, dayOfTheWeek }); // Log incoming parameters
  try {
    const chores = await Chore.findAll({
      where: {
        [Op.or]: [
          {
            Date: {
              [Op.between]: [
                new Date(date + "T00:00:00.000Z"),
                new Date(date + "T23:59:59.999Z"),
              ],
            },
          },
          {
            Days: {
              [Op.contains]: [dayOfTheWeek], // Check if Days array contains the specified day
            },
          },
        ],
      },
      include: [
        {
          model: User,
          attributes: ["Id", "Name", "RoomId"],
      where: {
        RoomId: roomId && !isNaN(Number(roomId)) ? Number(roomId) : undefined,
          },
        },
      ],
    });

    res.status(200).json(chores);
  } catch (error) {
    console.error("Error fetching chores:", error); // Log the error
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
  let { name, date, status, days } = req.body;
  const { id } = req.params;
  try {
    const chore = await Chore.findByPk(id);
    if (!chore) {
      return res.status(404).send({ message: "Chore not found" });
    }
    if (days !== null && date !== null) {
      days = null;
    }

    chore.Name = name || chore.Name;
    chore.Date = date || chore.Date;
    chore.Status = status || chore.status;
    chore.Days = days || chore.Days;

    await chore.save();

    return res
      .status(200)
      .send({ data: chore, message: "chore updated successfully" });
  } catch (error) {
    console.error("Error updating chore:", error);
    return res.status(500).send({ message: "Failed to update chore" });
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
