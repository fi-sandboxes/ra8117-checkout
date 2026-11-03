'use strict';

const { cancellationRefund } = require('../../src/cancellationRefund');

describe('cancellationRefund', () => {
  test('refunds a cancelled order in full to its payment method', () => {
    const order = { id: 'O-20', status: 'cancelled', total: 64.5, paymentMethod: 'card' };
    expect(cancellationRefund(order)).toEqual({ orderId: 'O-20', amount: 64.5, method: 'card' });
  });

  test('refuses an order that is not cancelled', () => {
    expect(() => cancellationRefund({ id: 'O-21', status: 'paid', total: 10 }))
      .toThrow('order O-21 is not cancelled');
  });
});
