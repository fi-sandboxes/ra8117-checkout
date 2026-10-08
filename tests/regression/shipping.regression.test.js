'use strict';

// Release regression: shipping quotes per zone, including the inclusive free-shipping threshold.
const { quote } = require('../../src/shipping');

const cases = [
  ['domestic light', { zone: 'domestic', weightKg: 0.5, subtotal: 10 }, 5.4],
  ['domestic heavy', { zone: 'domestic', weightKg: 9.1, subtotal: 30 }, 9.9],
  ['domestic above threshold', { zone: 'domestic', weightKg: 3, subtotal: 75 }, 0],
  ['domestic exactly at threshold', { zone: 'domestic', weightKg: 3, subtotal: 50 }, 0],
  ['domestic exactly at threshold, light', { zone: 'domestic', weightKg: 0.2, subtotal: 50 }, 0],
  ['eu light', { zone: 'eu', weightKg: 1, subtotal: 40 }, 11.1],
  ['eu heavy', { zone: 'eu', weightKg: 12, subtotal: 60 }, 24.3],
  ['eu above threshold', { zone: 'eu', weightKg: 4, subtotal: 300 }, 0],
  ['eu exactly at threshold', { zone: 'eu', weightKg: 4, subtotal: 120 }, 0],
  ['eu exactly at threshold, heavy', { zone: 'eu', weightKg: 15, subtotal: 120 }, 0],
  ['world light', { zone: 'world', weightKg: 1, subtotal: 500 }, 28.4],
  ['world heavy', { zone: 'world', weightKg: 10, subtotal: 900 }, 59.9],
  ['express domestic', { zone: 'domestic', weightKg: 1, subtotal: 20, express: true }, 10.8],
  ['express eu', { zone: 'eu', weightKg: 2, subtotal: 500, express: true }, 24.6],
  ['express world', { zone: 'world', weightKg: 1, subtotal: 50, express: true }, 56.8],
  ['zero weight', { zone: 'domestic', weightKg: 0, subtotal: 5 }, 4.9],
];

describe('shipping regression', () => {
  test.each(cases)('%s', (_, input, expected) => {
    expect(quote(input)).toBe(expected);
  });
});
