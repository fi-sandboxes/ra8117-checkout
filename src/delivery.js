'use strict';

// Business-day delivery estimate per shipping zone (Mon-Fri; no public holiday calendar yet).
const ZONE_DAYS = { domestic: 2, eu: 5, world: 10 };

function addBusinessDays(date, days) {
  const result = new Date(date);
  let added = 0;
  while (added < days) {
    result.setUTCDate(result.getUTCDate() + 1);
    const day = result.getUTCDay();
    if (day !== 0 && day !== 6) {
      added += 1;
    }
  }
  return result;
}

function estimateDelivery(zone, orderedOn) {
  const days = ZONE_DAYS[zone];
  if (days === undefined) {
    throw new Error(`unknown shipping zone ${zone}`);
  }
  return addBusinessDays(new Date(orderedOn), days);
}

module.exports = { estimateDelivery, ZONE_DAYS };
