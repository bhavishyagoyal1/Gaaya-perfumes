'use strict';
// ============================================================
// routes/contact.js — Contact Form Route
// ============================================================

const express  = require('express');
const { v4: uuidv4 } = require('uuid');
const router   = express.Router();
const db       = require('../database');
const mailer   = require('../mailer');
const logger   = require('../logger');
const {
  contactLimiter,
  contactValidation,
  handleValidation,
} = require('../middleware');

// ── Duplicate email throttle (in-memory, per-process) ──
const EMAIL_COOLDOWN_MS = 60 * 60 * 1000; // 1 hour
const recentEmails = new Map();

// Clean up stale entries every 30 minutes to prevent memory leak
setInterval(() => {
  const cutoff = Date.now() - EMAIL_COOLDOWN_MS;
  for (const [email, timestamp] of recentEmails) {
    if (timestamp < cutoff) recentEmails.delete(email);
  }
}, 30 * 60 * 1000);

// POST /api/contact
router.post(
  '/',
  contactLimiter,
  contactValidation,
  handleValidation,
  async (req, res) => {
    const { name, company, email, phone, product, message, website } = req.body;

    // ══ DUPLICATE EMAIL THROTTLE ══
    // Same email can only submit once per hour
    const emailKey = email.trim().toLowerCase();
    const now = Date.now();
    if (recentEmails.has(emailKey)) {
      const lastSubmit = recentEmails.get(emailKey);
      const minutesAgo = Math.round((now - lastSubmit) / 60000);
      if (now - lastSubmit < EMAIL_COOLDOWN_MS) {
        logger.warn('Duplicate email throttled', { email: emailKey, minutesAgo });
        return res.status(429).json({
          error: `You've already submitted an enquiry. Please wait before submitting again.`,
        });
      }
    }
    recentEmails.set(emailKey, now);

    // ══ HONEYPOT CHECK ══
    // Real users never see or fill this field
    // Bots always fill every field they find
    // If this field has any value = definitely a bot
    if (website && website.trim().length > 0) {
      logger.warn('Bot blocked via honeypot', {
        ip:       req.ip,
        honeyVal: website.substring(0, 30), // log first 30 chars only
      });
      // Return fake success — never tell bots they were blocked
      // If you return an error, smart bots learn and try to bypass
      return res.status(201).json({
        success:   true,
        message:   'Thank you! Your enquiry has been received.',
        reference: 'GYP-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
      });
    }

    const enquiry = {
      id:        uuidv4(),
      name:      name.trim(),
      company:   company?.trim()  || '',
      email:     email.trim().toLowerCase(),
      phone:     phone?.trim()    || '',
      product:   product          || 'Not specified',
      message:   message.trim(),
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] || '',
    };

    // ── Step 1: Save to database (always) ──
    try {
      await db.saveEnquiry(enquiry);
    } catch (dbErr) {
      logger.error('Database save failed', { error: dbErr.message, id: enquiry.id });
      return res.status(500).json({ error: 'Failed to save enquiry. Please try again.' });
    }

    // ── Step 2: Send notification email (non-blocking) ──
    mailer.sendEnquiryEmail(enquiry).then(async (result) => {
      if (result.success) {
        await db.markEmailSent(enquiry.id);
      }
    }).catch(err => {
      logger.error('Email send failed after save', { error: err.message });
    });

    // ── Step 3: Send confirmation to customer (non-blocking) ──
    mailer.sendConfirmationEmail(enquiry).catch(err => {
      logger.warn('Customer confirmation email failed', { error: err.message });
    });

    // ── Always return success ──
    return res.status(201).json({
      success:   true,
      message:   'Thank you! Your enquiry has been received. We will contact you within 24 hours.',
      reference: `GYP-${enquiry.id.split('-')[0].toUpperCase()}`,
    });
  }
);

module.exports = router;
