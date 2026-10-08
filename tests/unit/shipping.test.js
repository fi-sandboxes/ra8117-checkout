'use strict';

const { quote } = require('../../src/shipping');

describe('shipping', () => {
  test('charges base plus weight', () => {
    expect(quote({ zone: 'domestic', weightKg: 2.2, subtotal: 20 })).toBe(6.4);
  });

  test('free above the threshold', () => {
    expect(quote({ zone: 'eu', weightKg: 1, subtotal: 200 })).toBe(0);
  });

  test('express doubles the price and is never free', () => {
    expect(quote({ zone: 'domestic', weightKg: 1, subtotal: 80, express: true })).toBe(10.8);
  });

  test('rejects an unknown zone', () => {
    expect(() => quote({ zone: 'moon', weightKg: 1, subtotal: 1 })).toThrow();
  });
});
