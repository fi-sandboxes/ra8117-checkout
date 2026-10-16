'use strict';

const { refundLines, totalRefund, RefundError } = require('../../src/refunds');

describe('refunds', () => {
  test('refund of a non-discounted line equals its amount', () => {
    const order = { lines: [{ sku: 'A', unitPrice: 20, quantity: 2 }], discountTotal: 0 };
    expect(refundLines(order, [{ sku: 'A', quantity: 1 }])).toEqual([
      { sku: 'A', quantity: 1, refund: 20 },
    ]);
  });

  test('refund across two returned lines sums their amounts', () => {
    const order = {
      lines: [
        { sku: 'A', unitPrice: 10, quantity: 1 },
        { sku: 'B', unitPrice: 15, quantity: 1 },
      ],
      discountTotal: 0,
    };
    expect(totalRefund(order, [{ sku: 'A', quantity: 1 }, { sku: 'B', quantity: 1 }])).toBe(25);
  });

  test('refuses returning more than was ordered', () => {
    const order = { lines: [{ sku: 'A', unitPrice: 20, quantity: 1 }], discountTotal: 0 };
    expect(() => refundLines(order, [{ sku: 'A', quantity: 2 }])).toThrow(RefundError);
  });

  test('refuses returning the same line twice over the ordered quantity', () => {
    const order = { lines: [{ sku: 'A', unitPrice: 20, quantity: 1 }], discountTotal: 0 };
    expect(() =>
      refundLines(order, [{ sku: 'A', quantity: 1 }, { sku: 'A', quantity: 1 }])
    ).toThrow(RefundError);
  });

  test('refuses a line not on the order', () => {
    const order = { lines: [{ sku: 'A', unitPrice: 20, quantity: 1 }], discountTotal: 0 };
    expect(() => refundLines(order, [{ sku: 'B', quantity: 1 }])).toThrow(RefundError);
  });
});
