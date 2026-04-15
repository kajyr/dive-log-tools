import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { datetime, time } from './formats';

describe('datetime', () => {
  test('Basic', () => {
    assert.strictEqual(datetime(new Date('2020-01-01T00:00:00')), '2020-01-01T00:00:00Z');
  });
});

describe('time', () => {
  test('Basic', () => {
    assert.strictEqual(time(new Date('2020-01-01T11:21:32')), '11:21:32');
  });
});
