'use strict';

class RefundError extends Error {}

function subtotalOf(order) {
  return order.lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
}

function refundLines(order, returns) {
  const subtotal = subtotalOf(order);
  const discount = order.discountTotal || 0;
  const returnedSoFar = {};
  return returns.map(({ sku, quantity }) => {
    const line = order.lines.find((l) => l.sku === sku);
    if (!line) {
      throw new RefundError(`order has no line ${sku}`);
    }
    const already = returnedSoFar[sku] || 0;
    if (already + quantity > line.quantity) {
      throw new RefundError(
        `cannot return ${already + quantity} of ${sku}, only ${line.quantity} were ordered`
      );
    }
    returnedSoFar[sku] = already + quantity;
    const lineAmount = line.unitPrice * quantity;
    // Known defect (bug "Refund of a discounted line is one cent short"): the line's share of
    // the order discount is subtracted before rounding, and the refund is then floored to the
    // cent instead of rounded - a half-cent remainder is always lost, never gained.
    const share = (discount * lineAmount) / subtotal;
    const refund = Math.floor((lineAmount - share) * 100) / 100;
    return { sku, quantity, refund };
  });
}

function totalRefund(order, returns) {
  const total = refundLines(order, returns).reduce((sum, r) => sum + r.refund, 0);
  return Math.round(total * 100) / 100;
}

module.exports = { refundLines, totalRefund, RefundError };
