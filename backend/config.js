'use strict';
// ============================================================
// config.js — Centralized Configuration
// All environment variables validated and loaded here
// ============================================================

require('dotenv').config();

function required(key) {
  const val = process.env[key];
  if (!val) {
    console.error(`❌  Missing required environment variable: ${key}`);
    console.error(`    Copy .env.example to .env and fill in all values.`);
    process.exit(1);
  }
  return val;
}

function optional(key, fallback) {
  return process.env[key] || fallback;
}

const config = {
  // ── Environment ──
  env:          optional('NODE_ENV', 'development'),
  isProd:       optional('NODE_ENV', 'development') === 'production',
  isDev:        optional('NODE_ENV', 'development') === 'development',
  port:         parseInt(optional('PORT', '3000'), 10),

  // ── Email ──
  email: {
    user:      required('EMAIL_USER'),
    pass:      required('EMAIL_PASS'),
    to:        required('EMAIL_TO'),
    fromName:  optional('EMAIL_FROM_NAME', 'Gaaya Perfumes Website'),
  },

  // ── Security ──
  security: {
    jwtSecret:  required('JWT_SECRET'),
    adminKey:   required('ADMIN_KEY'),
  },

  // ── Rate Limiting ──
  rateLimit: {
    windowMs:       parseInt(optional('RATE_LIMIT_WINDOW_MS', '900000'), 10), // 15 min
    max:            parseInt(optional('RATE_LIMIT_MAX', '100'), 10),
    contactMax:     parseInt(optional('CONTACT_RATE_LIMIT_MAX', '5'), 10),    // 5 per 15min per IP
  },

  // ── Database ──
db: {
  path:        optional('DB_PATH', './data/gaaya.db'),
  mongoUri:    optional('MONGODB_URI', ''),
},

  // ── Logging ──
  logging: {
    level:  optional('LOG_LEVEL', 'info'),
    dir:    optional('LOG_DIR', './logs'),
  },

  // ── CORS ──
  cors: {
    origins: optional('ALLOWED_ORIGINS', 'http://localhost:3000').split(',').map(o => o.trim()),
  },

  // ── Company Info ──
  company: {
    name:    'Gaaya Perfumes Private Limited',
    address: 'Plot No. G1 655, RIICO Industrial Area, Khushkhera, Tapukara, Tizara, Alwar, Rajasthan — 301707',
    email:   'info@gaayaperfumes.com',
    phone:   '',
    website: 'https://gaayaperfumes.com',
  },
};

module.exports = config;
