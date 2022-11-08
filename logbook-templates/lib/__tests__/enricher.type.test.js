const enricher = require('../enrichers/type');

test('Enricher: type', () => {
  expect(
    enricher({
      entry: '',
      tags: ['Istruttore', 'notturna'],
      gases: [{ label: 'Aria' }],
    }).type,
  ).toBe('notturna');

  expect(
    enricher({
      entry: 'da barca',
      tags: ['nitrox'],
      gases: [{ label: 'EAN32' }],
    }).type,
  ).toBe('EAN32, da barca');
});
