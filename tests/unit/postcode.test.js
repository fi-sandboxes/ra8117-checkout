'use strict';

const { isValidPostcode } = require('../../src/postcode');

describe('isValidPostcode', () => {
  test.each([
    'SW1A 1AA',
    'M1 1AE',
    'CR2 6XH',
    'DN55 1PT',
  ])('accepts %s', (postcode) => {
    expect(isValidPostcode(postcode)).toBe(true);
  });

  test.each([
    '',
    '12345',
    'SW1A',
  ])('rejects %s', (postcode) => {
    expect(isValidPostcode(postcode)).toBe(false);
  });
});
