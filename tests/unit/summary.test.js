'use strict';

const { createCart, addLine } = require('../../src/cart');
const { orderSummary } = require('../../src/summary');

const TODAY = '2026-10-12';

describe('order summary', () => {
  test('domestic order without a code', () => {
    const cart = addLine(createCart(), 'A', 20, 2);
    expect(orderSummary(cart, { country: 'DE', zone: 'domestic', weightKg: 1 })).toEqual({
      subtotal: 40, discount: 0, shipping: 5.4, vat: 7.6, total: 53,
    });
  });

  test('a discount code lowers the VAT base and can reach free shipping only on the discounted amount', () => {
    const cart = addLine(createCart(), 'A', 55);
    const summary = orderSummary(cart, {
      country: 'DE', zone: 'domestic', weightKg: 2, code: 'SAVE10', today: TODAY,
    });
    expect(summary).toEqual({ subtotal: 55, discount: 5.5, shipping: 5.9, vat: 9.4, total: 64.8 });
  });

  test('reduced-rate lines are taxed at the reduced rate', () => {
    const cart = addLine(addLine(createCart(), 'BREAD', 10), 'TV', 100);
    const summary = orderSummary(cart, {
      country: 'DE', zone: 'domestic', weightKg: 5, categories: { BREAD: 'essential' },
    });
    expect(summary.vat).toBe(19.7);
    expect(summary.shipping).toBe(0);
    expect(summary.total).toBe(129.7);
  });

  test('an empty cart has a zero total apart from shipping', () => {
    const summary = orderSummary(createCart(), { country: 'PL', zone: 'eu', weightKg: 0 });
    expect(summary).toEqual({ subtotal: 0, discount: 0, shipping: 9.9, vat: 0, total: 9.9 });
  });
});
