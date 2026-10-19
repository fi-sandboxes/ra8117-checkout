'use strict';

const { tierFor } = require('../../src/loyaltyBalance');

describe('loyalty balance tier', () => {
  test('starts at Bronze', () => {
    expect(tierFor(0)).toBe('Bronze');
    expect(tierFor(499)).toBe('Bronze');
  });

  test('reaches Silver at the threshold', () => {
    expect(tierFor(500)).toBe('Silver');
    expect(tierFor(1999)).toBe('Silver');
  });

  test('reaches Gold at the threshold', () => {
    expect(tierFor(2000)).toBe('Gold');
    expect(tierFor(5000)).toBe('Gold');
  });
});
