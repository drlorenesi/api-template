const request = require('supertest');
const app = require('../../app');

describe('API Endpoint /', () => {
  describe('GET /', () => {
    it('Return 200', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
    });
  });
});
