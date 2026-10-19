'use strict';

const { format } = require('./currency');

// v2 (review feedback on PR #26): each line now carries its formatted amount, not just the
// SKU and quantity - a receipt with no prices on it is not a usable receipt.
function receiptPdfLines(order, currency) {
  return order.lines.map((l) => {
    const amount = format(l.unitPrice * l.quantity, currency);
    return `${l.sku}  x${l.quantity}  ${amount}`;
  });
}

module.exports = { receiptPdfLines };
