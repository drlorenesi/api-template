const request = require('supertest');
const app = require('../../app');

const validUpdate = {
  description: 'Update Bug',
  userId: 1,
  resolved: true,
};

const invalidUpdate = {
  descriptions: 'Update Bug',
  user: 1,
  resolved: 'yes',
};

const validBug = {
  description: 'Test Bug',
  userId: 1,
  resolved: false,
};

const invalidBug = {
  unvalidProperty: 'Shoul not work',
};

describe('API Endpoint - /api/bugs', () => {
  describe('GET /api/bugs', () => {
    it('- should return 200', async () => {
      const response = await request(app).get('/api/bugs');
      expect(response.statusCode).toBe(200);
    });
  });
  describe('GET /api/bugs/:id', () => {
    it('- should return 200 if bug exists', async () => {
      const response = await request(app).get('/api/bugs/1');
      expect(response.statusCode).toBe(200);
    });
    it('- should return 404 if bug is not found', async () => {
      const response = await request(app).get('/api/bugs/xyz');
      expect(response.statusCode).toBe(404);
    });
  });
  describe('PUT /api/bugs/:id', () => {
    it('- should return 404 if bug is not found', async () => {
      const response = await request(app).get('/api/bugs/xyz');
      expect(response.statusCode).toBe(404);
    });
    it('- should return 400 if invalid update info is passed in', async () => {
      const response = await request(app)
        .put('/api/bugs/1')
        .send(invalidUpdate);
      expect(response.statusCode).toBe(400);
    });
    it('- should return 200 if valid update info is passed in', async () => {
      const response = await request(app).put('/api/bugs/1').send(validUpdate);
      expect(response.statusCode).toBe(200);
    });
  });
  describe('POST /api/bugs', () => {
    it('- should return 201 if valid bug is added', async () => {
      const response = await request(app).post('/api/bugs').send(validBug);
      expect(response.statusCode).toBe(201);
    });
  });
  describe('POST /api/bugs', () => {
    it('- should return 400 if invalid bug info is passed in', async () => {
      const response = await request(app).post('/api/bugs').send(invalidBug);
      expect(response.statusCode).toBe(400);
    });
  });
  describe('DELETE /api/bugs:id', () => {
    it('- should return 404 if bug is not found', async () => {
      const response = await request(app).delete('/api/bugs/xyz');
      expect(response.statusCode).toBe(404);
    });
    it('- should return 200 if bug is succesfully deleted', async () => {
      const response = await request(app).delete('/api/bugs/1');
      expect(response.statusCode).toBe(200);
    });
  });
});
