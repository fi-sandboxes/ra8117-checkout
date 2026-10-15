'use strict';

// UK postcode shape: 1-2 letters, a digit, an optional letter/digit, a digit, 2 letters - the
// internal space is optional, since shoppers often paste a postcode with no space in it.
const POSTCODE_RE = /^([A-Z]{1,2}\d[A-Z0-9]?)\s?([0-9][A-Z]{2})$/i;

function isValidPostcode(postcode) {
  const compact = String(postcode || '').trim().toUpperCase();
  return POSTCODE_RE.test(compact);
}

module.exports = { isValidPostcode };
