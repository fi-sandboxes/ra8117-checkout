'use strict';

const crypto = require('crypto');

// Return reference from a cryptographically secure source (consistent with session.js's tokens).
function newReturnReference() {
  return `RT-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
}

module.exports = { newReturnReference };
