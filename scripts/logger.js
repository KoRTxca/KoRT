/**
 * ⚔️ KoRT Mission Control — Standardized Logger
 * Appends timestamps to all inputs and outputs.
 */
const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '../logs/kingdom_audit.log');

function getTimestamp() {
  return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

function log(message, type = 'INFO') {
  const ts = getTimestamp();
  const entry = `[${ts}] [${type}] ${message}\n`;
  console.log(entry.trim());
  
  if (!fs.existsSync(path.dirname(LOG_FILE))) {
    fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
  }
  fs.appendFileSync(LOG_FILE, entry);
}

module.exports = { log, getTimestamp };
