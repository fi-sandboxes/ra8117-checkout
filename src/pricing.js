'use strict';

// Minimal code for SonarCloud to analyse; the release fixtures do not depend on its behaviour.
function applyDiscount(amount, percent) {
  if (percent < 0 || percent > 100) {
    throw new RangeError('percent must be between 0 and 100');
  }
  return Math.round(amount * (100 - percent)) / 100;
}

module.exports = { applyDiscount };
