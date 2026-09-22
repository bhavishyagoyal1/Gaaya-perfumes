# Gaaya Perfumes Private Limited — Official Website

A luxury, full-stack website for Gaaya Perfumes Private Limited — a perfume and chemical product manufacturer based in Alwar, Rajasthan.

---

## 🚀 Quick Start

### Option A: Static (Frontend Only)
Just open `index.html` in your browser. The contact form will work in demo/simulation mode.

### Option B: Full Stack (With Backend)

**Requirements:** Node.js v16+

```bash
# 1. Install dependencies
npm install

# 2. Start the server
npm start

# 3. Open in browser
http://localhost:3000
```

**Development mode (auto-restart):**
```bash
npm run dev
```

---

## 📁 Project Structure

```
gaaya-perfumes/
├── index.html          # Main website (frontend)
├── style.css           # All styles
├── script.js           # Frontend JavaScript
├── server.js           # Node.js/Express backend
├── package.json        # Dependencies
└── data/
    └── enquiries.json  # Saved contact enquiries (auto-created)
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |
| POST | `/api/contact` | Submit contact enquiry |
| GET | `/api/products` | Product catalog |
| GET | `/api/company` | Company information |
| GET | `/api/admin/enquiries` | View all enquiries (admin) |

### Contact Form (POST /api/contact)
```json
{
  "name": "John Doe",
  "company": "ABC Pvt Ltd",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "product": "Premium Attars",
  "message": "We need 50kg of rose attar..."
}
```

### Admin Access
Set the `ADMIN_KEY` environment variable and pass it as `x-admin-key` header:
```bash
ADMIN_KEY=your-secret-key node server.js
```

---

## 🌐 Enabling Live Contact Form

In `script.js`, set:
```javascript
window.BACKEND_CONFIGURED = true;
```
And deploy the `server.js` backend to your hosting (Railway, Render, VPS, etc.)

---

## 🏢 Company Details

- **Name:** Gaaya Perfumes Private Limited
- **Incorporated:** January 10, 2024
- **Registration:** RoC-Jaipur (MCA India)
- **Address:** Plot No. G1 655, RIICO Industrial Area, Khushkhera, Tapukara, Tizara, Alwar, Rajasthan — 301707
- **Activity:** Manufacture of Perfumes & Cosmetic Products

---

## 🖥️ Tech Stack

- **Frontend:** Vanilla HTML5, CSS3 (custom animations), JavaScript ES6+
- **Fonts:** Cinzel (display), Cormorant Garamond (body), Montserrat (UI)
- **Backend:** Node.js + Express
- **Storage:** JSON file (replace with MongoDB/MySQL for production)

---

## 📦 Production Deployment

1. Set environment variables: `PORT`, `ADMIN_KEY`
2. Deploy to Railway/Render/AWS/DigitalOcean
3. Point your domain's DNS to the server IP
4. Enable SSL (HTTPS) via Let's Encrypt / Cloudflare

---

*Built for Gaaya Perfumes Private Limited © 2024*
