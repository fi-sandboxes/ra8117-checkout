const { splitTotal } = require('../../src/splitPayment');

test('splits an amount evenly when it divides exactly', () => {
  expect(splitTotal(10, 2)).toEqual([5, 5]);
});

test('distributes the leftover cent instead of losing it', () => {
  expect(splitTotal(10.01, 2)).toEqual([5.01, 5]);
});

test('every share sums back to the exact total for an awkward split', () => {
  const shares = splitTotal(100, 3);
  const sum = shares.reduce((a, b) => a + b, 0);
  expect(Math.round(sum * 100)).toBe(10000);
});
