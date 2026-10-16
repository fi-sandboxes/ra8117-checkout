'use strict';

const { isReturnable, returnDeadline } = require('../../src/returns');

describe('returns', () => {
  test('deadline is 30 days after delivery by default', () => {
    expect(returnDeadline('2026-09-16')).toBe('2026-10-16');
  });

  test('deadline respects a custom window', () => {
    expect(returnDeadline('2026-09-16', 14)).toBe('2026-09-30');
  });

  test('return accepted on the 30th day', () => {
    expect(isReturnable('2026-09-16', '2026-10-16')).toBe(true);
  });

  test('return refused the day after the window', () => {
    expect(isReturnable('2026-09-16', '2026-10-17')).toBe(false);
  });

  test('return accepted the day after delivery', () => {
    expect(isReturnable('2026-09-16', '2026-09-17')).toBe(true);
  });
});
