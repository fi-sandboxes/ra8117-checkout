'use strict';

const { cancelOrder, CancellationError } = require('../../src/cancellation');

describe('cancelOrder', () => {
  test('cancels an order that has not shipped', () => {
    const order = { id: 'O-1', status: 'paid', total: 50 };
    expect(cancelOrder(order, '2026-11-03T10:00:00Z'))
      .toEqual({ id: 'O-1', status: 'cancelled', total: 50, cancelledAt: '2026-11-03T10:00:00Z' });
  });

  test('refuses an order that has shipped', () => {
    const order = { id: 'O-2', status: 'paid', shippedAt: '2026-11-02T09:00:00Z' };
    expect(() => cancelOrder(order, '2026-11-03T10:00:00Z')).toThrow(CancellationError);
  });

  test('refuses an order that is already cancelled', () => {
    expect(() => cancelOrder({ id: 'O-3', status: 'cancelled' }, '2026-11-03T10:00:00Z'))
      .toThrow('order O-3 is already cancelled');
  });
});
