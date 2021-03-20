import divinglog from '../src/divelog';
import path from 'path';
import fs from 'fs';

const { importer } = divinglog;

const MOCK_FILE = path.join(__dirname, '__mocks__', 'DivingLog.xml');
const MOCK_DATA = fs.readFileSync(MOCK_FILE, 'utf8');

describe('DiveLog importer', () => {
  test('Basic', async () => {
    const logbook = importer(MOCK_DATA);
    expect(logbook).toMatchSnapshot();
  });
});
