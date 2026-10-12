'use strict';

const { createCart, addLine } = require('../../src/cart');
const { orderSummary } = require('../../src/summary');

describe('order summary', () => {
  test('domestic order without a code', () => {
    const cart = addLine(createCart(), 'A', 20, 2);
    const summary = orderSummary(cart, { country: 'DE', zone: 'domestic', weightKg: 1 });
    expect(summary.subtotal).toBe(40);
    expect(summary.discount).toBe(0);
    expect(summary.shipping).toBe(5.4);
  });
});
