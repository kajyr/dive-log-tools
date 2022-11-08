const { fillMissing, spread } = require('../grid');

test('fillMissing', () => {
  expect(fillMissing([null, 25, 25], 100)).toEqual([50, 25, 25]);

  expect(fillMissing([null, null, 50], 100)).toEqual([25, 25, 50]);

  expect(fillMissing([null, null, null], 90)).toEqual([30, 30, 30]);
});

test('fillMissing supports 0 heights blocks', () => {
  expect(fillMissing([0, null, 25, 25], 100)).toEqual([0, 50, 25, 25]);
});

test('spread', () => {
  expect(spread([25, 25], 0, 100, 2)).toEqual([
    [0, 25],
    [27, 25],
  ]);
});
