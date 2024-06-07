const { Router } = require('express');
const { Driver, Teams } = require('../db');

const driverByNameRouter = Router();

driverByNameRouter.get('/name/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const driver = await Driver.findOne({
      where: { name },
      include: Teams,
    });
    if (driver) {
      res.json(driver);
    } else {
      res.status(404).send('Driver not found');
    }
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = driverByNameRouter;