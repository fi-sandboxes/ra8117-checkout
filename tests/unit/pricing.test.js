'use strict';

const { applyDiscount } = require('../../src/pricing');
const { format } = require('../../src/currency');

describe('pricing', () => {
  test('applies a percentage discount', () => {
    expect(applyDiscount(200, 15)).toBe(170);
  });

  test('rejects a discount outside 0..100', () => {
    expect(() => applyDiscount(100, 120)).toThrow(RangeError);
  });

  test('formats money', () => {
    expect(format(12.5, 'EUR')).toBe('€12.50');
  });
});
