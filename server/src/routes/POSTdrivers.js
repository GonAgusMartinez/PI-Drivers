const { Router } = require('express');
const { Driver, Teams } = require('../db');

const createDriverRouter = Router();

createDriverRouter.post('/', async (req, res) => {
  const { forename, surname, description, image, nationality, dob, teams } = req.body;
  try {
    const newDriver = await Driver.create({
      name: {
        forename,
        surname
      },
      description,
      image,
      nationality,
      dob,
    });

    if (teams && teams.length > 0) {
      const teamsInstances = await Teams.findAll({ where: { name: teams } });
      await newDriver.addTeams(teamsInstances);
    }

    res.status(201).json(newDriver);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = createDriverRouter;