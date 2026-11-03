'use strict';

// Release regression: earning bonus points is idempotent per checkout request.
// B9 ("Bonus points awarded twice on a retried checkout request") is fixed: earnPoints returns the
// points already recorded under the request's idempotencyKey instead of crediting them again.
const { earnPoints, balanceFor } = require('../../src/loyaltyEarn');

describe('loyalty earn regression', () => {
  test('a single checkout request credits points once', () => {
    const ledger = [];
    earnPoints({ total: 42.9 }, 'req-1', ledger);
    expect(balanceFor(ledger)).toBe(42);
  });

  test('a retried checkout request does not double-credit', () => {
    const ledger = [];
    earnPoints({ total: 42.9 }, 'req-2', ledger);
    earnPoints({ total: 42.9 }, 'req-2', ledger); // client retry, same idempotency key
    expect(balanceFor(ledger)).toBe(42);
  });

  test('a retry with a changed total keeps the first award', () => {
    const ledger = [];
    expect(earnPoints({ total: 42.9 }, 'req-3', ledger)).toBe(42);
    expect(earnPoints({ total: 99.0 }, 'req-3', ledger)).toBe(42); // the retry is the same request
    expect(balanceFor(ledger)).toBe(42);
  });
});
