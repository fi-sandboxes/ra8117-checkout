'use strict';

// Filters a shopper's order history to the ones placed within [from, to] (ISO dates,
// inclusive), so a shopper can find an order from a known window instead of scrolling.
function filterByDateRange(orders, from, to) {
  return orders.filter((order) => order.placedAt >= from && order.placedAt <= to);
}

module.exports = { filterByDateRange };
