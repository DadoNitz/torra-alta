const { test } = require('node:test');
const assert = require('node:assert/strict');
const { subscriptionSummary } = require('../script.js');

test('both plans preserve price, package count and selected preparation', () => {
  assert.deepEqual(subscriptionSummary('500', 'Seleção da torrefação', 'Em grãos'), {
    price: 76, packs: 2, text: '500 g de café por mês, em grãos.'
  });
  assert.deepEqual(subscriptionSummary('1000', 'Neblina', 'Moído para coador'), {
    price: 144, packs: 4, text: '1000 g de Neblina por mês, moído para coador.'
  });
});

test('unknown plans cannot produce a misleading quote', () => {
  assert.throws(() => subscriptionSummary('750', 'Cume', 'Em grãos'), RangeError);
  assert.throws(() => subscriptionSummary('__proto__', 'Cume', 'Em grãos'), RangeError);
});
