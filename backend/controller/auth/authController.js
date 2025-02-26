import { User } from "../../model/index.js";
import { generateToken } from "../../security/jwt-util.js";
import bcrypt from "bcrypt"; // Import bcrypt for password hashing

const login = async (req, res) => {
  try {
    console.log("Login attempt:", req.body); // Log the login attempt

    // Fetching all the data from users table
    if (!req.body.email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!req.body.password) {
      return res.status(400).send({ message: "Password is required" });
    }

    const user = await User.findOne({ where: { Email: req.body.email } });
    if (!user) {
      console.log("User not found:", req.body.email); // Log if user is not found
      return res.status(404).send({ message: "User not found" });
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.Password
    );
    if (isPasswordValid) {
      const token = generateToken({ Users: user.toJSON() });
      return res.status(200).send({
        data: { access_token: token },
        message: "Successfully logged in",
      });
    } else {
      console.log("Invalid password for user:", req.body.email); // Log invalid password attempt
      return res.status(401).send({ message: "Invalid password" });
    }
  } catch (e) {
    console.log("Error during login:", e); // Log any errors
    res.status(500).json({ error: "Failed to login" });
  }
};

/**
 *  init
 */

const init = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    const user = req.user;
    delete user.password; // Remove password from user object
    res
      .status(201)
      .send({ data: user, message: "successfully fetched current user" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const authController = {
  login,
  init,
};
