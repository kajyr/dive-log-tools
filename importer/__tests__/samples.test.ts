import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { parseSamples } from '../src/macdive/importer';

describe('parseSamples', () => {
  test(`Depth can't be < 0`, () => {
    const samples = [{ depth: -3, ndt: 0, ppo2: 0, pressure: 0, temperature: 0, time: 0 }];

    const [fixed] = parseSamples(samples);

    assert.strictEqual(fixed.depth, 0);
  });
});
