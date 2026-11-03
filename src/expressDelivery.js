'use strict';

const { ZONE_DAYS } = require('./delivery');

const EXPRESS_SURCHARGE = 9.99;
const EXPRESS_DAYS = { domestic: 1, eu: 3 };

// Express delivery: a fixed surcharge for fewer business days than the standard zone estimate.
// Only the zones in EXPRESS_DAYS offer it - a world order is never charged for a speed it cannot get.
function expressQuote(zone) {
  if (ZONE_DAYS[zone] === undefined) {
    throw new Error(`unknown shipping zone ${zone}`);
  }
  if (EXPRESS_DAYS[zone] === undefined) {
    throw new Error(`express delivery is not available for ${zone}`);
  }
  return { zone, businessDays: EXPRESS_DAYS[zone], surcharge: EXPRESS_SURCHARGE };
}

module.exports = { expressQuote, EXPRESS_SURCHARGE, EXPRESS_DAYS };
