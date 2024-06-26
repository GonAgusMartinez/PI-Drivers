const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const DriverModel = require('../models/Driver');

describe('Driver Model', () => {
  // Define una instancia del modelo en la base de datos
  const Driver = DriverModel(sequelize);

  // Asegura que el modelo esté sincronizado con la base de datos
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  // Test para crear un nuevo driver
  it('should create a new driver', async () => {
    const newDriver = await Driver.create({
      name: 'Lewis',
      surname: 'Hamilton',
      description: 'Seven-time Formula 1 World Champion',
      image: 'url_to_image',
      nationality: 'British',
      dob: '1985-01-07',
    });

    expect(newDriver.id).toBeDefined();
    expect(newDriver.name).toBe('Lewis');
    expect(newDriver.surname).toBe('Hamilton');
    expect(newDriver.description).toBe('Seven-time Formula 1 World Champion');
    expect(newDriver.image).toBe('url_to_image');
    expect(newDriver.nationality).toBe('British');
    expect(newDriver.dob).toBe('1985-01-07');
  });

  // Test para validar campos requeridos
  it('should not allow null values for required fields', async () => {
    let err;

    try {
      // Intenta crear un driver sin nombre
      await Driver.create({
        surname: 'Hamilton',
        nationality: 'British',
        dob: '1985-01-07',
      });
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.name).toBe('SequelizeValidationError');
  });
});