import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';

const ShrdExpense = sequelize.define('ShrdExpense', {
  Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Name: { type: DataTypes.STRING },
  Amount: { type: DataTypes.DECIMAL(10, 2) },
  Agent: { type: DataTypes.INTEGER },
  Status:{type:DataTypes.STRING}
}, {
  timestamps: true
});

export default ShrdExpense;