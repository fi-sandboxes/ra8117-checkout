'use strict';

const { roundMoney } = require('./currency');

// VAT rates per country; reduced rates apply to the "essential" category.
const RATES = {
  DE: { standard: 0.19, reduced: 0.07 },
  FR: { standard: 0.2, reduced: 0.055 },
  PL: { standard: 0.23, reduced: 0.08 },
  GB: { standard: 0.2, reduced: 0.05 },
};

function rateFor(country, category) {
  const rates = RATES[country];
  if (!rates) {
    throw new Error(`no VAT rates for ${country}`);
  }
  return category === 'essential' ? rates.reduced : rates.standard;
}

function breakdown(lines, country) {
  const groups = {};
  for (const line of lines) {
    const rate = rateFor(country, line.category);
    const key = String(rate);
    groups[key] = groups[key] || { rate, net: 0, vat: 0 };
    groups[key].net += line.amount;
    groups[key].vat += line.amount * rate;
  }
  return Object.values(groups)
    .map((group) => ({ rate: group.rate, net: roundMoney(group.net), vat: roundMoney(group.vat) }))
    .sort((a, b) => b.rate - a.rate);
}

function totalVat(lines, country) {
  return roundMoney(breakdown(lines, country).reduce((sum, group) => sum + group.vat, 0));
}

module.exports = { rateFor, breakdown, totalVat };
