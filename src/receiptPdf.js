'use strict';

// v1: a receipt is rendered to a printable PDF so a shopper can keep a copy offline.
function receiptPdfLines(order) {
  return order.lines.map((l) => `${l.sku}  x${l.quantity}`);
}

module.exports = { receiptPdfLines };
