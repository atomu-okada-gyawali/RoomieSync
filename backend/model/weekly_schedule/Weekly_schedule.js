import { DataTypes } from "sequelize";
import { sequelize } from "../../config/index.js";

const WeeklySchedule = sequelize.define("Weekly_Schedule", {
  ChoreId: { type: DataTypes.INTEGER },
  DayOfTheWeek: { type: DataTypes.STRING },
});

// Associations
import Chore from "../chore/Chore.js";
WeeklySchedule.belongsTo(Chore, { foreignKey: "ChoreId" });

export default WeeklySchedule;
