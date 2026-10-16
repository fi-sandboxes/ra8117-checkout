const { GIFT_WRAP_FEE, withGiftWrap } = require('../../src/giftWrap');

test('adds the flat fee when gift wrap is requested', () => {
  expect(withGiftWrap(40, true)).toBe(40 + GIFT_WRAP_FEE);
});

test('leaves the total unchanged when gift wrap is not requested', () => {
  expect(withGiftWrap(40, false)).toBe(40);
});
