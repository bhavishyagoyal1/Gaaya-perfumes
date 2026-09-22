# Gaaya Perfumes — Luxury Packaging Atelier

A premium website for **Gaaya Perfumes Private Limited**, showcasing bespoke wooden fragrance containers, flacon closures, and precision-crafted luxury packaging for niche perfume houses worldwide.


## Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Frontend | React 19, Vite 8                    |
| Backend  | Express 4, Node.js                  |
| Database | SQLite (local) / MongoDB (production) |
| Email    | Nodemailer (Gmail SMTP)             |

## Getting Started

### Prerequisites

- Node.js ≥ 18

### Installation

```bash
# Clone the repository
git clone https://github.com/bhavishyagoyal1/Gaaya-perfumes.git
cd Gaaya-perfumes

# Install frontend dependencies
cd gaaya-react
npm install

# Install backend dependencies
cd ../backend
cp .env.example .env    # configure your environment variables
npm install
```

### Running Locally

```bash
# Terminal 1 — Backend (port 3000)
cd backend
npm run dev

# Terminal 2 — Frontend (port 5173)
cd gaaya-react
npm run dev
```

Open **http://localhost:5173** in your browser.

## Project Structure

```
├── gaaya-react/          # React + Vite frontend
│   └── src/
│       ├── components/   # Header, Hero, Collection, Spotlight, Journal, Enquiry, Footer
│       ├── assets/       # Images & SVGs
│       ├── App.jsx       # Root component
│       └── index.css     # Global styles
│
├── backend/              # Express API server
│   ├── routes/           # Contact & admin endpoints
│   ├── server.js         # Entry point
│   ├── database.js       # SQLite / MongoDB abstraction
│   ├── mailer.js         # Email service
│   ├── middleware.js      # Security, rate limiting, logging
│   └── .env.example      # Environment template
│
└── DESIGN.md             # Design system & color tokens
```

## Environment Variables

Copy `backend/.env.example` to `backend/.env` and configure:

| Variable       | Description                    |
| -------------- | ------------------------------ |
| `PORT`         | Server port (default: `3000`)  |
| `MONGODB_URI`  | MongoDB connection string      |
| `EMAIL_USER`   | Gmail address for SMTP         |
| `EMAIL_PASS`   | Gmail app password             |
| `EMAIL_TO`     | Enquiry recipient address      |
| `ADMIN_KEY`    | Admin API authentication key   |
| `DB_PATH`      | SQLite database path           |

## License

Proprietary — © Gaaya Perfumes Private Limited. All rights reserved.
