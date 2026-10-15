'use strict';

const { estimateDelivery } = require('../../src/delivery');

describe('estimateDelivery', () => {
  test('domestic orders arrive in 2 business days', () => {
    // Monday 2026-10-12 + 2 business days = Wednesday 2026-10-14
    expect(estimateDelivery('domestic', '2026-10-12T00:00:00Z').toISOString().slice(0, 10))
      .toBe('2026-10-14');
  });

  test('skips the weekend', () => {
    // Friday 2026-10-16 + 2 business days = Tuesday 2026-10-20
    expect(estimateDelivery('domestic', '2026-10-16T00:00:00Z').toISOString().slice(0, 10))
      .toBe('2026-10-20');
  });

  test('eu orders take 5 business days', () => {
    expect(estimateDelivery('eu', '2026-10-12T00:00:00Z').toISOString().slice(0, 10))
      .toBe('2026-10-19');
  });

  test('world orders take 10 business days', () => {
    expect(estimateDelivery('world', '2026-10-12T00:00:00Z').toISOString().slice(0, 10))
      .toBe('2026-10-26');
  });

  test('rejects an unknown zone', () => {
    expect(() => estimateDelivery('mars', '2026-10-12T00:00:00Z')).toThrow('unknown shipping zone mars');
  });
});
