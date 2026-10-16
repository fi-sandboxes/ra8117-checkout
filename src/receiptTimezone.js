'use strict';

// The receipt timestamp is formatted in the client's own locale and timezone, not the
// server's - a shopper in a different region used to see a time that did not match their
// own clock.
function formatReceiptTime(isoInstant, locale, timeZone) {
  return new Intl.DateTimeFormat(locale, {
    timeZone, dateStyle: 'medium', timeStyle: 'short',
  }).format(new Date(isoInstant));
}

module.exports = { formatReceiptTime };
