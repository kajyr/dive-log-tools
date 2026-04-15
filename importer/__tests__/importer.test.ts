import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { listImporters } from '../src';

describe('Importer entrypoint', () => {
  test('listImporters', () => {
    assert.deepStrictEqual(listImporters(), ['macdive', 'divelog']);
  });
});
