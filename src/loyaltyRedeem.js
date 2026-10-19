'use strict';

class RedemptionError extends Error {}

// 1 point = 0.01 of currency, the same scale a cent-rounded total already uses.
const POINT_VALUE = 0.01;

function redeemPoints(total, points, balance) {
  if (points > balance) {
    throw new RedemptionError(`cannot redeem ${points} points, only ${balance} available`);
  }
  const discount = Math.round(points * POINT_VALUE * 100) / 100;
  return Math.max(0, Math.round((total - discount) * 100) / 100);
}

module.exports = { redeemPoints, RedemptionError, POINT_VALUE };
