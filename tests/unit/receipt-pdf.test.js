const { receiptPdfLines } = require('../../src/receiptPdf');

test('renders one line per order line', () => {
  const order = { lines: [{ sku: 'SKU-1', quantity: 2 }] };
  expect(receiptPdfLines(order)).toEqual(['SKU-1  x2']);
});
