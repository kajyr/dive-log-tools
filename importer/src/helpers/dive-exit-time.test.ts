import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { diveExitTime } from './dive-exit-time';

describe('diveExitTime', () => {
  test('Basics', () => {
    assert.strictEqual(diveExitTime('2020-01-01T10:20:00', 20), '10:40:00');
  });
});
