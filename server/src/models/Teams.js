const { DataTypes } = require('sequelize');
const sequelize = require('../db');

module.exports = (sequelize) => {
  sequelize.define('Teams', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
}