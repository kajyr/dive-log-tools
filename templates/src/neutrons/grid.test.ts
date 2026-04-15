import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fillMissing, spread } from './grid';

test('fillMissing', () => {
  assert.deepStrictEqual(fillMissing([null, 25, 25], 100), [50, 25, 25]);

  assert.deepStrictEqual(fillMissing([null, null, 50], 100), [25, 25, 50]);

  assert.deepStrictEqual(fillMissing([null, null, null], 90), [30, 30, 30]);
});

test('fillMissing supports 0 heights blocks', () => {
  assert.deepStrictEqual(fillMissing([0, null, 25, 25], 100), [0, 50, 25, 25]);
});

test('spread', () => {
  assert.deepStrictEqual(spread([25, 25], 0, 100, 2), [
    [0, 25],
    [27, 25],
  ]);
});
