'use strict';

const LOW_STOCK_THRESHOLD = 3;

// A cart line shows a low-stock warning when fewer than LOW_STOCK_THRESHOLD units remain.
function lowStockWarning(line, unitsRemaining) {
  return unitsRemaining < LOW_STOCK_THRESHOLD
    ? { sku: line.sku, unitsRemaining, warning: 'Only a few left - check out soon' }
    : null;
}

module.exports = { LOW_STOCK_THRESHOLD, lowStockWarning };
