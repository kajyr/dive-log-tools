const enricher = require('../enrichers/gases');

test('enrichGas', () => {
  // No gases
  expect(enricher({}).gases).toEqual([
    {
      label: 'Aria',
      pressureStart: '',
      pressureEnd: '',
      volumeStart: '',
      volumeEnd: '',
      consumo: '',
    },
  ]);

  // Air
  expect(
    enricher({
      gases: [
        {
          pressureStart: 207.81,
          pressureEnd: 83.29,
          oxygen: 21,
          helium: 0,
          double: false,
          tankSize: 15,
          volumeStart: 3117.15,
        },
      ],
    }).gases,
  ).toEqual([
    {
      label: 'Aria',
      pressureStart: 207,
      pressureEnd: 83,
      oxygen: 21,
      helium: 0,
      double: false,
      tankSize: 15,
      volumeStart: 3117,
      volumeEnd: 1249,
      consumo: 1868,
    },
  ]);

  // EAN 36
  expect(
    enricher({
      gases: [
        {
          pressureStart: 207.81,
          pressureEnd: 83.29,
          oxygen: 36,
          helium: 0,
          double: false,
          tankSize: 15,
          volumeStart: 3117.15,
        },
      ],
    }).gases,
  ).toEqual([
    {
      label: 'EAN36',
      pressureStart: 207,
      pressureEnd: 83,
      oxygen: 36,
      helium: 0,
      double: false,
      tankSize: 15,
      volumeStart: 3117,
      volumeEnd: 1249,
      consumo: 1868,
    },
  ]);
});
