const { importer } = require('../src/divelog');
const { parse } = require('../src/xml');
const path = require('path');
const fs = require('fs');

const MOCK_FILE = path.join(__dirname, '__mocks__', 'DivingLog.xml');
const MOCK_DATA = fs.readFileSync(MOCK_FILE, 'utf8');

describe('DiveLog importer', () => {
  test('Basic', async () => {
    const mock = await parse(MOCK_DATA);

    const logbook = importer(mock);
    expect(logbook).toMatchSnapshot();
  });
});
