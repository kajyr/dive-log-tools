import macdive from '../src/macdive';

import path from 'path';
import fs from 'fs';

const { importer } = macdive;

const MOCK_FILE = path.join(__dirname, '__mocks__', 'macdive', 'MacDive.xml');
const MOCK_DATA = fs.readFileSync(MOCK_FILE, 'utf8');

// missing
const MOCK_FILE_MISSING_PROPS = path.join(__dirname, '__mocks__', 'macdive', 'MissingProps.xml');
const MOCK_DATA_MISSING = fs.readFileSync(MOCK_FILE_MISSING_PROPS, 'utf8');

describe('MacDive importer', () => {
  test('Basic', async () => {
    const logbook = macdive.importer(MOCK_DATA);
    expect(logbook).toMatchSnapshot();
  });

  test('Failing for missing props', async () => {
    const MOCK_FILE = path.join(__dirname, '__mocks__', 'macdive', 'MissingProps.xml');
    const MOCK_DATA = fs.readFileSync(MOCK_FILE, 'utf8');

    expect(() => {
      macdive.importer(MOCK_DATA);
    }).not.toThrow();
  });

  test('Missign props', async () => {
    const logbook = macdive.importer(MOCK_DATA_MISSING);
    const [dive] = logbook?.dives;
    expect(dive.tags).toEqual([]);
    expect(dive.types).toEqual([]);
  });
});
