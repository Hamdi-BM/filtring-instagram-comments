const fs = require('fs');
const path = require('path');
const logFile = path.join(__dirname, 'instagram.log');

const log = (message) => {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logFile, `[${timestamp}] ${message}\n`);
};

exports.warning = (message) => {
  log(`WARNING: ${message}`);
};

exports.info = (message) => {
  log(`INFO: ${message}`);
};
