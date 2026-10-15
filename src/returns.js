'use strict';

function returnDeadline(deliveredOn, days = 30) {
  const delivered = new Date(`${deliveredOn}T00:00:00Z`);
  delivered.setUTCDate(delivered.getUTCDate() + days);
  return delivered.toISOString().slice(0, 10);
}

function isReturnable(deliveredOn, today, days = 30) {
  return today <= returnDeadline(deliveredOn, days);
}

module.exports = { isReturnable, returnDeadline };
