'use strict';

const TIERS = [
  { name: 'Bronze', from: 0 },
  { name: 'Silver', from: 500 },
  { name: 'Gold', from: 2000 },
];

function tierFor(balance) {
  let current = TIERS[0].name;
  for (const tier of TIERS) {
    if (balance >= tier.from) {
      current = tier.name;
    }
  }
  return current;
}

module.exports = { tierFor, TIERS };
