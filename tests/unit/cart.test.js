'use strict';

const { createCart, addLine, removeLine, subtotal, itemCount } = require('../../src/cart');

describe('cart', () => {
  test('starts empty', () => {
    expect(subtotal(createCart())).toBe(0);
  });

  test('adds lines and sums them', () => {
    const cart = addLine(addLine(createCart(), 'A', 10, 2), 'B', 5.5);
    expect(subtotal(cart)).toBe(25.5);
    expect(itemCount(cart)).toBe(3);
  });

  test('merges the same sku', () => {
    const cart = addLine(addLine(createCart(), 'A', 10), 'A', 10, 2);
    expect(cart.lines).toHaveLength(1);
    expect(itemCount(cart)).toBe(3);
  });

  test('removes a line', () => {
    const cart = removeLine(addLine(createCart(), 'A', 10), 'A');
    expect(cart.lines).toHaveLength(0);
  });

  test('rejects a non-positive quantity', () => {
    expect(() => addLine(createCart(), 'A', 10, 0)).toThrow(RangeError);
  });
});
