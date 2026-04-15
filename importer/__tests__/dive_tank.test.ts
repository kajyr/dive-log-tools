import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { tankName } from '../src/dive/tank';

describe('tankName', () => {
  test('Single ', () => {
    assert.strictEqual(tankName(15, null, false), '15');
    assert.strictEqual(tankName(15, 'Pinina', false), 'Pinina');
  });

  test('Double', () => {
    assert.strictEqual(tankName(24, null, true), '12 + 12');
    assert.strictEqual(tankName(24, 'Pinina', true), 'Pinina');
  });
});
