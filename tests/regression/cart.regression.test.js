'use strict';

// Release regression: a cart can never reach a negative subtotal through its unit prices.
const { createCart, addLine, subtotal } = require('../../src/cart');

describe('cart regression', () => {
  test('a negative unit price never reaches the subtotal', () => {
    const cart = addLine(createCart(), 'A', 25);
    expect(() => addLine(cart, 'REFUND', -30)).toThrow(RangeError);
    expect(subtotal(cart)).toBe(25);
  });
});
