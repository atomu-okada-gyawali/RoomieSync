import { sequelize } from "../config/database.js";
import models from "../model/associations.js";

const database = {
  sequelize,
  ...models,
};

export const db = async () => {
  try {
    await database.sequelize.sync({ alter: true });
    console.log("Database connected successfully");
  } catch (e) {
    console.error("Failed to connect to database:", e);
  }
};

export default database;
