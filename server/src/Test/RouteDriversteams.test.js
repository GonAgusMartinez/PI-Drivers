const request = require('supertest');
const server = require('../server');
const db = require('../db');

describe('GET /teams', () => {
  it('should respond with an array of teams', async () => {
    const response = await request(server).get('/teams');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});