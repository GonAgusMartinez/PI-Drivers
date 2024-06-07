const { Router } = require('express');
const driversRouter = require('../routes/GETdrivers');
const driverByIdRouter = require('../routes/GETdriversid');
const driverByNameRouter = require('../routes/GETdriversname');
const teamsRouter = require('../routes/GETdriversteams');
const createDriverRouter = require('../routes/POSTdrivers');

const router = Router();

router.use('/drivers', driversRouter);
router.use('/driver', driverByIdRouter);
router.use('/driver', driverByNameRouter);
router.use('/teams', teamsRouter);
router.use('/createDriver', createDriverRouter);

module.exports = router;