require('dotenv').config(); // Required to run test
const pool = require('../../startup/db');

let db;

describe('DB connection test', () => {
  beforeAll(async () => {
    db = await pool.connect();
  });
  afterAll(async () => {
    db.end();
  });
  it('should connect to the database', async () => {
    expect(db._connected).toEqual(true);
  });
});
