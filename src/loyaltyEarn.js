'use strict';

function pointsForTotal(total) {
  return Math.floor(total);
}

function earnPoints(order, idempotencyKey, ledger) {
  const existing = ledger.find((entry) => entry.idempotencyKey === idempotencyKey);
  if (existing) {
    return existing.points;
  }
  const points = pointsForTotal(order.total);
  ledger.push({ idempotencyKey, points });
  return points;
}

function balanceFor(ledger) {
  return ledger.reduce((sum, entry) => sum + entry.points, 0);
}

module.exports = { pointsForTotal, earnPoints, balanceFor };
