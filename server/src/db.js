require("dotenv").config();
const { Sequelize } = require("sequelize");
const DriverModel = require('./models/Driver');
const TeamsModel = require('./models/Teams');

const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/drivers`, {
  logging: false, 
  native: false, 
});

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const modelDefiner = require(path.join(__dirname, '/models', file));
    modelDefiner(sequelize);
  });

const { Driver, Teams } = sequelize.models;

Driver.belongsToMany(Teams, { through: 'DriverTeams' });
Teams.belongsToMany(Driver, { through: 'DriverTeams' });

module.exports = sequelize;