'use strict';

const { format, roundMoney } = require('../../src/currency');

describe('currency', () => {
  test('rounds to cents', () => {
    expect(roundMoney(10.005 + 0.001)).toBe(10.01);
  });

  test.each([
    ['EUR', '€12.50'],
    ['USD', '$12.50'],
    ['GBP', '£12.50'],
    ['CHF', 'CHF 12.50'],
  ])('formats %s', (currency, expected) => {
    expect(format(12.5, currency)).toBe(expected);
  });

  test('rejects an unsupported currency', () => {
    expect(() => format(1, 'JPY')).toThrow('unsupported currency JPY');
  });
});
