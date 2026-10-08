'use strict';

// Release regression: end-to-end checkout totals for the catalogue of known baskets.
const { createCart, addLine, subtotal } = require('../../src/cart');
const { applyDiscount } = require('../../src/pricing');

const baskets = Array.from({ length: 30 }, (_, i) => {
  const price = 10 + i;
  const quantity = (i % 3) + 1;
  const discount = (i % 5) * 5;
  return [`basket ${String(i + 1).padStart(2, '0')}`, price, quantity, discount];
});

describe('checkout regression', () => {
  test.each(baskets)('%s total', (_, price, quantity, discount) => {
    const cart = addLine(createCart(), 'SKU', price, quantity);
    const expected = Math.round(price * quantity * (100 - discount)) / 100;
    expect(applyDiscount(subtotal(cart), discount)).toBe(expected);
  });
});
