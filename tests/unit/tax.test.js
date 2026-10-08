'use strict';

const { rateFor, breakdown, totalVat } = require('../../src/tax');

describe('tax', () => {
  test('standard and reduced rates', () => {
    expect(rateFor('DE', 'general')).toBe(0.19);
    expect(rateFor('DE', 'essential')).toBe(0.07);
  });

  test('groups lines by rate', () => {
    const lines = [
      { amount: 100, category: 'general' },
      { amount: 50, category: 'essential' },
      { amount: 20, category: 'general' },
    ];
    expect(breakdown(lines, 'DE')).toEqual([
      { rate: 0.19, net: 120, vat: 22.8 },
      { rate: 0.07, net: 50, vat: 3.5 },
    ]);
    expect(totalVat(lines, 'DE')).toBe(26.3);
  });
});
