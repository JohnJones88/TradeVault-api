const { sequelize } = require('./data-connections');
const { DataTypes } = require('sequelize');
const Users = require('./users-models');

const Collectables = sequelize.define('collectables', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(64),
    allowNull: false

  },
  description: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  condition: {
    type: DataTypes.ENUM('mint', 'excellent', 'very good', 'poor')
  },
 imageUrl: {
    type: DataTypes.STRING(256),
    allowNull: false
  }
})

Users.hasMany(Collectables);
Collectables.belongsTo(Users);


module.exports = Collectables;