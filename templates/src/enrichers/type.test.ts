import { test } from 'node:test';
import assert from 'node:assert/strict';
import enricher from './type';

test('Enricher: type', async () => {
  const dive1 = await enricher({
    entry: '',
    gases: [],
    tags: ['Istruttore', 'notturna'],
  });

  assert.deepStrictEqual(dive1.types, ['notturna']);

  const dive2 = await enricher({
    entry: 'da barca',
    gases: [{ oxygen: 32 }],
    tags: ['nitrox'],
  });

  assert.deepStrictEqual(dive2.types, ['EAN32', 'da barca']);
});
