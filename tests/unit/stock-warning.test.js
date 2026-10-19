const { LOW_STOCK_THRESHOLD, lowStockWarning } = require('../../src/stockWarning');

test('warns when fewer than the threshold remain', () => {
  const line = { sku: 'SKU-1' };
  expect(lowStockWarning(line, LOW_STOCK_THRESHOLD - 1)).toEqual({
    sku: 'SKU-1', unitsRemaining: LOW_STOCK_THRESHOLD - 1,
    warning: 'Only a few left - check out soon',
  });
});

test('is silent at or above the threshold', () => {
  expect(lowStockWarning({ sku: 'SKU-1' }, LOW_STOCK_THRESHOLD)).toBeNull();
});
