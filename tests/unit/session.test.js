'use strict';

const { newToken, createSession, isExpired } = require('../../src/session');

describe('session', () => {
  test('token has the requested length', () => {
    expect(newToken(10)).toHaveLength(10);
  });

  test('session expires after 30 minutes', () => {
    const session = createSession('c-1', 0);
    expect(isExpired(session, 29 * 60 * 1000)).toBe(false);
    expect(isExpired(session, 30 * 60 * 1000)).toBe(true);
  });
});
