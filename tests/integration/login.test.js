const request = require('supertest');
const app = require('../../app');
const db = require('../../startup/db');

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
    await request(app).post('/api/register').send(validAccount);
  });
  afterAll(async () => {
    await db.query('DELETE FROM users WHERE email = $1', [validAccount.email]);
    await db.end();
  });
  describe('POST /api/login', () => {
    it('- should return 400 and no x-auth-token if invalid account info was entered', async () => {
      const response = await request(app).post('/api/login').send(invalidLogin);
      expect(response.header).not.toHaveProperty('x-auth-token');
      expect(response.statusCode).toBe(400);
    });
    it('- should return 200 and x-auth-token if a valid account was entered', async () => {
      const response = await request(app).post('/api/login').send(validLogin);
      expect(response.header).toHaveProperty('x-auth-token');
      expect(response.status).toBe(200);
    });
  });
});
