const request = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../../app');
const db = require('../../startup/db');
const generateAuthToken = require('../../utils/generateAuthToken');

let salt = null;

const validAccount = {
  firstName: 'John',
  lastName: 'Test',
  email: 'john@logintest.com',
  password: '12345',
};

const invalidLogin = {
  email: 'john@logintest.com',
  password: '1234',
};

const validLogin = {
  email: 'john@logintest.com',
  password: '12345',
};

describe('API Endpoint - /api/login', () => {
  beforeAll(async () => {
    await request(app).post('/api/login').send(validAccount);
  });
  afterAll(async () => {
    await db.query('DELETE FROM accounts WHERE email = $1', [email]);
    db.end();
  });
  describe('POST /api/login', () => {
    it('- should return 400 if invalid account info was entered', async () => {
      const response = await request(app).post('/api/login').send(invalidLogin);
      expect(response.statusCode).toBe(400);
    });
    it('- should return 200 and token if a valid account was entered', async () => {
      const response = await request(app).post('/api/login').send(validLogin);
      // expect(response.headers['x-auth-token']).toEqual(token);
      console.log(response);
      expect(response.statusCode).toBe(200);
    });
  });
});
