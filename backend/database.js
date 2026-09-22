'use strict';
// ══════════════════════════════════════════════════════════
// database.js — MongoDB Atlas + Local SQLite fallback
// Uses MongoDB when MONGODB_URI is set in .env
// Falls back to local SQLite if MongoDB not configured
// ══════════════════════════════════════════════════════════

const config = require('./config');
const logger = require('./logger');

let usesMongo = false;
let Enquiry;  // Mongoose model

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  INITIALIZE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
async function initialize() {
  if (config.db.mongoUri) {
    await initMongoDB();
  } else {
    await initSQLite();
  }
}

// ── MongoDB Setup ──
async function initMongoDB() {
  try {
    const mongoose = require('mongoose');

    // Connect to MongoDB Atlas
    await mongoose.connect(config.db.mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    logger.info('MongoDB Atlas connected');

    // Define Enquiry Schema
    const enquirySchema = new mongoose.Schema({
      id:          { type: String, required: true, unique: true },
      name:        { type: String, required: true },
      company:     { type: String, default: '' },
      email:       { type: String, required: true },
      phone:       { type: String, default: '' },
      product:     { type: String, default: '' },
      message:     { type: String, required: true },
      ip_address:  { type: String, default: '' },
      user_agent:  { type: String, default: '' },
      status:      { type: String, default: 'new', enum: ['new', 'read', 'replied', 'closed'] },
      email_sent:  { type: Boolean, default: false },
      created_at:  { type: Date, default: Date.now },
      updated_at:  { type: Date, default: Date.now },
    }, {
      // Add index for faster queries
      indexes: [
        { email: 1 },
        { status: 1 },
        { created_at: -1 },
      ]
    });

    // Create model
    Enquiry   = mongoose.model('Enquiry', enquirySchema);
    usesMongo = true;

    logger.info('Database schema ready', { type: 'mongodb' });

  } catch (err) {
    logger.error('MongoDB connection failed — falling back to SQLite', { error: err.message });
    await initSQLite();
  }
}

// ── SQLite Fallback Setup ──
let sqliteDB;
async function initSQLite() {
  const sqlite3 = require('sqlite3').verbose();
  const path    = require('path');
  const fs      = require('fs');

  const dataDir = path.dirname(config.db.path);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  sqliteDB = new sqlite3.Database(config.db.path);
  sqliteDB.run('PRAGMA journal_mode = WAL');

  await new Promise((resolve, reject) => {
    sqliteDB.exec(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id          TEXT PRIMARY KEY,
        name        TEXT NOT NULL,
        company     TEXT DEFAULT '',
        email       TEXT NOT NULL,
        phone       TEXT DEFAULT '',
        product     TEXT DEFAULT '',
        message     TEXT NOT NULL,
        ip_address  TEXT DEFAULT '',
        user_agent  TEXT DEFAULT '',
        status      TEXT DEFAULT 'new',
        email_sent  INTEGER DEFAULT 0,
        created_at  TEXT NOT NULL,
        updated_at  TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_email  ON enquiries(email);
      CREATE INDEX IF NOT EXISTS idx_status ON enquiries(status);
    `, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  usesMongo = false;
  logger.info('Local SQLite database connected', { path: config.db.path });
  logger.info('Database schema ready', { type: 'sqlite' });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ENQUIRY OPERATIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── Save new enquiry ──
async function saveEnquiry(enquiry) {
  const now = new Date().toISOString();

  if (usesMongo) {
    await Enquiry.create({
      id:         enquiry.id,
      name:       enquiry.name,
      company:    enquiry.company   || '',
      email:      enquiry.email,
      phone:      enquiry.phone     || '',
      product:    enquiry.product   || '',
      message:    enquiry.message,
      ip_address: enquiry.ipAddress || '',
      user_agent: enquiry.userAgent || '',
      created_at: now,
      updated_at: now,
    });
  } else {
    await sqliteRun(
      `INSERT INTO enquiries
         (id,name,company,email,phone,product,message,
          ip_address,user_agent,status,email_sent,created_at,updated_at)
       VALUES (?,?,?,?,?,?,?,?,?,'new',0,?,?)`,
      [
        enquiry.id, enquiry.name, enquiry.company || '',
        enquiry.email, enquiry.phone || '', enquiry.product || '',
        enquiry.message, enquiry.ipAddress || '', enquiry.userAgent || '',
        now, now,
      ]
    );
  }

  logger.info('Enquiry saved', {
    id:    enquiry.id,
    email: enquiry.email,
    db:    usesMongo ? 'mongodb' : 'sqlite',
  });
}

// ── Mark email sent ──
async function markEmailSent(id) {
  if (usesMongo) {
    await Enquiry.findOneAndUpdate(
      { id },
      { email_sent: true, updated_at: new Date() }
    );
  } else {
    await sqliteRun(
      'UPDATE enquiries SET email_sent=1, updated_at=? WHERE id=?',
      [new Date().toISOString(), id]
    );
  }
}

// ── Get enquiries (paginated) ──
async function getEnquiries({ page = 1, limit = 20, status = null } = {}) {
  const skip = (page - 1) * limit;

  if (usesMongo) {
    const filter = status ? { status } : {};
    const [enquiries, total] = await Promise.all([
      Enquiry.find(filter).sort({ created_at: -1 }).skip(skip).limit(limit).lean(),
      Enquiry.countDocuments(filter),
    ]);
    return { enquiries, total, page, limit };
  } else {
    const where    = status ? 'WHERE status=?' : '';
    const params   = status ? [status] : [];
    const rows     = await sqliteAll(
      `SELECT * FROM enquiries ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, skip]
    );
    const total    = await sqliteGet(
      `SELECT COUNT(*) as count FROM enquiries ${where}`, params
    );
    return { enquiries: rows, total: total?.count || 0, page, limit };
  }
}

// ── Get single enquiry ──
async function getEnquiryById(id) {
  if (usesMongo) {
    return Enquiry.findOne({ id }).lean();
  } else {
    return sqliteGet('SELECT * FROM enquiries WHERE id=?', [id]);
  }
}

// ── Update status ──
async function updateStatus(id, status) {
  if (usesMongo) {
    await Enquiry.findOneAndUpdate(
      { id },
      { status, updated_at: new Date() }
    );
  } else {
    await sqliteRun(
      'UPDATE enquiries SET status=?, updated_at=? WHERE id=?',
      [status, new Date().toISOString(), id]
    );
  }
}

// ── Dashboard stats ──
async function getStats() {
  if (usesMongo) {
    const now       = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart  = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [total, today, week, byStatus, latest] = await Promise.all([
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ created_at: { $gte: todayStart } }),
      Enquiry.countDocuments({ created_at: { $gte: weekStart } }),
      Enquiry.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      Enquiry.find().sort({ created_at: -1 }).limit(5)
        .select('id name email product created_at').lean(),
    ]);

    return {
      total,
      today,
      week,
      byStatus: byStatus.map(s => ({ status: s._id, count: s.count })),
      latest,
      database: 'mongodb-atlas',
    };

  } else {
    const total    = await sqliteGet('SELECT COUNT(*) as count FROM enquiries');
    const today    = await sqliteGet("SELECT COUNT(*) as count FROM enquiries WHERE date(created_at)=date('now')");
    const week     = await sqliteGet("SELECT COUNT(*) as count FROM enquiries WHERE created_at>=datetime('now','-7 days')");
    const byStatus = await sqliteAll('SELECT status, COUNT(*) as count FROM enquiries GROUP BY status');
    const latest   = await sqliteAll('SELECT id,name,email,product,created_at FROM enquiries ORDER BY created_at DESC LIMIT 5');

    return {
      total:    total?.count    || 0,
      today:    today?.count    || 0,
      week:     week?.count     || 0,
      byStatus,
      latest,
      database: 'local-sqlite',
    };
  }
}

// ── Close connection ──
function close() {
  if (usesMongo) {
    const mongoose = require('mongoose');
    mongoose.connection.close();
    logger.info('MongoDB connection closed');
  } else if (sqliteDB) {
    sqliteDB.close();
    logger.info('SQLite connection closed');
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  SQLITE HELPERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function sqliteRun(sql, params = []) {
  return new Promise((resolve, reject) => {
    sqliteDB.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

function sqliteGet(sql, params = []) {
  return new Promise((resolve, reject) => {
    sqliteDB.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function sqliteAll(sql, params = []) {
  return new Promise((resolve, reject) => {
    sqliteDB.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

module.exports = {
  initialize,
  saveEnquiry,
  markEmailSent,
  getEnquiries,
  getEnquiryById,
  updateStatus,
  getStats,
  close,
};