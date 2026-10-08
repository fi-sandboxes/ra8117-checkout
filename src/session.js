'use strict';

const crypto = require('crypto');

// Checkout session tokens from a cryptographically secure source (replaces Math.random).
function newToken(bytes = 24) {
  return crypto.randomBytes(bytes).toString('hex');
}

function createSession(customerId, now = Date.now()) {
  if (!customerId) {
    throw new Error('customerId is required');
  }
  return { token: newToken(), customerId, expiresAt: now + 30 * 60 * 1000 };
}

function isExpired(session, now = Date.now()) {
  return now >= session.expiresAt;
}

module.exports = { newToken, createSession, isExpired };
