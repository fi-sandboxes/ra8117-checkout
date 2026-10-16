const { filterByDateRange } = require('../../src/orderHistoryFilter');

test('keeps only orders placed inside the range, inclusive', () => {
  const orders = [
    { id: 1, placedAt: '2026-01-01' }, { id: 2, placedAt: '2026-02-15' },
    { id: 3, placedAt: '2026-03-01' },
  ];
  expect(filterByDateRange(orders, '2026-01-01', '2026-02-15').map((o) => o.id))
    .toEqual([1, 2]);
});
