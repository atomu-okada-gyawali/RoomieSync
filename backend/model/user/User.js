import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

const User = sequelize.define(
  "User",
  {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.STRING },
    Contact: { type: DataTypes.STRING(10) },
    Email: { type: DataTypes.STRING, unique: true },
    Photo: { type: DataTypes.STRING, allowNull: true },
    Address: { type: DataTypes.STRING },
    Password: { type: DataTypes.STRING },
    RoomId: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    timestamps: true,
  }
);

export default User;
