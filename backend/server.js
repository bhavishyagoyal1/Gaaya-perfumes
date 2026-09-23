'use strict';
// ============================================================
// server.js — Gaaya Perfumes Production Server
// Industry-grade: Security + Logging + DB + Rate Limiting
// ============================================================

// Load env variables FIRST before anything else
require('dotenv').config();

const express    = require('express');
const helmet     = require('helmet');
const cors       = require('cors');
const morgan     = require('morgan');
const compression = require('compression');
const path       = require('path');

const config     = require('./config');
const logger     = require('./logger');
const db         = require('./database');
const mailer     = require('./mailer');
const {
  generalLimiter,
  requestLogger,
  notFoundHandler,
  errorHandler,
  securityHeaders,
} = require('./middleware');

const contactRouter = require('./routes/contact');
const adminRouter   = require('./routes/admin');

// ============================================================
//  App Setup
// ============================================================
const app = express();

// ── Trust proxy (needed if behind Nginx/load balancer) ──
app.set('trust proxy', 1);

// ── Security Middleware (ORDER MATTERS) ──

// 1. Helmet — sets secure HTTP headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc:  ["'self'"],
      scriptSrc:   ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      styleSrc:    ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
      fontSrc:     ["'self'", "https://fonts.gstatic.com"],
      imgSrc:      ["'self'", "data:", "https:"],
      connectSrc:  ["'self'"],
      frameSrc:    ["'none'"],
      objectSrc:   ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false, // allow fonts to load
}));

// 2. Custom security headers
app.use(securityHeaders);

// 3. CORS — only allow your domain in production
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (config.isDev || config.cors.origins.includes(origin)) {
      return callback(null, true);
    }
    logger.warn('CORS blocked request', { origin });
    callback(new Error('Not allowed by CORS'));
  },
  methods:     ['GET', 'POST', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-admin-key'],
  credentials: false,
}));

// 4. Compression (gzip) — faster page loads
app.use(compression());

// 5. Body parsers with size limits (prevent large payload attacks)
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 6. HTTP request logging
app.use(morgan('combined', { stream: logger.stream }));
app.use(requestLogger);

// 7. General rate limiting on all routes
app.use('/api/', generalLimiter);

// ── Static Files ──
app.use(express.static(path.join(__dirname), {
  maxAge:   config.isProd ? '1d' : 0,   // cache static files in prod
  etag:     true,
  dotfiles: 'deny',                      // never serve .env etc.
}));

// ============================================================
//  API Routes
// ============================================================
app.use('/api/contact', contactRouter);
app.use('/api/admin',   adminRouter);

// Health check (public, no auth)
app.get('/api/health', (req, res) => {
  res.json({
    status:    'ok',
    company:   config.company.name,
    timestamp: new Date().toISOString(),
    uptime:    `${Math.floor(process.uptime())}s`,
  });
});

// ── SPA fallback — serve index.html for all non-API routes ──
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ── 404 and Error Handlers (must be last) ──
app.use(notFoundHandler);
app.use(errorHandler);

// ============================================================
//  Graceful Shutdown
// ============================================================
function gracefulShutdown(signal) {
  logger.info(`${signal} received — shutting down gracefully`);
  server.close(() => {
    logger.info('HTTP server closed');
    db.close();
    logger.info('Shutdown complete');
    process.exit(0);
  });
  // Force shutdown after 10 seconds
  setTimeout(() => {
    logger.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
}

// ============================================================
//  Unhandled Error Catching
// ============================================================
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION — shutting down', { error: err.message, stack: err.stack });
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error('UNHANDLED REJECTION', { reason: String(reason) });
  // Don't exit — just log it
});

// ============================================================
//  Start Server
// ============================================================
// Declare OUTSIDE so gracefulShutdown() can access it
let server;

async function start() {
  try {
    // Initialize database
    await db.initialize();

    // Verify email service (non-blocking — don't let it prevent server start)
    mailer.verifyConnection().catch(() => {});

    // Start HTTP server — bind to 0.0.0.0 so Render/cloud hosts can detect the port
    const HOST = '0.0.0.0';
    server = app.listen(config.port, HOST, () => {  // ← no const/let here
      logger.info('═'.repeat(50));
      logger.info('  GAAYA PERFUMES — Production Server Started');
      logger.info('═'.repeat(50));
      logger.info(`  URL:     http://localhost:${config.port}`);
      logger.info(`  ENV:     ${config.env}`);
      logger.info(`  DB:      ${config.db.path}`);
      logger.info(`  Logs:    ${config.logging.dir}`);
      logger.info('═'.repeat(50));
    });

    // Attach shutdown handlers
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT',  () => gracefulShutdown('SIGINT'));

    // ── Auto backup every 24 hours (production only) ──
    if (config.isProd) {
      const { execFile } = require('child_process');
      setInterval(() => {
        execFile('node', ['backup.js'], { cwd: __dirname }, (err) => {
          if (err) logger.error('Auto backup failed', { error: err.message });
          else     logger.info('Auto backup completed successfully');
        });
      }, 24 * 60 * 60 * 1000);
      logger.info('Auto backup scheduled — every 24 hours');
    }

    // ── Keep-Alive Self-Ping (prevents Render free-tier spindown) ──
    const KEEP_ALIVE_URL = process.env.RENDER_EXTERNAL_URL || process.env.BACKEND_URL;
    if (KEEP_ALIVE_URL) {
      const PING_INTERVAL = 13 * 60 * 1000; // 13 minutes (under Render's 15-min timeout)
      setInterval(async () => {
        try {
          const url = `${KEEP_ALIVE_URL}/api/health`;
          const https = require('https');
          const http  = require('http');
          const mod   = url.startsWith('https') ? https : http;
          mod.get(url, (res) => {
            res.resume(); // consume response to free memory
            logger.info('Keep-alive ping successful', { status: res.statusCode });
          }).on('error', (err) => {
            logger.warn('Keep-alive ping failed', { error: err.message });
          });
        } catch (err) {
          logger.warn('Keep-alive ping error', { error: err.message });
        }
      }, PING_INTERVAL);
      logger.info(`Keep-alive enabled — pinging ${KEEP_ALIVE_URL} every 13 minutes`);
    } else {
      logger.info('Keep-alive disabled — set RENDER_EXTERNAL_URL or BACKEND_URL to enable');
    }

  } catch (err) {
    logger.error('Failed to start server', { error: err.message });
    process.exit(1);
  }
}

start();
module.exports = app;