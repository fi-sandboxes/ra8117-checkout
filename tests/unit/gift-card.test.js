'use strict';

const { giftCardBalance } = require('../../src/giftCard');

const REGISTER = {
  'GC-1000': { balance: 25, expiresOn: '2027-01-31' },
  'GC-2000': { balance: 0, expiresOn: '2027-01-31' },
  'GC-3000': { balance: 40, expiresOn: '2026-10-31' },
};

describe('giftCardBalance', () => {
  test('a valid card shows its balance', () => {
    expect(giftCardBalance(REGISTER, 'GC-1000', '2026-11-03'))
      .toEqual({ code: 'GC-1000', usable: true, balance: 25, reason: null });
  });

  test('matches the code case-insensitively and without spaces', () => {
    expect(giftCardBalance(REGISTER, '  gc-1000 ', '2026-11-03').usable).toBe(true);
  });

  test('an unknown code is not usable', () => {
    expect(giftCardBalance(REGISTER, 'GC-9999', '2026-11-03').reason).toBe('unknown card');
  });

  test('an expired card is not usable', () => {
    expect(giftCardBalance(REGISTER, 'GC-3000', '2026-11-03').reason).toBe('expired');
  });

  test('an empty card is not usable', () => {
    expect(giftCardBalance(REGISTER, 'GC-2000', '2026-11-03').reason).toBe('empty');
  });
});
