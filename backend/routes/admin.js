'use strict';
// ============================================================
// routes/admin.js — Admin API Routes
// Protected by API key header
// ============================================================

const express = require('express');
const router  = express.Router();
const db      = require('../database');
const config  = require('../config');
const logger  = require('../logger');
const { adminLimiter } = require('../middleware');

// ── Auth middleware ──
function adminAuth(req, res, next) {
  const key = req.headers['x-admin-key'];
  if (!key || key !== config.security.adminKey) {
    logger.warn('Unauthorized admin access attempt', { ip: req.ip });
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// All admin routes require auth + rate limiting
router.use(adminLimiter, adminAuth);

// GET /api/admin/enquiries
router.get('/enquiries', async (req, res) => {
  try {
    const page   = parseInt(req.query.page  || '1', 10);
    const limit  = parseInt(req.query.limit || '20', 10);
    const status = req.query.status || null;
    const data   = await db.getEnquiries({ page, limit, status });
    res.json(data);
  } catch (err) {
    logger.error('Admin enquiries fetch failed', { error: err.message });
    res.status(500).json({ error: 'Failed to fetch enquiries' });
  }
});

// GET /api/admin/enquiries/:id
router.get('/enquiries/:id', async (req, res) => {
  try {
    const enquiry = await db.getEnquiryById(req.params.id);
    if (!enquiry) return res.status(404).json({ error: 'Enquiry not found' });
    res.json(enquiry);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch enquiry' });
  }
});

// PATCH /api/admin/enquiries/:id/status
router.patch('/enquiries/:id/status', async (req, res) => {
  const { status } = req.body;
  const allowed = ['new', 'read', 'replied', 'closed'];
  if (!allowed.includes(status)) {
    return res.status(400).json({ error: `Status must be one of: ${allowed.join(', ')}` });
  }
  try {
    await db.updateStatus(req.params.id, status);
    res.json({ success: true, id: req.params.id, status });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// GET /api/admin/stats
router.get('/stats', async (req, res) => {
  try {
    const stats = await db.getStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// GET /api/admin/health
router.get('/health', (req, res) => {
  res.json({
    status:    'ok',
    env:       config.env,
    timestamp: new Date().toISOString(),
    uptime:    `${Math.floor(process.uptime())}s`,
    memory:    process.memoryUsage(),
  });
});

module.exports = router;
