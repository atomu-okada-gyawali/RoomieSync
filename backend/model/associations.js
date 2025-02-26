import Room from './room/Room.js';
import User from './user/User.js';
import ShrdExpense from './shrdExpense/ShrdExpense.js';
import Chore from './chore/Chore.js';

// Room-User associations
Room.hasMany(User, { foreignKey: 'RoomId' });
User.belongsTo(Room, { foreignKey: 'RoomId' });

// User-ShrdExpense associations
User.hasMany(ShrdExpense, { foreignKey: 'Agent' });
ShrdExpense.belongsTo(User, { foreignKey: 'Agent' });

// User-Chore associations
User.hasMany(Chore, { foreignKey: 'UserId' });
Chore.belongsTo(User, { foreignKey: 'UserId' });

export default {
  Room,
  User,
  ShrdExpense,
  Chore
};
