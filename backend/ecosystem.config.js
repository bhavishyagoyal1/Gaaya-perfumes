// ============================================================
// ecosystem.config.js — PM2 Production Configuration
// Run: pm2 start ecosystem.config.js --env production
// ============================================================

module.exports = {
  apps: [
    {
      name:         'gaaya-perfumes',
      script:       'server.js',
      instances:    'max',        // use ALL CPU cores (auto-scaling)
      exec_mode:    'cluster',    // cluster mode = load balancing across cores
      watch:        false,        // don't watch in production
      max_memory_restart: '500M', // restart if memory exceeds 500MB

      env: {
        NODE_ENV: 'development',
        PORT:     3000,
      },

      env_production: {
        NODE_ENV: 'production',
        PORT:     3000,
      },

      // ── Logging ──
      log_date_format:  'YYYY-MM-DD HH:mm:ss',
      error_file:       './logs/pm2-error.log',
      out_file:         './logs/pm2-out.log',
      merge_logs:       true,

      // ── Auto restart ──
      autorestart:      true,
      restart_delay:    3000,     // wait 3s before restart
      max_restarts:     10,       // max 10 restarts in a row
      min_uptime:       '5s',     // must run 5s to count as started

      // ── Graceful shutdown ──
      kill_timeout:     10000,    // wait 10s for graceful shutdown
      listen_timeout:   10000,    // wait 10s for app to start listening

      // ── Zero-downtime deploys ──
      wait_ready:       true,     // wait for process.send('ready')
    },
  ],

  // ── Deployment config ──
  deploy: {
    production: {
      user:         'root',
      host:         'YOUR_SERVER_IP',              // ← replace with your VPS IP
      ref:          'origin/main',
      repo:         'git@github.com:YOUR_USERNAME/gaaya-perfumes.git', // ← replace
      path:         '/var/www/gaaya-perfumes',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install --production && pm2 reload ecosystem.config.js --env production',
      'pre-setup':  '',
    },
  },
};
