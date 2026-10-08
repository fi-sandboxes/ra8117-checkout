'use strict';

const { createSession, isExpired } = require('../../src/session');

describe('session regression', () => {
  test('a session belongs to its customer', () => {
    expect(createSession('c-42', 0).customerId).toBe('c-42');
  });

  test('tokens differ between sessions', () => {
    expect(createSession('c-1').token).not.toBe(createSession('c-1').token);
  });

  test('a fresh session is not expired', () => {
    expect(isExpired(createSession('c-1', 1000), 1000)).toBe(false);
  });

  test('a session without a customer is refused', () => {
    expect(() => createSession('')).toThrow();
  });
});
