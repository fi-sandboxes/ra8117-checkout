'use strict';

// Currency symbols; a symbol that is a letter code is separated from the amount by a space.
const SYMBOLS = { EUR: '€', USD: '$', GBP: '£', CHF: 'CHF' };

function roundMoney(amount) {
  return Math.round(amount * 100) / 100;
}

function format(amount, currency) {
  const symbol = SYMBOLS[currency];
  if (!symbol) {
    throw new Error(`unsupported currency ${currency}`);
  }
  const separator = /^[A-Z]+$/.test(symbol) ? ' ' : '';
  const rounded = roundMoney(amount);
  const sign = rounded < 0 ? '-' : '';
  return `${sign}${symbol}${separator}${Math.abs(rounded).toFixed(2)}`;
}

module.exports = { roundMoney, format, SYMBOLS };
