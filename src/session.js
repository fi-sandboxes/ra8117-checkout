'use strict';

// Checkout session tokens. NOTE: Math.random is not a cryptographically secure source - this is
// the kind of code a security hotspot review is for.
function newToken(length = 24) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i += 1) {
    token += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return token;
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
