'use strict';

const SYMBOLS = { EUR: '€', USD: '$', GBP: '£' };

function roundMoney(amount) {
  return Math.round(amount * 100) / 100;
}

function format(amount, currency) {
  const symbol = SYMBOLS[currency];
  if (!symbol) {
    throw new Error(`unsupported currency ${currency}`);
  }
  return `${symbol}${roundMoney(amount).toFixed(2)}`;
}

module.exports = { roundMoney, format };
