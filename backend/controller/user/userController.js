import { User } from "../../model/index.js";
import bcrypt from "bcrypt"; // Import bcrypt for password hashing
import { generateToken } from "../../security/jwt-util.js";
// Create User
export const createUser = async (req, res) => {
  try {
    const { name, contact, email, address, password } = req.body;

    // Validate input
    if (!name || !contact || !email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      Name: name,
      Contact: contact,
      Email: email,
      Address: address,
      Password: hashedPassword, // Store the hashed password
    });

    return res
      .status(201)
      .send({ data: user, message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).send({ message: "Failed to create user" });
  }
};

// Get All Users
export const getAllUsers = async (req, res) => {
  const { roomId } = req.params;

  try {
    const users = await User.findAll({
      where: {
        RoomId: roomId,
      },
    });
    return res.status(200).send({ data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).send({ message: "Failed to fetch users" });
  }
};

// Get User by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).send({ data: user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).send({ message: "Failed to fetch user" });
  }
};


export const updateUser = async (req, res) => {
  console.log("Incoming request body:", req.body);
  console.log("Incoming file:", req.file);

  try {
    const { name, contact, email, address, password, roomId } = req.body;
    const userId = req.params.id;

    // Find user
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Update user details
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.Password = hashedPassword;
    }

    const photoPath = req.file ? req.file.path : user.Photo;
    user.Name = name || user.Name;
    user.Contact = contact || user.Contact;
    user.RoomId = roomId || user.RoomId;
    user.Email = email || user.Email;
    user.Address = address || user.Address;
    user.Photo = photoPath || user.Photo;

    await user.save();

    // Generate a new token with updated user info
    const newToken = generateToken({ Users: user.toJSON() });

    return res.status(200).send({
      data: user,
      message: "User updated successfully",
      token: newToken, // Send the new token
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).send({ message: "Failed to update user" });
  }
};

export const leaveRoom = async (req, res) => {
  try {
    const userId = req.params.id;

    // Ensure userId is a valid number (if using Sequelize with a numeric ID)
    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }

    const [updatedCount] = await User.update(
      { RoomId: null },
      { where: { Id: userId } } // ✅ Corrected where condition
    );

    if (updatedCount === 0) {
      return res
        .status(404)
        .send({ message: "User not found or already left the room" });
    }
    const updatedUser = await User.findByPk(userId);
    const newToken = generateToken({ Users: updatedUser.toJSON() });

    return res
      .status(200)
      .send({ message: "User updated successfully", token: newToken });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).send({ message: "Failed to update user" });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleted = await User.destroy({ where: { Id: userId } });
    if (!deleted) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(204).send(); // No content
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).send({ message: "Failed to delete user" });
  }
};
