/**
 * Deprecated server.js
 * --------------------
 * The application has been unified under app.js (MySQL + API + static).
 * This file remains only for backward compatibility if you run: node server.js
 * It simply loads app.js so legacy workflows still function.
 */

require('dotenv').config();

console.log('[server.js] Deprecated: loading unified app from app.js');
require('./app');
