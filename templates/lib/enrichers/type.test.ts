import enricher from './type';

test('Enricher: type', async () => {
  const dive1 = await enricher({
    entry: '',
    gases: [],
    tags: ['Istruttore', 'notturna'],
  });

  expect(dive1.types).toEqual(['notturna']);

  const dive2 = await enricher({
    entry: 'da barca',
    gases: [{ oxygen: 32 }],
    tags: ['nitrox'],
  });

  expect(dive2.types).toEqual(['EAN32', 'da barca']);
});
