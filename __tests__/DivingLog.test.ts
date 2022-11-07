import divinglog from '../src/divelog';
import { join } from 'node:path';
import { readFileSync } from 'node:fs';

const { importer } = divinglog;

const MOCK_FILE = join(__dirname, '__mocks__', 'DivingLog.xml');
const MOCK_DATA = readFileSync(MOCK_FILE, 'utf8');

describe('DiveLog importer', () => {
  test('Basic', async () => {
    const logbook = importer(MOCK_DATA);
    expect(logbook).toMatchSnapshot();
  });
});
