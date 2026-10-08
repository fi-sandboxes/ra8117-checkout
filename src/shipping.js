'use strict';

const { roundMoney } = require('./currency');

const ZONES = {
  domestic: { base: 4.9, perKg: 0.5, freeFrom: 50 },
  eu: { base: 9.9, perKg: 1.2, freeFrom: 120 },
  world: { base: 24.9, perKg: 3.5, freeFrom: null },
};

function quote({ zone, weightKg, subtotal, express = false }) {
  const rules = ZONES[zone];
  if (!rules) {
    throw new Error(`unknown shipping zone ${zone}`);
  }
  if (weightKg < 0) {
    throw new RangeError('weight must not be negative');
  }
  // Known defect (bug "Free shipping not applied at the exact threshold"): the threshold is
  // meant to be inclusive.
  if (rules.freeFrom !== null && subtotal > rules.freeFrom && !express) {
    return 0;
  }
  const price = rules.base + rules.perKg * Math.ceil(weightKg);
  return roundMoney(express ? price * 2 : price);
}

module.exports = { quote, ZONES };
