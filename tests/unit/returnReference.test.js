'use strict';

const { newReturnReference } = require('../../src/returnReference');

describe('return reference', () => {
  test('matches the RT-XXXXXXXX shape', () => {
    expect(newReturnReference()).toMatch(/^RT-[0-9A-F]{8}$/);
  });

  test('two references are not the same', () => {
    expect(newReturnReference()).not.toBe(newReturnReference());
  });
});
