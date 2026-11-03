'use strict';

const LOW_STOCK_THRESHOLD = 3;

// A cart line shows a low-stock warning when fewer than LOW_STOCK_THRESHOLD units remain, and says
// it is sold out when none do.
function lowStockWarning(line, unitsRemaining) {
  if (unitsRemaining <= 0) {
    return { sku: line.sku, unitsRemaining: 0, warning: 'Sold out' };
  }
  return unitsRemaining < LOW_STOCK_THRESHOLD
    ? { sku: line.sku, unitsRemaining, warning: 'Only a few left - check out soon' }
    : null;
}

module.exports = { LOW_STOCK_THRESHOLD, lowStockWarning };
