'use strict';

// Release regression: an order can be cancelled only until it ships.
const { cancelOrder } = require('../../src/cancellation');

describe('cancellation regression', () => {
  test('an unshipped order is cancelled', () => {
    expect(cancelOrder({ id: 'O-10', status: 'paid' }, '2026-11-03T10:00:00Z').status).toBe('cancelled');
  });

  test('a shipped order stays as it was', () => {
    const order = { id: 'O-11', status: 'paid', shippedAt: '2026-11-01T08:00:00Z' };
    expect(() => cancelOrder(order, '2026-11-03T10:00:00Z')).toThrow('has shipped');
    expect(order.status).toBe('paid');
  });
});
