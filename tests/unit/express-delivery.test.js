'use strict';

const { expressQuote, EXPRESS_SURCHARGE } = require('../../src/expressDelivery');

describe('expressQuote', () => {
  test('domestic express arrives next business day', () => {
    expect(expressQuote('domestic')).toEqual({ zone: 'domestic', businessDays: 1, surcharge: EXPRESS_SURCHARGE });
  });

  test('eu express takes 3 business days', () => {
    expect(expressQuote('eu').businessDays).toBe(3);
  });

  test('rejects an unknown zone', () => {
    expect(() => expressQuote('mars')).toThrow('unknown shipping zone mars');
  });
});
