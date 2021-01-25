require('dotenv').config(); // Required to run test
const db = require('../../startup/db');

describe('DB connection test', () => {
  it('- should connect to the database and run a simple query', async () => {
    const result = await db.query('SELECT 1');
    expect(result.rowCount).toEqual(1);
  });
});
