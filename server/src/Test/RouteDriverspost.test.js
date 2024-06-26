const request = require('supertest');
const server = require('../server');
const db = require('../db');

describe('POST /createDriver', () => {
  it('should create a new driver', async () => {
    const newDriver = {
      forename: 'Lewis',
      surname: 'Hamilton',
      description: 'Seven-time Formula 1 World Champion',
      image: 'url_to_image',
      nationality: 'British',
      dob: '1985-01-07',
      teams: ['Mercedes'],
    };

    const response = await request(server)
      .post('/createDriver')
      .send(newDriver);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.forename).toBe(newDriver.forename);
    expect(response.body.surname).toBe(newDriver.surname);
  });
});