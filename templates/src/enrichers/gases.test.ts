import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import enricher from './gases';

const emptyOpts = { cacheDir: '', dest: '', list: [], template: '' };

describe('Gas enricher', () => {
  test('no gases', async () => {
    const ret = await enricher({}, emptyOpts);
    // No gases
    assert.deepStrictEqual(ret.gases, [
      {
        oxygen: 21,
        pressureEnd: undefined,
        pressureStart: undefined,
      },
    ]);
  });

  test('Air', async () => {
    const dive = await enricher(
      {
        gases: [
          {
            double: false,
            helium: 0,
            oxygen: 21,
            pressureEnd: 83.29,
            pressureStart: 207.81,
            tankSize: 15,
          },
        ],
      },
      emptyOpts,
    );
    assert.deepStrictEqual(dive.gases, [
      {
        double: false,
        helium: 0,
        oxygen: 21,
        pressureEnd: 83,
        pressureStart: 207,
        tankSize: 15,
      },
    ]);
  });
  test('EAN 36', async () => {
    const dive = await enricher(
      {
        gases: [
          {
            double: false,
            helium: 0,
            oxygen: 36,
            pressureEnd: 83.29,
            pressureStart: 207.81,
            tankSize: 15,
          },
        ],
      },
      emptyOpts,
    );

    // EAN 36
    assert.deepStrictEqual(dive.gases, [
      {
        double: false,
        helium: 0,
        oxygen: 36,
        pressureEnd: 83,
        pressureStart: 207,
        tankSize: 15,
      },
    ]);
  });
});
