const { mergeCarts } = require('../../src/cartPersistence');

test('combines the same SKU from both carts into one line', () => {
  const server = { lines: [{ sku: 'SKU-1', quantity: 1 }] };
  const local = { lines: [{ sku: 'SKU-1', quantity: 2 }, { sku: 'SKU-2', quantity: 1 }] };
  expect(mergeCarts(server, local).lines).toEqual([
    { sku: 'SKU-1', quantity: 3 }, { sku: 'SKU-2', quantity: 1 },
  ]);
});
