# Volt Landing Page — Setup Guide

## 1. Install dependencies

```bash
npm install
```

## 2. Set up Vercel Postgres

### 2a. Create the database in Vercel dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your **volt** project
3. Go to **Storage** tab
4. Click **Create Database** → **Postgres**
5. Name it `volt-leads` (or your preferred name)
6. Vercel will automatically add `POSTGRES_URL` to your environment variables

### 2b. Create the table

In the Vercel Postgres console (inside the Storage tab), run:

```sql
CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  utm_source VARCHAR(255),
  utm_medium VARCHAR(255),
  utm_campaign VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 2c. Get your connection string locally

1. In Vercel dashboard → Storage → your postgres database
2. Click **Connect** → **Show secret**
3. Copy the `POSTGRES_URL`
4. Create a `.env.local` file in the root of this project:

```bash
POSTGRES_URL=postgresql://user:password@host/dbname
```

## 3. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000` and test the form.

## 4. Deploy to Vercel

```bash
git push
```

Vercel will automatically:
- Build the Astro site
- Deploy to your project
- Use the `POSTGRES_URL` environment variable (already set in your project)
- Enable Vercel Web Analytics by default

## Form behavior

- Email is required and validated client-side + server-side
- Honeypot field rejects spam bots
- Rate limiting: 5 requests per IP per hour
- Duplicate emails: return 409 but show success (per spec)
- UTM params (`utm_source`, `utm_medium`, `utm_campaign`) are captured from the URL and stored with the email
- Success state shows the timestamp when the lead was recorded

## Analytics

Vercel Web Analytics is enabled by default. Events tracked:
- `scroll_50` — user scrolled to 50% of page
- `scroll_100` — user scrolled to 100% of page
- `form_focus` — user focused on email input
- `lead_submit` — user submitted the form

Check events in Vercel dashboard → Analytics.

## Watch image

The product image placeholder is in Section 3. Replace the text `[Product image: Volt watch — retro white case, mono LCD screen]` with:

```html
<img src="/images/volt-watch.webp" alt="Volt watch" loading="lazy" />
```

Then add your watch render to `public/images/volt-watch.webp`.

## Fonts

Self-hosted fonts are loaded from `public/fonts/`:
- `instrument-serif-regular.woff2`
- `ibm-plex-mono-regular.woff2`

Add these font files to the public folder if they're not already there, or the site will fail to load them.
