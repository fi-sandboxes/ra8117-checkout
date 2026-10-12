'use strict';

const { createCart, addLine, subtotal } = require('../../src/cart');

describe('cart unit price validation', () => {
  test('a free item (price 0) is accepted', () => {
    expect(subtotal(addLine(createCart(), 'GIFT', 0))).toBe(0);
  });

  test.each([[-0.01], [-10], [Number.NaN], [Number.POSITIVE_INFINITY]])(
    'rejects unit price %p',
    (price) => {
      expect(() => addLine(createCart(), 'A', price)).toThrow(RangeError);
    },
  );
});
