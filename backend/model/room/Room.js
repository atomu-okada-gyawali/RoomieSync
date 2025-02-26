import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

const Room = sequelize.define(
  "Room",
  {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.STRING, unique: true },
  },
  {
    timestamps: true,
  }
);

export default Room;
