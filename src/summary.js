'use strict';

const { subtotal } = require('./cart');
const { roundMoney } = require('./currency');
const { applyCode } = require('./discounts');
const { quote } = require('./shipping');
const { totalVat } = require('./tax');

// The order summary shown before payment: subtotal, discount, shipping, VAT and the total.
// VAT is computed per line category on the discounted goods (the discount is spread
// proportionally), shipping on the discounted subtotal; every figure is rounded to cents.
function orderSummary(cart, { country, zone, weightKg, code, today, categories = {} }) {
  const goods = subtotal(cart);
  const discount = code ? applyCode(goods, code, today).discount : 0;
  const discounted = roundMoney(goods - discount);
  const share = goods > 0 ? discounted / goods : 0;
  const vatLines = cart.lines.map((line) => ({
    category: categories[line.sku] || 'standard',
    amount: line.unitPrice * line.quantity * share,
  }));
  const shipping = quote({ zone, weightKg, subtotal: discounted });
  const vat = totalVat(vatLines, country);
  return {
    subtotal: goods,
    discount,
    shipping,
    vat,
    total: roundMoney(discounted + shipping + vat),
  };
}

module.exports = { orderSummary };
