'use strict';

class CancellationError extends Error {}

// An order can be cancelled until it ships; a shipped order goes through returns instead.
function cancelOrder(order, cancelledAt) {
  if (order.status === 'cancelled') {
    throw new CancellationError(`order ${order.id} is already cancelled`);
  }
  if (order.shippedAt) {
    throw new CancellationError(`order ${order.id} has shipped - return it instead`);
  }
  return { ...order, status: 'cancelled', cancelledAt };
}

module.exports = { cancelOrder, CancellationError };
