'use strict';

function pointsForTotal(total) {
  return Math.floor(total);
}

// Known defect (bug "Bonus points awarded twice on a retried checkout request"): earnPoints does
// not check whether this idempotency key was already credited before appending to the ledger, so a
// client retry of the same checkout request credits the points a second time.
function earnPoints(order, idempotencyKey, ledger) {
  const points = pointsForTotal(order.total);
  ledger.push({ idempotencyKey, points });
  return points;
}

function balanceFor(ledger) {
  return ledger.reduce((sum, entry) => sum + entry.points, 0);
}

module.exports = { pointsForTotal, earnPoints, balanceFor };
