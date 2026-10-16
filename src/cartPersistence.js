'use strict';

// A signed-in shopper's cart is kept on the server so it is still there the next time
// they sign in, on any device. Merging by SKU means the same item added on two
// devices becomes one line with the combined quantity, not a duplicate.
function mergeCarts(serverCart, localCart) {
  const bySku = new Map();
  for (const line of [...serverCart.lines, ...localCart.lines]) {
    const existing = bySku.get(line.sku);
    bySku.set(line.sku, existing
      ? { ...existing, quantity: existing.quantity + line.quantity }
      : { ...line });
  }
  return { lines: [...bySku.values()] };
}

module.exports = { mergeCarts };
