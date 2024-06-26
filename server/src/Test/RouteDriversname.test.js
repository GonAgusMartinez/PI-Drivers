const request = require('supertest');
const server = require('../server');
const db = require('../db');

describe('GET /driver/name/:name', () => {
  it('should respond with a driver object', async () => {
    const response = await request(server).get('/driver/name/Alonso');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('forename');
    expect(response.body).toHaveProperty('surname');
  });

  it('should respond with 404 if driver does not exist', async () => {
    const response = await request(server).get('/driver/name/UnknownDriver');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Driver not found');
  });
});