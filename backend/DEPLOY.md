# Gaaya Perfumes — Complete Production Deployment Guide

## What's Included in This Setup

| Feature | Implementation |
|---|---|
| Security Hardening | Helmet, CORS, CSP headers, XSS protection |
| Rate Limiting | Express + Nginx (double layer) |
| Input Validation | express-validator with strict rules |
| Database | SQLite (upgrade to PostgreSQL easily) |
| Logging | Winston with daily rotating files |
| Error Handling | Global handlers, graceful shutdown |
| Load Balancing | PM2 cluster mode across all CPU cores |
| SSL/HTTPS | Let's Encrypt via Certbot (free) |
| Compression | Gzip for all responses |
| Email | Nodemailer with retry + HTML templates |
| Admin API | Protected enquiry management endpoints |

---

## STEP 1 — Prepare Your Project

```bash
# Your final folder structure must be:
gaaya-perfumes/
├── index.html
├── style.css
├── script.js
├── server.js
├── config.js
├── logger.js
├── database.js
├── mailer.js
├── middleware.js
├── ecosystem.config.js
├── package.json
├── .env               ← create from .env.example
├── .gitignore
└── routes/
    ├── contact.js
    └── admin.js
```

Create `.env` from the example:
```bash
cp .env.example .env
```

Edit `.env` with your real values:
```
NODE_ENV=production
PORT=3000
EMAIL_USER=hackerxag8135@gmail.com
EMAIL_PASS=your_app_password
EMAIL_TO=bhavishyagoyal54@gmail.com
ADMIN_KEY=make_a_long_random_secret_here
ALLOWED_ORIGINS=https://gaayaperfumes.com,https://www.gaayaperfumes.com
```

Create `.gitignore`:
```
node_modules/
.env
data/
logs/
*.log
```

---

## STEP 2 — Push to GitHub

```bash
git init
git add .
git commit -m "production ready"
git remote add origin https://github.com/YOUR_USERNAME/gaaya-perfumes.git
git push -u origin main
```

---

## STEP 3 — Buy & Set Up VPS

**Recommended: Hostinger VPS KVM 1** (~₹300/month)
- 1 CPU, 4GB RAM, 50GB SSD
- Ubuntu 22.04 LTS

After purchase, you get:
- Server IP (e.g. `123.45.67.89`)
- Root password

Connect via terminal:
```bash
ssh root@123.45.67.89
```

---

## STEP 4 — Secure the Server First

```bash
# Update system
apt update && apt upgrade -y

# Create a non-root user (safer than running as root)
adduser gaaya
usermod -aG sudo gaaya

# Set up SSH key (on your LOCAL PC, not server)
ssh-keygen -t ed25519 -C "gaaya-server"
# Copy your public key to server:
ssh-copy-id gaaya@123.45.67.89

# On server — disable root login & password auth
nano /etc/ssh/sshd_config
# Change these lines:
#   PermitRootLogin no
#   PasswordAuthentication no
systemctl restart sshd

# Firewall
ufw allow OpenSSH
ufw allow 80
ufw allow 443
ufw enable

# Fail2ban (blocks brute-force attacks)
apt install fail2ban -y
systemctl enable fail2ban
systemctl start fail2ban
```

---

## STEP 5 — Install Node.js + PM2 + Nginx

```bash
# Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt-get install -y nodejs

# Verify
node --version   # v20.x.x
npm --version

# PM2 (process manager)
npm install -g pm2

# Nginx
apt install nginx -y
systemctl enable nginx
systemctl start nginx
```

---

## STEP 6 — Deploy Your App

```bash
# Create app directory
mkdir -p /var/www/gaaya-perfumes
cd /var/www

# Clone from GitHub
git clone https://github.com/YOUR_USERNAME/gaaya-perfumes.git
cd gaaya-perfumes

# Install production dependencies only
npm install --production

# Create .env file on server
nano .env
# Paste your production .env contents

# Create required directories
mkdir -p logs data
```

---

## STEP 7 — Start with PM2

```bash
cd /var/www/gaaya-perfumes

# Start in production cluster mode
pm2 start ecosystem.config.js --env production

# Save PM2 process list (survives reboots)
pm2 save

# Auto-start PM2 on server reboot
pm2 startup
# Copy the command it outputs and run it

# Check status
pm2 status
pm2 logs gaaya-perfumes --lines 50
```

---

## STEP 8 — Configure Nginx

```bash
# Copy nginx config
cp /var/www/gaaya-perfumes/nginx.conf /etc/nginx/sites-available/gaayaperfumes.com

# Enable site
ln -s /etc/nginx/sites-available/gaayaperfumes.com /etc/nginx/sites-enabled/

# Remove default site
rm /etc/nginx/sites-enabled/default

# Test config
nginx -t   # must say: syntax is ok / test is successful

# Reload Nginx
systemctl reload nginx
```

---

## STEP 9 — Point Domain to Server

In your domain registrar (GoDaddy/Hostinger) DNS settings:

| Type | Name | Value | TTL |
|---|---|---|---|
| A | @ | 123.45.67.89 | 3600 |
| A | www | 123.45.67.89 | 3600 |

Wait 10–30 minutes. Test: `ping gaayaperfumes.com`

---

## STEP 10 — Install Free SSL Certificate

```bash
# Install Certbot
apt install certbot python3-certbot-nginx -y

# Get certificate (replace with your real domain)
certbot --nginx -d gaayaperfumes.com -d www.gaayaperfumes.com \
  --non-interactive --agree-tos --email bhavishyagoyal54@gmail.com

# Auto-renewal test
certbot renew --dry-run
```

Now your site is at **https://gaayaperfumes.com** with a padlock ✅

---

## STEP 11 — Verify Everything Works

```bash
# Check server health
curl https://gaayaperfumes.com/api/health

# Check PM2
pm2 status

# Check Nginx
systemctl status nginx

# Check logs
pm2 logs gaaya-perfumes --lines 30
tail -f /var/www/gaaya-perfumes/logs/app-$(date +%Y-%m-%d).log
```

---

## Updating the Website (After Changes)

```bash
# On your LOCAL PC:
git add .
git commit -m "update: changed homepage"
git push

# On SERVER (or set up auto-deploy):
cd /var/www/gaaya-perfumes
git pull
npm install --production
pm2 reload gaaya-perfumes  # zero-downtime reload ✅
```

---

## Admin API — View Enquiries

```bash
# Get all enquiries
curl -H "x-admin-key: YOUR_ADMIN_KEY" https://gaayaperfumes.com/api/admin/enquiries

# Get stats
curl -H "x-admin-key: YOUR_ADMIN_KEY" https://gaayaperfumes.com/api/admin/stats

# View server health
curl -H "x-admin-key: YOUR_ADMIN_KEY" https://gaayaperfumes.com/api/admin/health
```

---

## Monitoring & Alerts

```bash
# Real-time logs
pm2 logs gaaya-perfumes

# Real-time monitoring dashboard
pm2 monit

# Check error logs
tail -f /var/www/gaaya-perfumes/logs/error-$(date +%Y-%m-%d).log

# Nginx access logs
tail -f /var/log/nginx/gaaya_access.log
```

---

## Monthly Cost Summary

| Item | Provider | Cost |
|---|---|---|
| Domain gaayaperfumes.com | Hostinger/GoDaddy | ~₹600/year |
| VPS KVM 1 (1CPU 4GB) | Hostinger | ~₹300/month |
| SSL Certificate | Let's Encrypt | FREE |
| **Total** | | **~₹4,200/year** |
