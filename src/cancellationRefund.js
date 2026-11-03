'use strict';

// A cancelled order is refunded in full to the payment method it was paid with.
// Known defect (B10, "Cancelling a partly refunded order refunds the returned lines again"): the
// amount is the order total, not the total less what returns have already refunded.
function cancellationRefund(order) {
  if (order.status !== 'cancelled') {
    throw new Error(`order ${order.id} is not cancelled`);
  }
  return { orderId: order.id, amount: Math.round(order.total * 100) / 100, method: order.paymentMethod };
}

module.exports = { cancellationRefund };
