'use strict';

// Release regression: refund of a returned line, including its share of the order discount.
// Known defect (B8, "Refund of a discounted line is one cent short"): the two-line case below
// expects the correct, rounded refund - the implementation floors it and is one cent short.
const { refundLines } = require('../../src/refunds');

const order = {
  lines: [
    { sku: 'A', unitPrice: 37.55, quantity: 1 },
    { sku: 'B', unitPrice: 62.45, quantity: 1 },
  ],
  discountTotal: 10.0,
};

const cases = [
  ['full return of a single-line, non-discounted order', { lines: [{ sku: 'A', unitPrice: 50, quantity: 1 }], discountTotal: 0 }, 'A', 50],
  ['partial-quantity return', { lines: [{ sku: 'A', unitPrice: 9.99, quantity: 3 }], discountTotal: 0 }, 'A', 9.99],
  ['discounted line A of the two-line order', order, 'A', 33.8],
];

describe('refund regression', () => {
  test.each(cases)('%s', (_, testOrder, sku, expected) => {
    const [result] = refundLines(testOrder, [{ sku, quantity: 1 }]);
    expect(result.refund).toBe(expected);
  });
});
