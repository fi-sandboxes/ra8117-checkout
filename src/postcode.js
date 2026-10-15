'use strict';

// UK postcode shape: 1-2 letters, a digit, an optional letter/digit, a space, a digit, 2 letters.
const POSTCODE_RE = /^[A-Z]{1,2}\d[A-Z0-9]?\s[0-9][A-Z]{2}$/i;

function isValidPostcode(postcode) {
  return POSTCODE_RE.test(String(postcode || '').trim());
}

module.exports = { isValidPostcode };
