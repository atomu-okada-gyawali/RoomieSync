import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

const Chore = sequelize.define(
  "Chore",
  {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.STRING },
    Date: { type: DataTypes.DATE, allowNull: true },
    Status: { type: DataTypes.STRING },
    UserId: { type: DataTypes.INTEGER },
    Days: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] }, // Set default value to empty array
  },
  {
    timestamps: true,
  }
);

export default Chore;
