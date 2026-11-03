'use strict';

const { ZONE_DAYS } = require('./delivery');

const EXPRESS_SURCHARGE = 9.99;
const EXPRESS_DAYS = { domestic: 1, eu: 3 };

// Express delivery: a fixed surcharge for fewer business days than the standard zone estimate.
function expressQuote(zone) {
  if (ZONE_DAYS[zone] === undefined) {
    throw new Error(`unknown shipping zone ${zone}`);
  }
  const businessDays = EXPRESS_DAYS[zone] || ZONE_DAYS[zone];
  return { zone, businessDays, surcharge: EXPRESS_SURCHARGE };
}

module.exports = { expressQuote, EXPRESS_SURCHARGE, EXPRESS_DAYS };
