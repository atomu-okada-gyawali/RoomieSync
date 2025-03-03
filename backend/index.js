import express from "express";
import bodyParser from "body-parser";
import { db } from "./database/index.js";
import routes from "./routes/index.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import { authenticateToken } from "./middleware/token-middleware.js";
dotenv.config();

const __dirname = path.resolve(); // Get the current directory
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api", routes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(authenticateToken);
// Database connection
db();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;