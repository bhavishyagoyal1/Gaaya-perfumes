'use strict';
// ============================================================
// backup.js — Manual & Automatic MongoDB Backup
// Saves all enquiries to a JSON file in backups/ folder
//
// Run manually:  node backup.js
// ============================================================

require('dotenv').config();
const mongoose = require('mongoose');
const fs       = require('fs');
const path     = require('path');

// ── Same schema as database.js ──
const enquirySchema = new mongoose.Schema({
  id:         String,
  name:       String,
  company:    String,
  email:      String,
  phone:      String,
  product:    String,
  message:    String,
  ip_address: String,
  user_agent: String,
  status:     String,
  email_sent: Boolean,
  created_at: Date,
  updated_at: Date,
});

async function runBackup() {
  const startTime = Date.now();
  console.log('\n════════════════════════════════════════');
  console.log('  GAAYA PERFUMES — Database Backup');
  console.log('════════════════════════════════════════');
  console.log('  Started:', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));

  // ── Connect to MongoDB ──
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('  MongoDB: Connected ✅');
  } catch (err) {
    console.error('  MongoDB: Connection failed ❌');
    console.error('  Error:', err.message);
    process.exit(1);
  }

  // ── Create backups directory ──
  const backupDir = path.join(__dirname, 'backups');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
    console.log('  Created backups/ folder');
  }

  // ── Fetch all data ──
  try {
    const Enquiry   = mongoose.model('Enquiry', enquirySchema);
    const enquiries = await Enquiry.find({}).lean();
    const total     = enquiries.length;

    // ── Build backup object ──
    const backup = {
      metadata: {
        createdAt:   new Date().toISOString(),
        createdAtIST: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        totalRecords: total,
        database:    'MongoDB Atlas',
        company:     'Gaaya Perfumes Private Limited',
        version:     '1.0',
      },
      enquiries,
    };

    // ── Save to dated file ──
    const timestamp = new Date().toISOString()
      .replace(/:/g, '-')
      .replace('T', '_')
      .split('.')[0];

    const fileName = `backup_${timestamp}.json`;
    const filePath = path.join(backupDir, fileName);

    fs.writeFileSync(filePath, JSON.stringify(backup, null, 2));

    // ── Also save as latest.json (always overwrite) ──
    const latestPath = path.join(backupDir, 'latest.json');
    fs.writeFileSync(latestPath, JSON.stringify(backup, null, 2));

    // ── Clean old backups (keep last 30 only) ──
    const allBackups = fs.readdirSync(backupDir)
      .filter(f => f.startsWith('backup_') && f.endsWith('.json'))
      .sort()
      .reverse();

    if (allBackups.length > 30) {
      const toDelete = allBackups.slice(30);
      toDelete.forEach(f => {
        fs.unlinkSync(path.join(backupDir, f));
        console.log(`  Deleted old backup: ${f}`);
      });
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log('════════════════════════════════════════');
    console.log(`  Records backed up: ${total}`);
    console.log(`  File saved:        backups/${fileName}`);
    console.log(`  Latest updated:    backups/latest.json`);
    console.log(`  Duration:          ${duration}s`);
    console.log('  Status:            SUCCESS ✅');
    console.log('════════════════════════════════════════\n');

    await mongoose.disconnect();
    process.exit(0);

  } catch (err) {
    console.error('  Backup failed ❌:', err.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

runBackup();