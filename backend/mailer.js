'use strict';
// ============================================================
// mailer.js — Production Email Service (Resend)
// With retry logic and HTML templates
// ============================================================

const { Resend } = require('resend');
const config     = require('./config');
const logger     = require('./logger');

// ── Initialize Resend client ──
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// ── Verify on startup ──
async function verifyConnection() {
  if (!resend) {
    logger.error('❌ RESEND_API_KEY not set — emails will not be sent');
    logger.warn('   Enquiries will still be saved to database even if email fails');
    return false;
  }
  try {
    // Send a test ping to Resend API
    await resend.domains.list();
    logger.info('✅ Resend email service ready', { to: config.email.to });
    return true;
  } catch (err) {
    logger.error('❌ Resend configuration error', { error: err.message });
    logger.warn('   Enquiries will still be saved to database even if email fails');
    return false;
  }
}

// ── HTML email template ──
function buildEnquiryEmail(enquiry) {
  const subject = `New Enquiry: ${enquiry.product || 'General'} — ${enquiry.name}`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:30px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1);">

        <!-- Header -->
        <tr>
          <td style="background:#080705;padding:28px 36px;text-align:center;">
            <h1 style="color:#c9a84c;font-size:22px;margin:0;letter-spacing:4px;font-family:Georgia,serif;">GAAYA PERFUMES</h1>
            <p style="color:#b8a882;font-size:11px;margin:8px 0 0;letter-spacing:3px;text-transform:uppercase;">New Business Enquiry</p>
          </td>
        </tr>

        <!-- Alert Banner -->
        <tr>
          <td style="background:#c9a84c;padding:12px 36px;text-align:center;">
            <p style="color:#080705;margin:0;font-size:13px;font-weight:bold;letter-spacing:1px;">
              ⚡ Action Required — New enquiry received from website
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 36px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${buildRow('Name',    enquiry.name)}
              ${buildRow('Company', enquiry.company || 'Not provided')}
              ${buildRow('Email',   `<a href="mailto:${enquiry.email}" style="color:#c9a84c;">${enquiry.email}</a>`)}
              ${buildRow('Phone',   enquiry.phone   || 'Not provided')}
              ${buildRow('Product Interest', enquiry.product || 'Not specified')}
            </table>

            <!-- Message -->
            <div style="margin-top:24px;">
              <p style="color:#8a5f1e;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;margin:0 0 10px;">Message</p>
              <div style="background:#faf6ee;border-left:4px solid #c9a84c;padding:16px 20px;border-radius:0 6px 6px 0;color:#333;line-height:1.7;font-size:14px;">
                ${enquiry.message.replace(/\n/g, '<br>')}
              </div>
            </div>

            <!-- Reply button -->
            <div style="text-align:center;margin-top:28px;">
              <a href="mailto:${enquiry.email}?subject=Re: Your Enquiry — Gaaya Perfumes"
                 style="background:#c9a84c;color:#080705;padding:14px 32px;text-decoration:none;font-weight:bold;font-size:13px;letter-spacing:1px;border-radius:4px;display:inline-block;">
                REPLY TO ENQUIRY
              </a>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#080705;padding:20px 36px;text-align:center;">
            <p style="color:#b8a882;font-size:11px;margin:0;">Reference: GYP-${enquiry.id}</p>
            <p style="color:#5a5040;font-size:10px;margin:6px 0 0;">Gaaya Perfumes Pvt. Ltd. · RIICO Industrial Area, Alwar, Rajasthan — 301707</p>
            <p style="color:#5a5040;font-size:10px;margin:4px 0 0;">Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = `
GAAYA PERFUMES — NEW ENQUIRY
=============================
Reference: GYP-${enquiry.id}

Name:    ${enquiry.name}
Company: ${enquiry.company || 'Not provided'}
Email:   ${enquiry.email}
Phone:   ${enquiry.phone   || 'Not provided'}
Product: ${enquiry.product || 'Not specified'}

Message:
${enquiry.message}

---
Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
Gaaya Perfumes Pvt. Ltd. · RIICO Industrial Area, Alwar, Rajasthan
`;

  return { subject, html, text };
}

