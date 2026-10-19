'use strict';

const { redeemPoints, RedemptionError } = require('../../src/loyaltyRedeem');

describe('loyalty redeem', () => {
  test('redeeming points reduces the total by their point value', () => {
    expect(redeemPoints(50, 500, 1000)).toBe(45);
  });

  test('redemption is refused past the available balance', () => {
    expect(() => redeemPoints(50, 500, 100)).toThrow(RedemptionError);
  });

  test('redemption never takes the total below zero', () => {
    expect(redeemPoints(5, 1000, 1000)).toBe(0);
  });

  test('redeeming the full balance is allowed', () => {
    expect(redeemPoints(50, 1000, 1000)).toBe(40);
  });
});
