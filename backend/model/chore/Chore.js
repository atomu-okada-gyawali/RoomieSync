import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';

const Chore = sequelize.define('Chore', {
  Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Name: { type: DataTypes.STRING },
  Date: { type: DataTypes.DATE },
  UserId: { type: DataTypes.INTEGER }
}, {
  timestamps: true
});

export default Chore;
