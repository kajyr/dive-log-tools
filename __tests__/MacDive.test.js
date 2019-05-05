const { importer } = require('../src/macdive');
const { read } = require('../src/xml');
const path = require('path');

const MOCK_FILE = path.join(__dirname, '__mocks__', 'MacDive.xml');

describe('MacDive importer', () => {
  test('Basic', async () => {
    const mock = await read(MOCK_FILE, 'utf8');
    const logbook = importer(mock);
    expect(logbook).toMatchSnapshot();
  });
});
