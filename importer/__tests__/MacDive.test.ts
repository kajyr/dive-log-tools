import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import macdive from '../src/macdive';

import { join } from 'node:path';
import { readFileSync } from 'node:fs';

const MOCK_FILE = join(__dirname, '__mocks__', 'macdive', 'MacDive.xml');
const MOCK_DATA = readFileSync(MOCK_FILE, 'utf8');

// missing
const MOCK_FILE_MISSING_PROPS = join(__dirname, '__mocks__', 'macdive', 'MissingProps.xml');
const MOCK_DATA_MISSING = readFileSync(MOCK_FILE_MISSING_PROPS, 'utf8');

const EXPECTED = JSON.parse(readFileSync(join(__dirname, '__expected__', 'MacDive.json'), 'utf8'));

describe('MacDive importer', () => {
  test('Basic', () => {
    const logbook = macdive.importer(MOCK_DATA);
    // Round-trip through JSON to strip undefined values (JSON.stringify omits them)
    assert.deepStrictEqual(JSON.parse(JSON.stringify(logbook)), EXPECTED);
  });

  test('Failing for missing props', () => {
    // If it throws, the test fails automatically
    macdive.importer(MOCK_DATA_MISSING);
  });

  test('Missign props', () => {
    const logbook = macdive.importer(MOCK_DATA_MISSING);
    const [dive] = logbook.dives;
    assert.deepStrictEqual(dive.tags, []);
    assert.deepStrictEqual(dive.types, []);
  });
});