function buildRow(label, value) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0e8d8;width:130px;vertical-align:top;">
        <span style="color:#8a5f1e;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">${label}</span>
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #f0e8d8;color:#333;font-size:14px;">${value}</td>
    </tr>`;
}

// ── Send with retry logic ──
async function sendEnquiryEmail(enquiry, retries = 3) {
  if (!resend) {
    logger.error('Resend not configured — skipping email');
    return { success: false, error: 'RESEND_API_KEY not set' };
  }

  const { subject, html, text } = buildEnquiryEmail(enquiry);

  // Determine "from" address — use verified domain or Resend's default
  const fromAddress = process.env.RESEND_FROM_EMAIL || 'Gaaya Perfumes <onboarding@resend.dev>';

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const { data, error } = await resend.emails.send({
        from:     fromAddress,
        to:       [config.email.to],
        replyTo:  enquiry.email,
        subject,
        html,
        text,
        headers: {
          'X-Priority':     '1',
          'X-Reference-ID': `GYP-${enquiry.id}`,
        },
      });

      if (error) throw new Error(error.message);

      logger.info('Email sent successfully via Resend', {
        id:        enquiry.id,
        messageId: data.id,
        attempt,
      });
      return { success: true, messageId: data.id };

    } catch (err) {
      logger.warn(`Email attempt ${attempt}/${retries} failed`, { error: err.message });
      if (attempt === retries) {
        logger.error('All email retry attempts failed', { id: enquiry.id, error: err.message });
        return { success: false, error: err.message };
      }
      // Wait before retry: 2s, 4s, 8s
      await new Promise(r => setTimeout(r, 2000 * attempt));
    }
  }
}

// ── Send confirmation to customer ──
async function sendConfirmationEmail(enquiry) {
  if (!resend) return;

  const fromAddress = process.env.RESEND_FROM_EMAIL || 'Gaaya Perfumes <onboarding@resend.dev>';

  try {
    await resend.emails.send({
      from:    fromAddress,
      to:      [enquiry.email],
      subject: 'We received your enquiry — Gaaya Perfumes',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;border:1px solid #e8c97e;border-radius:8px;overflow:hidden;">
          <div style="background:#080705;padding:24px;text-align:center;">
            <h1 style="color:#c9a84c;font-size:20px;margin:0;letter-spacing:3px;font-family:Georgia,serif;">GAAYA PERFUMES</h1>
          </div>
          <div style="padding:28px 32px;">
            <p style="color:#333;font-size:15px;">Dear ${enquiry.name},</p>
            <p style="color:#555;line-height:1.7;">Thank you for your enquiry. We have received your message and our team will get back to you within <strong>24 business hours</strong>.</p>
            <div style="background:#faf6ee;border-left:4px solid #c9a84c;padding:14px 18px;margin:20px 0;border-radius:0 4px 4px 0;">
              <p style="margin:0;color:#8a5f1e;font-size:12px;font-weight:bold;">REFERENCE NUMBER</p>
              <p style="margin:6px 0 0;color:#333;font-size:18px;font-weight:bold;letter-spacing:2px;">GYP-${enquiry.id}</p>
            </div>
            <p style="color:#555;font-size:13px;line-height:1.7;">For urgent inquiries, please email us directly at <a href="mailto:info@gaayaperfumes.com" style="color:#c9a84c;">info@gaayaperfumes.com</a></p>
          </div>
          <div style="background:#080705;padding:16px;text-align:center;">
            <p style="color:#5a5040;font-size:10px;margin:0;">Gaaya Perfumes Pvt. Ltd. · RIICO Industrial Area, Alwar, Rajasthan — 301707</p>
          </div>
        </div>
      `,
      text: `Dear ${enquiry.name},\n\nThank you for your enquiry. We will get back to you within 24 business hours.\n\nReference: GYP-${enquiry.id}\n\nGaaya Perfumes Private Limited`,
    });
    logger.info('Confirmation email sent to customer', { email: enquiry.email });
  } catch (err) {
    logger.warn('Confirmation email to customer failed (non-critical)', { error: err.message });
  }
}

module.exports = { verifyConnection, sendEnquiryEmail, sendConfirmationEmail };
