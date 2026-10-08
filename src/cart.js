'use strict';

const { roundMoney } = require('./currency');

function createCart() {
  return { lines: [] };
}

function addLine(cart, sku, unitPrice, quantity = 1) {
  if (quantity <= 0) {
    throw new RangeError('quantity must be positive');
  }
  const existing = cart.lines.find((line) => line.sku === sku);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.lines.push({ sku, unitPrice, quantity });
  }
  return cart;
}

function removeLine(cart, sku) {
  cart.lines = cart.lines.filter((line) => line.sku !== sku);
  return cart;
}

function subtotal(cart) {
  return roundMoney(cart.lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0));
}

function itemCount(cart) {
  return cart.lines.reduce((count, line) => count + line.quantity, 0);
}

module.exports = { createCart, addLine, removeLine, subtotal, itemCount };
