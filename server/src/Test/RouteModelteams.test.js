const request = require('supertest');
const sequelize = require('../db');
const server = require('../server');
const { Driver, Teams } = sequelize.models;

describe('Teams Model', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a new team', async () => {
    const newTeam = await Teams.create({
      nombre: 'Mercedes AMG',
    });

    expect(newTeam.id).toBeDefined();
    expect(newTeam.nombre).toBe('Mercedes AMG');
  });

  it('should not allow null values for required fields', async () => {
    let err;

    try {
      await Teams.create({});
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.name).toBe('SequelizeValidationError');
  });
});