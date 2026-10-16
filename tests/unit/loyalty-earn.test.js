'use strict';

const { pointsForTotal, earnPoints, balanceFor } = require('../../src/loyaltyEarn');

describe('loyalty earn', () => {
  test('points are the whole-pound floor of the order total', () => {
    expect(pointsForTotal(42.9)).toBe(42);
    expect(pointsForTotal(0.99)).toBe(0);
    expect(pointsForTotal(100)).toBe(100);
  });

  test('earning points appends to the ledger and returns the credited amount', () => {
    const ledger = [];
    const credited = earnPoints({ total: 18.4 }, 'req-a', ledger);
    expect(credited).toBe(18);
    expect(ledger).toEqual([{ idempotencyKey: 'req-a', points: 18 }]);
  });

  test('balance sums every ledger entry', () => {
    const ledger = [
      { idempotencyKey: 'req-a', points: 18 },
      { idempotencyKey: 'req-b', points: 7 },
    ];
    expect(balanceFor(ledger)).toBe(25);
  });
});
