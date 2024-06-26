const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const TeamsModel = require('../models/Teams');

describe('Teams Model', () => {
  // Define una instancia del modelo en la base de datos
  const Teams = TeamsModel(sequelize);

  // Asegura que el modelo esté sincronizado con la base de datos
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  // Test para crear un nuevo equipo
  it('should create a new team', async () => {
    const newTeam = await Teams.create({
      nombre: 'Mercedes',
    });

    expect(newTeam.id).toBeDefined();
    expect(newTeam.nombre).toBe('Mercedes');
  });

  // Test para validar campo requerido
  it('should not allow null value for required field', async () => {
    let err;

    try {
      // Intenta crear un equipo sin nombre
      await Teams.create({});
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.name).toBe('SequelizeValidationError');
  });
});