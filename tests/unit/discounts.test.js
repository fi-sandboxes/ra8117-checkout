'use strict';

const { applyCode, DiscountError } = require('../../src/discounts');

const TODAY = '2026-10-09';

describe('discounts', () => {
  test('percentage code', () => {
    expect(applyCode(80, 'SAVE10', TODAY)).toEqual({ discount: 8, total: 72 });
  });

  test('fixed code', () => {
    expect(applyCode(40, 'welcome5', TODAY)).toEqual({ discount: 5, total: 35 });
  });

  test('expired code is rejected', () => {
    expect(() => applyCode(100, 'SUMMER20', TODAY)).toThrow(DiscountError);
  });

  test('unknown code is rejected', () => {
    expect(() => applyCode(100, 'NOPE', TODAY)).toThrow(DiscountError);
  });
});
