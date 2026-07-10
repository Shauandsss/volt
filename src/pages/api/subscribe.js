import dotenv from 'dotenv';
import { Pool } from 'pg';

// Load env variables for dev
dotenv.config({ path: '.env.local' });

// Rate limiting: simple in-memory store (consider using Redis in production)
const rateLimitStore = new Map();

const getRateLimitKey = (ip) => `rate-limit:${ip}`;
const MAX_REQUESTS = 5;
const TIME_WINDOW = 60 * 60 * 1000; // 1 hour

const isRateLimited = (ip) => {
  const key = getRateLimitKey(ip);
  const now = Date.now();
  const data = rateLimitStore.get(key) || { count: 0, resetTime: now + TIME_WINDOW };

  if (now > data.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + TIME_WINDOW });
    return false;
  }

  if (data.count >= MAX_REQUESTS) {
    return true;
  }

  data.count++;
  return false;
};

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export async function POST({ request }) {
  const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

  // Check rate limit
  if (isRateLimited(clientIp)) {
    return new Response(JSON.stringify({ error: 'Too many requests' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { email, utm_source, utm_medium, utm_campaign } = body;

    // Validate honeypot (if it's in the body, reject)
    if (body.website) {
      return new Response(JSON.stringify({ error: 'Invalid submission' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate email
    if (!email || !validateEmail(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Connect to Postgres
    const pool = new Pool({
      connectionString: process.env.POSTGRES_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    // Insert email; the waitlist position ("unit #") is the row's place in line
    try {
      const inserted = await pool.query(
        `INSERT INTO leads (email, utm_source, utm_medium, utm_campaign)
         VALUES ($1, $2, $3, $4)
         RETURNING id`,
        [email, utm_source || null, utm_medium || null, utm_campaign || null]
      );

      const unitRow = await pool.query(
        `SELECT COUNT(*)::int AS unit FROM leads WHERE id <= $1`,
        [inserted.rows[0].id]
      );

      await pool.end();

      return new Response(JSON.stringify({ success: true, unit: unitRow.rows[0].unit }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (dbError) {
      // Handle duplicate email (constraint violation)
      if (dbError.code === '23505') {
        // Return 409 Conflict but treat as success (per spec) — with their original place in line
        let unit = null;
        try {
          const existing = await pool.query(
            `SELECT (SELECT COUNT(*)::int FROM leads b WHERE b.id <= a.id) AS unit
             FROM leads a WHERE a.email = $1`,
            [email]
          );
          if (existing.rows[0]) unit = existing.rows[0].unit;
        } catch (lookupError) {
          // fall through with unit: null
        }
        await pool.end();

        return new Response(JSON.stringify({ success: true, duplicate: true, unit }), {
          status: 409,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      await pool.end();
      throw dbError;
    }
  } catch (error) {
    console.error('Subscribe error:', error);

    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
