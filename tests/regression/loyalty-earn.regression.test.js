'use strict';

// Release regression: earning bonus points is idempotent per checkout request.
// Known defect (B9, "Bonus points awarded twice on a retried checkout request"): earnPoints does
// not deduplicate by idempotencyKey, so the retried case below expects the balance to stay at 42
// but the implementation double-credits it to 84.
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
});
