const request = require('supertest');
const app = require('../../app');
const db = require('../../startup/db');

const invalidAccount = {
  unvalidProperty: 'Shoul not work',
};

const validAccount = {
  firstName: 'John',
  lastName: 'Test',
  email: 'john@test.com',
  password: '12345',
};

describe('API Endpoint - /api/register', () => {
  afterAll(async () => {
    await db.query('DELETE FROM accounts WHERE email = $1', [
      validAccount.email,
    ]);
    db.end();
  });
  describe('POST /api/register', () => {
    it('- should return 400 if invalid account info is passed in', async () => {
      const response = await request(app)
        .post('/api/register')
        .send(invalidAccount);
      expect(response.statusCode).toBe(400);
    });
    describe('POST /api/register', () => {
      it('- should return 201 if a valid account was added', async () => {
        const response = await request(app)
          .post('/api/register')
          .send(validAccount);
        insertId = response.body.user_id;
        expect(response.statusCode).toBe(201);
      });
    });
  });
});
