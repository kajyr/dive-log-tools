import enricher from './gases';

const emptyOpts = { list: [], dest: '', template: '', cacheDir: '' };

describe('Gas enricher', () => {
  test('no gases', async () => {
    const ret = await enricher({}, emptyOpts);
    // No gases
    expect(ret.gases).toEqual([
      {
        oxygen: 21,
      },
    ]);
  });

  test('Air', async () => {
    const dive = await enricher(
      {
        gases: [
          {
            pressureStart: 207.81,
            pressureEnd: 83.29,
            oxygen: 21,
            helium: 0,
            double: false,
            tankSize: 15,
          },
        ],
      },
      emptyOpts,
    );
    expect(dive.gases).toEqual([
      {
        pressureStart: 207,
        pressureEnd: 83,
        oxygen: 21,
        helium: 0,
        double: false,
        tankSize: 15,
      },
    ]);
  });
  test('EAN 36', async () => {
    const dive = await enricher(
      {
        gases: [
          {
            pressureStart: 207.81,
            pressureEnd: 83.29,
            oxygen: 36,
            helium: 0,
            double: false,
            tankSize: 15,
          },
        ],
      },
      emptyOpts,
    );

    // EAN 36
    expect(dive.gases).toEqual([
      {
        pressureStart: 207,
        pressureEnd: 83,
        oxygen: 36,
        helium: 0,
        double: false,
        tankSize: 15,
      },
    ]);
  });
});
