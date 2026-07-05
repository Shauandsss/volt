require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
});

(async () => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM leads ORDER BY created_at DESC LIMIT 5');
    client.release();
    await pool.end();

    console.log('Recent leads:');
    if (result.rows.length === 0) {
      console.log('  (no leads yet)');
    } else {
      result.rows.forEach((row) => {
        console.log(`  - ${row.email} (${row.created_at})`);
      });
    }
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
