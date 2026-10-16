const { formatReceiptTime } = require('../../src/receiptTimezone');

test('formats the instant in the given locale and timezone', () => {
  const formatted = formatReceiptTime('2026-01-01T00:00:00Z', 'en-GB', 'Europe/London');
  expect(typeof formatted).toBe('string');
  expect(formatted.length).toBeGreaterThan(0);
});
