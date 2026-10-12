'use strict';

const { createCart, addLine, itemCount, MAX_LINE_QUANTITY } = require('../../src/cart');

describe('cart line quantity cap', () => {
  test('accepts exactly the maximum', () => {
    const cart = addLine(createCart(), 'A', 1, MAX_LINE_QUANTITY);
    expect(itemCount(cart)).toBe(MAX_LINE_QUANTITY);
  });

  test('rejects a new line above the maximum', () => {
    expect(() => addLine(createCart(), 'A', 1, MAX_LINE_QUANTITY + 1)).toThrow(RangeError);
  });

  test('rejects a merge that would exceed the maximum and keeps the line unchanged', () => {
    const cart = addLine(createCart(), 'A', 1, 90);
    expect(() => addLine(cart, 'A', 1, 10)).toThrow(RangeError);
    expect(itemCount(cart)).toBe(90);
  });

  test('the cap is per line, not per cart', () => {
    const cart = addLine(addLine(createCart(), 'A', 1, 60), 'B', 1, 60);
    expect(itemCount(cart)).toBe(120);
  });
});
