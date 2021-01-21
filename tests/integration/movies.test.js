const request = require('supertest');
const app = require('../../app');

const invalidMovie = {
  unvalidProperty: 'Shoul not work',
};

const validMovie = {
  title: 'Test Movie',
  numberInStock: 1,
  dailyRentalRate: 1.0,
  genreId: 1,
};

const validUpdate = {
  title: 'Updated Movie Title',
  numberInStock: 2,
  dailyRentalRate: 2.99,
  genreId: 2,
};

const invalidUpdate = {
  title: 'U',
  numberInStock: -1,
  dailyRentalRate: 'a',
  genreId: false,
};

let insertId = null;

describe('API Endpoint - /api/movies', () => {
  // Insert movie to test
  describe('POST /api/movies', () => {
    it('- should return 400 if invalid movie info is passed in', async () => {
      const response = await request(app)
        .post('/api/movies')
        .send(invalidMovie);
      expect(response.statusCode).toBe(400);
    });
  });
  describe('POST /api/movies', () => {
    it('- should return 201 if valid movie is added', async () => {
      const response = await request(app).post('/api/movies').send(validMovie);
      insertId = response.body.movie_id;
      expect(response.statusCode).toBe(201);
    });
  });
  // Get movies
  describe('GET /api/movies', () => {
    it('- should return 200', async () => {
      const response = await request(app).get('/api/movies');
      expect(response.statusCode).toBe(200);
    });
  });
  describe('GET /api/movies/:id', () => {
    it('- should return 200 if movie exists', async () => {
      const response = await request(app).get(`/api/movies/${insertId}`);
      expect(response.statusCode).toBe(200);
    });
    it('- should return 404 if movie is not found', async () => {
      const response = await request(app).get('/api/movies/0');
      expect(response.statusCode).toBe(404);
    });
  });
  // Update a movie
  // describe('PUT /api/movies/:id', () => {
  //   it('- should return 404 if movie is not found', async () => {
  //     const response = await request(app).get('/api/movies/0');
  //     expect(response.statusCode).toBe(404);
  //   });
  //   it('- should return 400 if invalid update info is passed in', async () => {
  //     const response = await request(app)
  //       .put('/api/movies/1')
  //       .send(invalidUpdate);
  //     expect(response.statusCode).toBe(400);
  //   });
  //   it('- should return 200 if valid update info is passed in', async () => {
  //     const response = await request(app)
  //       .put('/api/movies/1')
  //       .send(validUpdate);
  //     expect(response.statusCode).toBe(200);
  //   });
  // });
  // Delete a movie
  describe('DELETE /api/movies/:id', () => {
    it('- should return 404 if movie is not found', async () => {
      const response = await request(app).delete('/api/movies/0');
      expect(response.statusCode).toBe(404);
    });
    it('- should return 200 if movie is succesfully deleted', async () => {
      const response = await request(app).delete(`/api/movies/${insertId}`);
      expect(response.statusCode).toBe(200);
    });
  });
});
