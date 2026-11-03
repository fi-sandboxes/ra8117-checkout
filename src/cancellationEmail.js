'use strict';

// The confirmation a shopper receives once an order is cancelled and its refund issued.
function cancellationEmail(order, refund) {
  return {
    to: order.email,
    subject: `Order ${order.id} is cancelled`,
    body: `Your order ${order.id} is cancelled. ${refund.amount.toFixed(2)} ${order.currency} `
      + `is on its way back to your ${refund.method}.`,
  };
}

module.exports = { cancellationEmail };
