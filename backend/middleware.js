'use strict';
// ============================================================
// middleware.js — All Security & Validation Middleware
// ============================================================

const rateLimit       = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const config          = require('./config');
const logger          = require('./logger');

// ── Rate Limiter: General API ──
const generalLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,   // 15 minutes
  max:      config.rateLimit.max,        // 100 requests per window
  message: {
    error: 'Too many requests from this IP. Please try again in 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders:   false,
  handler: (req, res, next, options) => {
    logger.warn('Rate limit exceeded', { ip: req.ip, path: req.path });
    res.status(429).json(options.message);
  },
});

// ── Rate Limiter: Contact Form (strict) ──
const contactLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,    // 15 minutes
  max:      config.rateLimit.contactMax,  // only 5 submissions per 15 min per IP
  message: {
    error: 'Too many enquiries submitted. Please wait 15 minutes before trying again.'
  },
  standardHeaders: true,
  legacyHeaders:   false,
  keyGenerator: (req) => req.ip,
  handler: (req, res, next, options) => {
    logger.warn('Contact rate limit exceeded', { ip: req.ip });
    res.status(429).json(options.message);
  },
});

// ── Rate Limiter: Admin ──
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 min
  max:      20,
  message:  { error: 'Too many admin requests.' },
  standardHeaders: true,
  legacyHeaders:   false,
});

// ── Contact Form Validation Rules ──
const contactValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s\u0900-\u097F'-]+$/)
    .withMessage('Name contains invalid characters'),

  body('company')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 200 })
    .withMessage('Company name too long'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .isLength({ max: 254 })
    .withMessage('Email too long'),

  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^[+\d\s\-().]{7,20}$/)
    .withMessage('Please provide a valid phone number'),

  body('product')
    .optional({ checkFalsy: true })
    .trim()
    .isIn([
      '',
      'Fragrance Development',
      'Formulation',
      'Private Label Manufacturing',
      'Contract Manufacturing',
      'Sampling & Refinement',
      'Full Project (Brief to Bottle)',
    ])
    .withMessage('Invalid product selection'),

body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),

  // Honeypot — captcha for bots
  body('website').optional({ checkFalsy: false }),
];

// ── Validation result handler ──
function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(e => e.msg);
    logger.warn('Validation failed', { ip: req.ip, errors: errorMessages });
    return res.status(422).json({
      error:  'Validation failed',
      errors: errorMessages,
    });
  }
  next();
}

// ── Request logger middleware ──
function requestLogger(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const level = res.statusCode >= 500 ? 'error'
                : res.statusCode >= 400 ? 'warn'
                : 'http';
    logger[level](`${req.method} ${req.path} ${res.statusCode} ${duration}ms`, {
      ip:     req.ip,
      ua:     req.headers['user-agent']?.substring(0, 80),
    });
  });
  next();
}

// ── 404 handler ──
function notFoundHandler(req, res) {
  logger.warn('404 Not Found', { path: req.path, ip: req.ip });
  res.status(404).json({ error: 'Route not found' });
}

// ── Global error handler ──
function errorHandler(err, req, res, next) {
  logger.error('Unhandled error', {
    message:  err.message,
    stack:    err.stack,
    path:     req.path,
    method:   req.method,
    ip:       req.ip,
  });

  // Don't leak error details in production
  const message = config.isProd
    ? 'An unexpected error occurred. Please try again.'
    : err.message;

  res.status(err.status || 500).json({ error: message });
}

// ── Security headers middleware (additional to helmet) ──
function securityHeaders(req, res, next) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  // Remove server info
  res.removeHeader('X-Powered-By');
  next();
}

module.exports = {
  generalLimiter,
  contactLimiter,
  adminLimiter,
  contactValidation,
  handleValidation,
  requestLogger,
  notFoundHandler,
  errorHandler,
  securityHeaders,
};
