require('dotenv').config({ path: '.env.local' });

const { Pool } = require('pg');

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  console.error('✗ Error: POSTGRES_URL environment variable is not set');
  console.error('Make sure .env.local exists and contains POSTGRES_URL');
  process.exit(1);
}

console.log('Using connection string:', connectionString.substring(0, 30) + '...');

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function initDb() {
  try {
    console.log('Connecting to Postgres...');

    const client = await pool.connect();
    console.log('✓ Connected');

    console.log('Creating leads table...');

    await client.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        utm_source VARCHAR(255),
        utm_medium VARCHAR(255),
        utm_campaign VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log('✓ Table created (or already exists)');

    // Create index on email for faster lookups
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
    `);

    console.log('✓ Index created');

    client.release();
    await pool.end();

    console.log('\n✓ Database initialized successfully');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

initDb();
