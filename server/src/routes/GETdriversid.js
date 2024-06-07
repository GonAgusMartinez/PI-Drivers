const { Router } = require('express');
const { Driver, Teams } = require('../db');

const driverByIdRouter = Router();

driverByIdRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const driver = await Driver.findByPk(id, { include: Teams });
    if (driver) {
      res.json(driver);
    } else {
      res.status(404).send('Driver not found');
    }
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = driverByIdRouter;