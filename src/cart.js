'use strict';

const { roundMoney } = require('./currency');

// The most units of one SKU a single cart line may hold (warehouse pick limit).
const MAX_LINE_QUANTITY = 99;

function createCart() {
  return { lines: [] };
}

function addLine(cart, sku, unitPrice, quantity = 1) {
  if (!Number.isFinite(unitPrice) || unitPrice < 0) {
    throw new RangeError('unit price must be a finite, non-negative amount');
  }

  if (quantity <= 0) {
    throw new RangeError('quantity must be positive');
  }
  const existing = cart.lines.find((line) => line.sku === sku);
  const resulting = (existing ? existing.quantity : 0) + quantity;
  if (resulting > MAX_LINE_QUANTITY) {
    throw new RangeError(`a cart line holds at most ${MAX_LINE_QUANTITY} units`);
  }
  if (existing) {
    existing.quantity = resulting;
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

module.exports = { createCart, addLine, removeLine, subtotal, itemCount, MAX_LINE_QUANTITY };
