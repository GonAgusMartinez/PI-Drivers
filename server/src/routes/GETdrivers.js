const { Router } = require('express');
const { Driver, Teams } = require('../db');

const driversRouter = Router();

driversRouter.get('/', async (req, res) => {
  try {
    const drivers = await Driver.findAll({ include: Teams });
    res.json(drivers);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = driversRouter;