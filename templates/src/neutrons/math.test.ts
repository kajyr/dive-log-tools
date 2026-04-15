import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { scale } from './math';

describe('scale', () => {
  test('scale', () => {
    // 5 is in the middle between 0 and 10
    const s = scale(0, 10, 0, 100);
    assert.strictEqual(s(5), 50);

    // now 10 is the max value should be 0 because we count with (0,0) in top left corner
    assert.strictEqual(s(10), 0);
    assert.strictEqual(s(0), 100);

    // some 3/4 value
    assert.strictEqual(s(7), 30);
  });

  test('edge case', () => {
    const s = scale(0, 0, 0, 100);
    assert.strictEqual(s(0), 0);
  });
});
