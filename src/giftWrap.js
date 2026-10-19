'use strict';

const GIFT_WRAP_FEE = 3.5;

// A shopper can add gift wrapping to an order for a flat fee.
function withGiftWrap(total, wrapRequested) {
  return wrapRequested ? total + GIFT_WRAP_FEE : total;
}

module.exports = { GIFT_WRAP_FEE, withGiftWrap };
