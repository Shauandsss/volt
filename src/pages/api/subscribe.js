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

    // Insert email
    try {
      await pool.query(
        `INSERT INTO leads (email, utm_source, utm_medium, utm_campaign)
         VALUES ($1, $2, $3, $4)`,
        [email, utm_source || null, utm_medium || null, utm_campaign || null]
      );

      await pool.end();

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (dbError) {
      await pool.end();

      // Handle duplicate email (constraint violation)
      if (dbError.code === '23505') {
        // Return 409 Conflict but treat as success (per spec)
        return new Response(JSON.stringify({ success: true, duplicate: true }), {
          status: 409,
          headers: { 'Content-Type': 'application/json' },
        });
      }

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
