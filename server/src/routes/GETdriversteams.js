const { Router } = require('express');
const { Teams } = require('../db');

const teamsRouter = Router();

teamsRouter.get('/', async (req, res) => {
  try {
    const teams = await Teams.findAll();
    res.json(teams);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = teamsRouter;