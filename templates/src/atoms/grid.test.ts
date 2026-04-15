import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { columnsArea, rows } from './grid';

describe('Grid', () => {
  test('rows', () => {
    const { r } = rows({ h: 115, w: 0, x: 0, y: 0 }, 4, 5);
    assert.deepStrictEqual(r, [0, 30, 60, 90]);

    const { r: r2 } = rows({ h: 115, w: 0, x: 0, y: 10 }, 4, 5);
    assert.deepStrictEqual(r2, [10, 40, 70, 100]);
  });
});

describe('columnsArea', () => {
  test('Basic', () => {
    const ret = columnsArea([25, 25, null], { h: 100, w: 124, x: 0, y: 0 }, 2);

    assert.deepStrictEqual(ret, [
      { h: 100, w: 30, x: 0, y: 0 },
      { h: 100, w: 30, x: 32, y: 0 },
      { h: 100, w: 60, x: 64, y: 0 },
    ]);
  });
});
