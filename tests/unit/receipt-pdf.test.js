const { receiptPdfLines } = require('../../src/receiptPdf');

test('renders one line per order line, with its formatted amount', () => {
  const order = { lines: [{ sku: 'SKU-1', quantity: 2, unitPrice: 9.5 }] };
  expect(receiptPdfLines(order, 'GBP')).toEqual(['SKU-1  x2  \u00a319.00']);
});
