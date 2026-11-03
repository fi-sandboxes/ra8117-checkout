'use strict';

// A gift card is looked up in the register of issued cards before checkout applies it.
// Codes are matched case-insensitively and without surrounding spaces; `today` is YYYY-MM-DD.
function giftCardBalance(register, code, today) {
  const key = String(code).trim().toUpperCase();
  const card = register[key];
  if (!card) {
    return { code: key, usable: false, balance: 0, reason: 'unknown card' };
  }
  if (card.expiresOn < today) {
    return { code: key, usable: false, balance: 0, reason: 'expired' };
  }
  return { code: key, usable: card.balance > 0, balance: card.balance, reason: card.balance > 0 ? null : 'empty' };
}

module.exports = { giftCardBalance };
