'use strict';

// Release regression: discount codes against the catalogue of known baskets.
const { applyCode, DiscountError } = require('../../src/discounts');

const TODAY = '2026-10-09';

const accepted = [
  ['SAVE10 on 10.00', 10, 'SAVE10', 9],
  ['SAVE10 on 99.99', 99.99, 'SAVE10', 89.99],
  ['WELCOME5 at the minimum basket', 30, 'WELCOME5', 25],
  ['WELCOME5 on a large basket', 250, 'WELCOME5', 245],
  ['BULK15 at the minimum basket', 200, 'BULK15', 170],
  ['BULK15 on a large basket', 1000, 'BULK15', 850],
  ['lower-case code', 50, 'save10', 45],
];

const refused = [
  ['WELCOME5 below the minimum basket', 29.99, 'WELCOME5'],
  ['BULK15 below the minimum basket', 199.99, 'BULK15'],
  ['expired SUMMER20', 100, 'SUMMER20'],
];

describe('discount regression', () => {
  test.each(accepted)('%s', (_, subtotal, code, total) => {
    expect(applyCode(subtotal, code, TODAY).total).toBe(total);
  });

  test.each(refused)('%s', (_, subtotal, code) => {
    expect(() => applyCode(subtotal, code, TODAY)).toThrow(DiscountError);
  });
});
