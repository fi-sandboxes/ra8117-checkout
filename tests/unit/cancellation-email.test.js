'use strict';

const { cancellationEmail } = require('../../src/cancellationEmail');

describe('cancellationEmail', () => {
  const order = { id: 'O-30', email: 'shopper@example.com', currency: 'EUR' };

  test('is addressed to the shopper and names the order', () => {
    const email = cancellationEmail(order, { amount: 12, method: 'card' });
    expect(email.to).toBe('shopper@example.com');
    expect(email.subject).toBe('Order O-30 is cancelled');
  });

  test('states the refund with two decimals and its destination', () => {
    expect(cancellationEmail(order, { amount: 12, method: 'card' }).body)
      .toBe('Your order O-30 is cancelled. 12.00 EUR is on its way back to your card.');
  });
});
