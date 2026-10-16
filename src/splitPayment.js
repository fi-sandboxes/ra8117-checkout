'use strict';

const { roundMoney } = require('./currency');

// Splits `total` into `parts` equal shares, distributing the leftover cent(s) to
// the first `remainder` shares so the shares always sum back to exactly `total`
// instead of differing from it by a cent.
function splitTotal(total, parts) {
  if (parts <= 0) {
    throw new Error('parts must be positive');
  }
  const totalCents = Math.round(total * 100);
  const base = Math.floor(totalCents / parts);
  const remainder = totalCents - base * parts;
  const shares = [];
  for (let i = 0; i < parts; i += 1) {
    const cents = base + (i < remainder ? 1 : 0);
    shares.push(roundMoney(cents / 100));
  }
  return shares;
}

module.exports = { splitTotal };
