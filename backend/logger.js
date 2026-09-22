'use strict';
// ============================================================
// logger.js — Production Logging with Winston
// Logs to console (dev) + rotating files (prod)
// ============================================================

const winston                = require('winston');
const DailyRotateFile        = require('winston-daily-rotate-file');
const path                   = require('path');
const fs                     = require('fs');
const config                 = require('./config');

// Ensure logs directory exists
if (!fs.existsSync(config.logging.dir)) {
  fs.mkdirSync(config.logging.dir, { recursive: true });
}

// ── Custom log format ──
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
    let log = `[${timestamp}] ${level.toUpperCase().padEnd(5)} ${message}`;
    if (Object.keys(meta).length) log += ` ${JSON.stringify(meta)}`;
    if (stack) log += `\n${stack}`;
    return log;
  })
);

// ── Transports ──
const transports = [];

// Console (always on in dev, errors only in prod)
transports.push(
  new winston.transports.Console({
    level: config.isDev ? 'debug' : 'warn',
    format: winston.format.combine(
      winston.format.colorize(),
      logFormat
    ),
  })
);

// Rotating file — all logs
transports.push(
  new DailyRotateFile({
    filename:      path.join(config.logging.dir, 'app-%DATE%.log'),
    datePattern:   'YYYY-MM-DD',
    zippedArchive: true,
    maxSize:       '20m',
    maxFiles:      '30d',  // keep 30 days
    level:         config.logging.level,
    format:        logFormat,
  })
);

// Rotating file — errors only
transports.push(
  new DailyRotateFile({
    filename:      path.join(config.logging.dir, 'error-%DATE%.log'),
    datePattern:   'YYYY-MM-DD',
    zippedArchive: true,
    maxSize:       '20m',
    maxFiles:      '90d',  // keep 90 days for errors
    level:         'error',
    format:        logFormat,
  })
);

const logger = winston.createLogger({
  level:       config.logging.level,
  transports,
  exitOnError: false,
});

// HTTP request logger stream (for Morgan)
logger.stream = {
  write: (message) => logger.http(message.trim()),
};

module.exports = logger;
