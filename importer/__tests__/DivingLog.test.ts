import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import divinglog from '../src/divelog';
import { join } from 'node:path';
import { readFileSync } from 'node:fs';

const { importer } = divinglog;

const MOCK_FILE = join(__dirname, '__mocks__', 'DivingLog.xml');
const MOCK_DATA = readFileSync(MOCK_FILE, 'utf8');

const EXPECTED = JSON.parse(readFileSync(join(__dirname, '__expected__', 'DivingLog.json'), 'utf8'));

describe('DiveLog importer', () => {
  test('Basic', () => {
    const logbook = importer(MOCK_DATA);
    // Round-trip through JSON to strip undefined values (JSON.stringify omits them)
    assert.deepStrictEqual(JSON.parse(JSON.stringify(logbook)), EXPECTED);
  });
});
