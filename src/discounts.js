'use strict';

const { roundMoney } = require('./currency');

// Discount codes: percentage or fixed amount, with a minimum basket and an expiry date.
const CODES = {
  SAVE10: { type: 'percent', value: 10, minSubtotal: 0, expires: '2099-12-31' },
  WELCOME5: { type: 'fixed', value: 5, minSubtotal: 30, expires: '2099-12-31' },
  BULK15: { type: 'percent', value: 15, minSubtotal: 200, expires: '2099-12-31' },
  SUMMER20: { type: 'percent', value: 20, minSubtotal: 50, expires: '2026-08-31' },
};

class DiscountError extends Error {}

function lookup(code) {
  const rule = CODES[String(code || '').trim().toUpperCase()];
  if (!rule) {
    throw new DiscountError(`unknown discount code ${code}`);
  }
  return rule;
}

function applyCode(subtotal, code, today) {
  const rule = lookup(code);
  if (today > rule.expires) {
    throw new DiscountError(`discount code ${code} expired on ${rule.expires}`);
  }
  if (subtotal < rule.minSubtotal) {
    throw new DiscountError(`discount code ${code} needs a basket of at least ${rule.minSubtotal}`);
  }
  const discount = rule.type === 'percent'
    ? roundMoney((subtotal * rule.value) / 100)
    : Math.min(rule.value, subtotal);
  return { discount, total: roundMoney(subtotal - discount) };
}

module.exports = { applyCode, DiscountError, CODES };
