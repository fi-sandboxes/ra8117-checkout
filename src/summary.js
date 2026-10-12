'use strict';

const { subtotal } = require('./cart');
const { applyCode } = require('./discounts');
const { quote } = require('./shipping');
const { rateFor } = require('./tax');

// The order summary shown before payment: subtotal, discount, shipping, VAT and the total.
function orderSummary(cart, { country, zone, weightKg, code, today }) {
  const goods = subtotal(cart);
  const discount = code ? applyCode(goods, code, today).discount : 0;
  const discounted = goods - discount;
  const shipping = quote({ zone, weightKg, subtotal: discounted });
  const vat = discounted * rateFor(country, 'standard');
  return { subtotal: goods, discount, shipping, vat, total: discounted + shipping + vat };
}

module.exports = { orderSummary };
