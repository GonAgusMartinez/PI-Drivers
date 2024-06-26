const request = require('supertest');
const server = require('../server');
const db = require('../db');

describe('GET /drivers', () => {
  it('should respond with an array of drivers', async () => {
    const response = await request(server).get('/drivers');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});