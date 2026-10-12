'use strict';

const { newToken, createSession, isExpired } = require('../../src/session');

describe('session', () => {
  test('token is hex of the requested byte length', () => {
    expect(newToken(10)).toMatch(/^[0-9a-f]{20}$/);
  });

  test('session expires after 30 minutes', () => {
    const session = createSession('c-1', 0);
    expect(isExpired(session, 29 * 60 * 1000)).toBe(false);
    expect(isExpired(session, 30 * 60 * 1000)).toBe(true);
  });
});
