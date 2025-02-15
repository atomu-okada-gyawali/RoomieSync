import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';

const Expense = sequelize.define('Expense', {
  Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Name: { type: DataTypes.STRING },
  UserId: { type: DataTypes.INTEGER }
}, {
  timestamps: true
});

export default Expense;
